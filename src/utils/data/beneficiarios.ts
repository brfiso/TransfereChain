type beneficiario = {
    id: string
    nome : string
    uf: string
    wallet: string
    municipio: string
    naturezaJuridica: string
    estabelecimento: string
}

export const beneficiarios: beneficiario[] = [
  {
    id: "00.000.000/0001-00",
    nome: "Fundo Municipal X",
    wallet: "0x6396464015CEc63d57C11B4AadfA29A6A9Ab2340",
    uf: "DF",
    municipio: "Brasília",
    naturezaJuridica: "0000",
    estabelecimento: "Matriz",
  },
  {
    id: "00.000.000/0002-00",
    nome: "Associação Beneficente Y",
    wallet: "0x23187576Df8AEC26eC4Af22c7b07D7726860462C",
    uf: "SP",
    municipio: "São Paulo",
    naturezaJuridica: "0001",
    estabelecimento: "Filial",
  },
  {
    id: "00.000.000/0003-00",
    nome: "Instituto Z",
    wallet: "0x8B88DD2F779850A7089eED891F94667507312bD3",
    uf: "RJ",
    municipio: "Rio de Janeiro",
    naturezaJuridica: "0002",
    estabelecimento: "Matriz",
  },
  {
    id: "00.000.000/0004-00",
    nome: "Centro de Apoio W",
    wallet: "0xc97990381beDe023a551e189AE0ad50FedD6b8e3",
    uf: "MG",
    municipio: "Belo Horizonte",
    naturezaJuridica: "0003",
    estabelecimento: "Filial",
  },
];