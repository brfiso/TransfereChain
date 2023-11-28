type Pagador = {
    orgaoSuperior: string
    entidadeVinculada: string
    unidadeGestora: string
    gestao: string
}

type Favorecido = {
    nomeFavorecido: string
    cnpjFavorecido: string
}

export type Documentos = {
    dataUpload: string
    tipoDocumento: string
    descricao: string
    categoria: "N/A" | "Prestação de contas"
}

export type TransferenciasEspeciais = {
    id: string
    nomeEnte: string
    tipoDocumento: string
    descricaoDocumento: string
    fase: string
    uf: string
    dataDocumento: string
    ano: string
    mes: string
    tipoEnte: string
    ob: string
    categoriaDespesa: string
    valor: number
    pagador: Pagador
    favorecido: Favorecido
    anexos: Documentos[]
}

export const mockTransferenciasEspeciais: TransferenciasEspeciais[] = [
    {
        id: "000001",
        nomeEnte: "Abadia do DF",
        uf: "DF",
        dataDocumento: "23/03/2023",
        ano: "2023",
        fase: "pagamento",
        mes: "Dezembro",
        tipoEnte: "Municipio",
        ob: "00000000000000000000000",
        categoriaDespesa: "Despesas de Capital",
        valor: 1000000,
        descricaoDocumento: "Ordem bancária(OB)",
        tipoDocumento: "OBC para terceiros",
        pagador:{
            entidadeVinculada: "00000 - Ministerio X",
            gestao: "000000 - Tesouro Nacional",
            orgaoSuperior: "000000 - Ministerio X",
            unidadeGestora: "00000 - ADS X"
        },
        favorecido:{
            cnpjFavorecido: "00.000.000/0001-00",
            nomeFavorecido: "Empresa Fulano de Tal"
        },
        anexos: [
            {
                dataUpload: "23/03/2023",
                tipoDocumento: "Empenho",
                descricao: "Empenho gerado apenas testes",
                categoria: "N/A"
            },
        ]
    },
    {
        id: "000003",
        nomeEnte: "Cidade ABC",
        uf: "RJ",
        dataDocumento: "10/05/2023",
        ano: "2023",
        fase: "pagamento",
        mes: "Julho",
        tipoEnte: "Municipio",
        ob: "00000000000000000000002",
        categoriaDespesa: "Despesas Correntes",
        valor: 750000,
        descricaoDocumento: "Ordem bancária(OB)",
        tipoDocumento: "OBC para terceiros",
        pagador: {
          entidadeVinculada: "00002 - Ministerio Z",
          gestao: "000002 - Tesouro Municipal",
          orgaoSuperior: "000002 - Ministerio Z",
          unidadeGestora: "00002 - ADS Z"
        },
        favorecido: {
          cnpjFavorecido: "22.222.222/2222-22",
          nomeFavorecido: "Empresa Beltrano de Tal"
        },
        anexos: [
          {
            dataUpload: "10/05/2023",
            tipoDocumento: "Empenho",
            descricao: "Empenho gerado apenas para testes",
            categoria: "N/A"
          },
        ]
      },
      {
        id: "000004",
        nomeEnte: "Cidade WXY",
        uf: "MG",
        dataDocumento: "02/11/2023",
        ano: "2023",
        fase: "pagamento",
        mes: "Fevereiro",
        tipoEnte: "Municipio",
        ob: "00000000000000000000003",
        categoriaDespesa: "Despesas de Capital",
        valor: 1200000,
        descricaoDocumento: "Ordem bancária(OB)",
        tipoDocumento: "OBC para terceiros",
        pagador: {
          entidadeVinculada: "00003 - Ministerio W",
          gestao: "000003 - Tesouro Estadual",
          orgaoSuperior: "000003 - Ministerio W",
          unidadeGestora: "00003 - ADS W"
        },
        favorecido: {
          cnpjFavorecido: "33.333.333/3333-33",
          nomeFavorecido: "Empresa Delta de Tal"
        },
        anexos: [
          {
            dataUpload: "02/11/2023",
            tipoDocumento: "Empenho",
            descricao: "Empenho gerado apenas para testes",
            categoria: "N/A"
          },
        ]
      },
      {
        id: "000005",
        nomeEnte: "Cidade UVW",
        uf: "RS",
        dataDocumento: "18/08/2023",
        ano: "2023",
        fase: "pagamento",
        mes: "Setembro",
        tipoEnte: "Municipio",
        ob: "00000000000000000000004",
        categoriaDespesa: "Despesas de Custeio",
        valor: 900000,
        descricaoDocumento: "Ordem bancária(OB)",
        tipoDocumento: "OBC para terceiros",
        pagador: {
          entidadeVinculada: "00004 - Ministerio U",
          gestao: "000004 - Tesouro Municipal",
          orgaoSuperior: "000004 - Ministerio U",
          unidadeGestora: "00004 - ADS U"
        },
        favorecido: {
          cnpjFavorecido: "44.444.444/4444-44",
          nomeFavorecido: "Empresa Epsilon de Tal"
        },
        anexos: [
          {
            dataUpload: "18/08/2023",
            tipoDocumento: "Empenho",
            descricao: "Empenho gerado apenas para testes",
            categoria: "N/A"
          },
        ]
      }
]