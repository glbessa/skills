import { describe, expect, test } from 'vitest';
import { corpoIssue, reporteSchema } from './reportes.js';

const contexto = {
  organizacao: 'Empresa Teste',
  organizacaoId: 'org-1',
  email: 'usuario@teste.local',
  usuarioId: 'usr-1',
};

describe('reporte in-app', () => {
  test('sugestão não exige passos', () => {
    expect(
      reporteSchema.parse({
        tipo: 'sugestao',
        titulo: 'Duplicar atendimento',
        descricao: 'Facilitaria repetir serviços recorrentes',
      }).passos,
    ).toBeUndefined();
  });

  test('problema exige passos e resultado esperado', () => {
    expect(() =>
      reporteSchema.parse({
        tipo: 'problema',
        titulo: 'Erro ao salvar',
        descricao: 'O botão não conclui o salvamento',
      }),
    ).toThrow();
  });

  test('corpo usa as seções esperadas pela triagem', () => {
    const corpo = corpoIssue(
      {
        tipo: 'problema',
        titulo: 'Erro ao salvar',
        descricao: 'O botão não conclui o salvamento',
        passos: '1. Abrir formulário\n2. Salvar',
        esperado: 'Esperado: salvar\nObtido: nada acontece',
        url: 'https://app.exemplo.test/tela',
        userAgent: 'Navegador de teste',
      },
      contexto,
    );
    expect(corpo).toContain('### O que aconteceu');
    expect(corpo).toContain('### Como reproduzir');
    expect(corpo).toContain('### Esperado x obtido');
    expect(corpo).toContain('### Contexto (preenchido pelo sistema)');
  });
});
