export type TipoReporte = 'problema' | 'sugestao';

export function obterConfiguracaoReporte(tipo: TipoReporte) {
  return tipo === 'sugestao'
    ? {
        placeholderTitulo: 'Ex.: poder duplicar um atendimento anterior',
        rotuloDescricao: 'Que dor isso resolve',
        exibePassosEEsperado: false,
      }
    : {
        placeholderTitulo: 'Ex.: o agendamento de sábado não aparece na agenda',
        rotuloDescricao: 'O que aconteceu',
        exibePassosEEsperado: true,
      };
}

export function mensagemErroReporte(status?: number) {
  if (status === 429) return 'Você já mandou vários reportes agora há pouco. Tente daqui a pouco.';
  if (status === 503) return 'Os reportes estão indisponíveis no momento.';
  return 'Não consegui registrar agora. Tente de novo em instantes.';
}
