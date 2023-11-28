type beneficiario = {
    id: string
    nome : string
    uf: string
    municipio: string
    naturezaJuridica: string
    estabelecimento: string
}

export const beneficiarios: beneficiario[] = [
  {
    id: "00.000.000/0001-00",
    nome: "Fundo Municipal X",
    uf: "DF",
    municipio: "Brasília",
    naturezaJuridica: "0000",
    estabelecimento: "Matriz",
  },
  {
    id: "00.000.000/0002-00",
    nome: "Associação Beneficente Y",
    uf: "SP",
    municipio: "São Paulo",
    naturezaJuridica: "0001",
    estabelecimento: "Filial",
  },
  {
    id: "00.000.000/0003-00",
    nome: "Instituto Z",
    uf: "RJ",
    municipio: "Rio de Janeiro",
    naturezaJuridica: "0002",
    estabelecimento: "Matriz",
  },
  {
    id: "00.000.000/0004-00",
    nome: "Centro de Apoio W",
    uf: "MG",
    municipio: "Belo Horizonte",
    naturezaJuridica: "0003",
    estabelecimento: "Filial",
  },
];