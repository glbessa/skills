import type { FastifyInstance } from 'fastify';
import rateLimit from '@fastify/rate-limit';
import { z } from 'zod';
// ADAPTAR: use os módulos reais de sessão, banco e ambiente do projeto.
import { comTenant } from '../db/index.js';
import { env } from '../env.js';
import { exigirSessao } from './auth.js';

const REPO = 'OWNER/REPO'; // ADAPTAR: mantenha server-side.
const SEM_RESPOSTA = '_Sem resposta_';

export const reporteSchema = z
  .object({
    tipo: z.enum(['problema', 'sugestao']),
    titulo: z.string().trim().min(5).max(120),
    descricao: z.string().trim().min(10).max(4000),
    passos: z.string().trim().max(4000).optional(),
    esperado: z.string().trim().max(4000).optional(),
    url: z.string().trim().max(500).optional(),
    userAgent: z.string().trim().max(500).optional(),
  })
  .refine((d) => d.tipo !== 'problema' || (!!d.passos && !!d.esperado), {
    message: 'passos e esperado são obrigatórios para problema',
    path: ['passos'],
  });

export type Reporte = z.infer<typeof reporteSchema>;
export type ContextoReporte = {
  organizacao: string;
  organizacaoId: string;
  email: string;
  usuarioId: string;
};

const secao = (titulo: string, valor?: string) =>
  `### ${titulo}\n\n${valor?.trim() || SEM_RESPOSTA}\n\n`;

export function corpoIssue(d: Reporte, ctx: ContextoReporte) {
  const ambiente = [d.url && `Tela: ${d.url}`, d.userAgent && `Navegador: ${d.userAgent}`]
    .filter(Boolean)
    .join('\n');
  const contexto =
    `Organização: ${ctx.organizacao} (\`${ctx.organizacaoId}\`)\n` +
    `Usuário: ${ctx.email} (\`${ctx.usuarioId}\`)\n` +
    `Enviado em: ${new Date().toISOString()}`;
  const corpo =
    d.tipo === 'problema'
      ? secao('O que aconteceu', d.descricao) +
        secao('Como reproduzir', d.passos) +
        secao('Esperado x obtido', d.esperado) +
        secao('Onde', 'web (painel)') +
        secao('Ambiente', ambiente) +
        secao('Logs, prints, IDs')
      : secao('Problema', d.descricao) +
        secao('Proposta') +
        secao('Critério de aceite') +
        secao('Onde', 'web (painel)') +
        secao('Fora de escopo');
  return `${corpo}---\n\n### Contexto (preenchido pelo sistema)\n\n${contexto}\n`;
}

export async function rotasReportes(app: FastifyInstance) {
  await app.register(rateLimit, {
    max: 5,
    timeWindow: '1 hour',
    keyGenerator: (req) => req.cookies?.sessao ?? req.ip, // ADAPTAR: chave da sessão real.
  });

  app.addHook('preHandler', async (req) => {
    req.sessao = await exigirSessao(req);
  });

  app.post('/reportes', async (req) => {
    const dados = reporteSchema.parse(req.body);
    if (!env.GITHUB_TOKEN_ISSUES) {
      throw Object.assign(new Error('reportes indisponíveis'), { statusCode: 503 });
    }

    // ADAPTAR: derive estes dados da sessão/banco; nunca do payload do navegador.
    const contexto = await comTenant(req.sessao.tenantId, async (tx) => {
      const usuario = await tx.usuario.findUniqueOrThrow({
        where: { id: req.sessao.usuarioId },
        select: { email: true, tenant: { select: { nome: true } } },
      });
      return {
        organizacao: usuario.tenant.nome,
        organizacaoId: req.sessao.tenantId,
        email: usuario.email,
        usuarioId: req.sessao.usuarioId,
      };
    });

    const resposta = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.GITHUB_TOKEN_ISSUES}`,
        accept: 'application/vnd.github+json',
        'content-type': 'application/json',
        'user-agent': 'reporte-in-app',
      },
      body: JSON.stringify({
        title: dados.titulo,
        body: corpoIssue(dados, contexto),
        labels: ['triagem:pendente', dados.tipo === 'problema' ? 'bug' : 'enhancement'],
      }),
    });

    if (!resposta.ok) {
      app.log.error({ status: resposta.status }, 'GitHub recusou a criação da issue');
      throw Object.assign(new Error('não consegui registrar o reporte'), { statusCode: 502 });
    }

    const issue = (await resposta.json()) as { number: number; html_url: string };
    return { numero: issue.number, url: issue.html_url };
  });
}
