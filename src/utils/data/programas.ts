import { Emenda } from "./emendas"
import { mockEmendas } from "./emendas"


export type Programa = {
    id: string
    orgao: string
    orgaoRepassador: string
    ano: string
    modalidadeTransferencia: string
    unidadeGestora: string
    unidadeOrcamentariaResponsavel: string
    emenda: Emenda
}

export const mockProgramas : Programa[] = [
    {
        id: "0000001",
        orgao: "000000 - Departamento de Coordenação e Controle de Recursos",
        ano: "2023",
        unidadeGestora: "0",
        unidadeOrcamentariaResponsavel: "000000",
        orgaoRepassador: "000000 - Departamento de Coordenação e Controle de Recursos",
        modalidadeTransferencia: "Especial",
        emenda: mockEmendas[0]
    },
    {
        id: "0000002",
        orgao: "000001 - Secretaria de Educação",
        ano: "2023",
        unidadeGestora: "1",
        unidadeOrcamentariaResponsavel: "000001",
        orgaoRepassador: "000001 - Secretaria de Educação",
        modalidadeTransferencia: "Especial",
        emenda: mockEmendas[1],
    },
    {
        id: "0000004",
        orgao: "000003 - Secretaria de Infraestrutura",
        ano: "2023",
        unidadeGestora: "3",
        unidadeOrcamentariaResponsavel: "000003",
        orgaoRepassador: "000003 - Secretaria de Infraestrutura",
        modalidadeTransferencia: "Especial",
        emenda: mockEmendas[2],
    }  
]