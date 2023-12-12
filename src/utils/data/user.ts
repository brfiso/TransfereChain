export type User = {
    cpf: string
    nome: string
    role: string
    wallet: string
    cnpj?: string
}

export const mockUser : User[] = [
    {
        cpf: "000.000.000-00",
        nome: "João Silva",
        role: "Admin",
        wallet: "0x1F163f845a5541693525E89422A362481D362B7E",
    },
    {
        cpf: "000.000.000-01",
        nome: "Maria Oliveira",
        role: "parlamentar",
        wallet: "0xc87216aD244694DecF7C193E9E2Bf265636f348A"
    },
    {
        cpf: "000.000.000-02",
        nome: "Carlos Santos",
        role: "beneficiário",
        wallet: "0xd135A4b159b2740644a9B0Cb8d5a29C47351bD37",
        cnpj: "00.000.000/0001-00"
    },
    {
        cpf: "000.000.000-03",
        nome: "Ana Souza",
        role: "nenhum",
        wallet: "0x25A3285890f10A627D97991ce232B49D6eD0e558"
    }
]