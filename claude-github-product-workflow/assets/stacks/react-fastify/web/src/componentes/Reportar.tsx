import { useState, type FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ErroApi, post } from '../api';
import { mensagemErroReporte, obterConfiguracaoReporte, type TipoReporte } from '../reporte';
// ADAPTAR: use os componentes e o toast já existentes no projeto.
import { useToast } from './Toast';
import { AreaTexto, Botao, Campo, Dialogo, Entrada, Erro, Selecao } from './ui';

type ReporteCriado = { numero: number; url: string };

export function Reportar({ aberto, aoFechar }: { aberto: boolean; aoFechar: () => void }) {
  const [tipo, setTipo] = useState<TipoReporte>('problema');
  const toast = useToast();
  const config = obterConfiguracaoReporte(tipo);

  const enviar = useMutation({
    mutationFn: (dados: Record<string, string>) => {
      const pagina = new URL(location.href);
      return post<ReporteCriado>('/reportes', {
        ...dados,
        url: `${pagina.origin}${pagina.pathname}`,
        userAgent: navigator.userAgent,
      });
    },
    onSuccess: (r) => toast.sucesso(`Recebido! Registrado como #${r.numero}.`),
  });

  function submeter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    enviar.mutate(Object.fromEntries(new FormData(form)) as Record<string, string>, {
      onSuccess: () => {
        form.reset();
        setTipo('problema');
        aoFechar();
      },
    });
  }

  return (
    <Dialogo aberto={aberto} aoFechar={aoFechar} titulo="Reportar problema ou sugerir melhoria">
      <form onSubmit={submeter} className="grid gap-4">
        <Campo rotulo="O que é" obrigatorio>
          <Selecao name="tipo" value={tipo} onChange={(e) => setTipo(e.target.value as TipoReporte)}>
            <option value="problema">Algo não está funcionando</option>
            <option value="sugestao">Sugestão de melhoria</option>
          </Selecao>
        </Campo>
        <Campo rotulo="Resumo" dica="Uma frase. O sintoma, não a causa." obrigatorio>
          <Entrada name="titulo" required minLength={5} maxLength={120} autoFocus placeholder={config.placeholderTitulo} />
        </Campo>
        <Campo rotulo={config.rotuloDescricao} obrigatorio>
          <AreaTexto name="descricao" required minLength={10} maxLength={4000} rows={4} />
        </Campo>
        {config.exibePassosEEsperado ? (
          <>
            <Campo rotulo="Como reproduzir" obrigatorio>
              <AreaTexto name="passos" required maxLength={4000} rows={4} placeholder={'1. Entrar em…\n2. Clicar em…\n3. …'} />
            </Campo>
            <Campo rotulo="Esperado x obtido" obrigatorio>
              <AreaTexto name="esperado" required maxLength={4000} rows={3} placeholder={'Esperado: …\nObtido: …'} />
            </Campo>
          </>
        ) : null}
        <p className="text-xs text-muted-foreground">
          Enviaremos sua conta e a tela atual para ajudar na investigação. Não inclua senha, token ou dado de cliente.
        </p>
        {enviar.isError ? (
          <Erro>{mensagemErroReporte(enviar.error instanceof ErroApi ? enviar.error.status : undefined)}</Erro>
        ) : null}
        <Botao type="submit" carregando={enviar.isPending} disabled={enviar.isPending} className="justify-self-start">
          {enviar.isPending ? 'Enviando…' : 'Enviar'}
        </Botao>
      </form>
    </Dialogo>
  );
}
