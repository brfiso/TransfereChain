export interface Usuario {
    id : string
    role: "comum" | "parlamentar" | "beneficiario"
    nome: string
    cnpjBeneficiario?: string
}

export const usuarios: Usuario[] = [
    {
        id: "000.000.000-01",
        nome: "Fulano de tal",
        role: "parlamentar"
    },
    {
        id: "000.000.000-02",
        role: "beneficiario",
        nome: "Ciclano de tal",
        cnpjBeneficiario: "00.000.000/0001-00"
    },
    {
        id: "000.000.000-03",
        nome: "Enzo Souza",
        role: "comum"
    },
]