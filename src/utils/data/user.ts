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
        role: "administrador",
        wallet: "0x123abc456def789ghi",
    },
    {
        cpf: "000.000.000-01",
        nome: "Maria Oliveira",
        role: "parlamentar",
        wallet: "0x456def789ghi123abc"
    },
    {
        cpf: "000.000.000-02",
        nome: "Carlos Santos",
        role: "beneficiário",
        wallet: "0x789ghi123abc456def",
        cnpj: "00.000.000/0001-00"
    },
    {
        cpf: "000.000.000-03",
        nome: "Ana Souza",
        role: "nenhum",
        wallet: "0x123abc789ghi456def"
    }
]