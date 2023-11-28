interface usuario {
    id : string
    role: "comum" | "parlamentar" | "beneficiario"
    cnpjBeneficiario?: string
}

export const usuarios: usuario[] = [
    {
        id: "000.000.000-01",
        role: "parlamentar"
    },
    {
        id: "000.000.000-02",
        role: "beneficiario",
        cnpjBeneficiario: "00.000.000/0001-00"
    },
    {
        id: "000.000.000-03",
        role: "comum"
    },
]