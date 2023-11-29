import { Documentos } from "./transferenciasEspeciais"

export type EmendaIndicada = {
    id: string
    gnd: number
    iduso: number
    mod: number
    fte: number
    nomeBeneficiario: string
    cnpjBeneficiario: string
    valorEmenda: number
    nomeAutor: string
    valorIndicado: number
    valorPriorizado: number
    valorBloqueado: number
    valorPendente: number
    valorTramitando: number
    valorEmpenhado: number
    valorImpedido: number
    acao: string
    cienciaBeneficiario: boolean
    custeio: number
    anexos: Documentos[]
}

export type Emenda = {
    id: string
    funcionalProgramatica: string
    valorTotal: number
    valorIndicado: number
    valorBloqueado: number
    valorPendente: number
    valorTramitando: number
    valorEmpenhado: number
    localizacao: string
    exercicio: string
    uo: string
    acao: string
    emendasIndicadas: EmendaIndicada[]
}


export const mockEmendas: Emenda[] = [
    {
      id: "1",
      funcionalProgramatica: "00.00000.00.000.0000.0000.0001",
      valorTotal: 1000000,
      valorIndicado: 0,
      valorBloqueado: 0,
      valorPendente: 0,
      valorTramitando: 0,
      valorEmpenhado: 0,
      localizacao: "Brasília",
      exercicio: "2023",
      uo: "00000 - UO 1",
      acao: "000029",
      emendasIndicadas: [
        {
          id: "000000000001",
          gnd: 0,
          iduso: 0,
          mod: 0,
          fte: 0,
          nomeBeneficiario: "",
          cnpjBeneficiario: "",
          valorEmenda: 1000000,
          valorIndicado: 0,
          nomeAutor: "TesteX",
          valorPriorizado: 0,
          valorBloqueado: 0,
          valorPendente: 0,
          valorTramitando: 0,
          valorEmpenhado: 0,
          custeio: 0,
          valorImpedido: 0,
          acao: "000029",
          cienciaBeneficiario: false,
          anexos: [
            {
                dataUpload: "01/01/2023",
                tipoDocumento: "Empenho",
                descricao: "Empenho gerado apenas testes11",
                categoria: "N/A"
            },
        ]
        },
        {
          id: "000000000002",
          gnd: 0,
          iduso: 0,
          mod: 0,
          fte: 0,
          nomeBeneficiario: "Fundo Municipal X",
          cnpjBeneficiario: "00.000.000/0001-00",
          valorEmenda: 450000,
          valorIndicado: 450000,
          nomeAutor: "TesteX",
          valorPriorizado: 0,
          valorBloqueado: 0,
          valorPendente: 0,
          valorTramitando: 0,
          valorEmpenhado: 0,
          custeio: 0,
          valorImpedido: 0,
          cienciaBeneficiario: true,
          acao: "000029",
          anexos: [
            {
                dataUpload: "20/02/2023",
                tipoDocumento: "Empenho",
                descricao: "Empenho gerado apenas testes12",
                categoria: "N/A"
            },
        ]
        },
        {
          id: "000000000004",
          gnd: 0,
          iduso: 0,
          mod: 0,
          fte: 0,
          nomeBeneficiario: "Fundo Municipal X",
          cnpjBeneficiario: "00.000.000/0001-00",
          valorEmenda: 450000,
          valorIndicado: 450000,
          nomeAutor: "TesteX",
          valorPriorizado: 0,
          valorBloqueado: 0,
          valorPendente: 0,
          valorTramitando: 0,
          valorEmpenhado: 0,
          custeio: 0,
          valorImpedido: 0,
          cienciaBeneficiario: false,
          acao: "000029",
          anexos: [
            {
                dataUpload: "20/03/2023",
                tipoDocumento: "Empenho",
                descricao: "Empenho gerado apenas testes13",
                categoria: "N/A"
            },
        ]
        },
        {
          id: "000000000003",
          gnd: 0,
          iduso: 0,
          mod: 0,
          fte: 0,
          nomeBeneficiario: "Associação Beneficente Y",
          cnpjBeneficiario: "00.000.000/0002-00",
          valorEmenda: 100000,
          valorIndicado: 100000,
          nomeAutor: "TesteX",
          valorPriorizado: 0,
          valorBloqueado: 0,
          valorPendente: 0,
          valorTramitando: 0,
          valorEmpenhado: 0,
          cienciaBeneficiario: true,
          custeio: 0,
          valorImpedido: 0,
          acao: "000029",
          anexos: [
            {
                dataUpload: "23/03/2023",
                tipoDocumento: "Empenho",
                descricao: "Empenho gerado apenas testes2",
                categoria: "N/A"
            },
        ]
        },
      ],
    },
    {
      id: "2",
      funcionalProgramatica: "00.00000.00.000.0000.0000.0002",
      valorTotal: 200000,
      valorIndicado: 0,
      valorBloqueado: 0,
      valorPendente: 0,
      valorTramitando: 0,
      valorEmpenhado: 0,
      localizacao: "Localizacao 2",
      exercicio: "2023",
      uo: "00001 - UO 2",
      acao: "000002",
      emendasIndicadas: [
        {
          id: "2",
          gnd: 0,
          iduso: 0,
          mod: 0,
          fte: 0,
          nomeBeneficiario: "",
          cnpjBeneficiario: "",
          valorEmenda: 200000,
          valorIndicado: 0,
          valorPriorizado: 0,
          valorBloqueado: 0,
          nomeAutor: "TesteX",
          valorPendente: 0,
          valorTramitando: 0,
          valorEmpenhado: 0,
          custeio: 0,
          valorImpedido: 0,
          acao: "000002",
          cienciaBeneficiario: false,
          anexos: [
            {
                dataUpload: "23/08/2023",
                tipoDocumento: "Empenho",
                descricao: "Empenho gerado apenas testes4",
                categoria: "N/A"
            },
        ]
        },
      ],
    },
    {
      id: "3",
      funcionalProgramatica: "00.00000.00.000.0000.0000.0003",
      valorTotal: 10000000,
      valorIndicado: 0,
      valorBloqueado: 0,
      valorPendente: 0,
      valorTramitando: 0,
      valorEmpenhado: 0,
      localizacao: "Localizacao 3",
      exercicio: "2023",
      uo: "00002 - UO 3",
      acao: "000001",
      emendasIndicadas: [
        {
          id: "3",
          gnd: 0,
          iduso: 0,
          mod: 0,
          fte: 0,
          nomeBeneficiario: "",
          cnpjBeneficiario: "",
          valorEmenda: 10000000,
          valorIndicado: 0,
          valorPriorizado: 0,
          nomeAutor: "TesteX",
          valorBloqueado: 0,
          valorPendente: 0,
          valorTramitando: 0,
          valorEmpenhado: 0,
          custeio: 0,
          valorImpedido: 0,
          acao: "000001",
          cienciaBeneficiario: false,
          anexos: [
            {
                dataUpload: "11/06/2023",
                tipoDocumento: "Empenho",
                descricao: "Empenho gerado",
                categoria: "N/A"
            },
        ]
        },
      ],
    },
  ];
  