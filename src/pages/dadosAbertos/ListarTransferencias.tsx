import { DataTable } from "@/utils/data-tables/ListarTransferencias/data-table";
import { columns } from "@/utils/data-tables/ListarTransferencias/columns"
import { mockTransferenciasEspeciais } from "@/utils/data/transferenciasEspeciais";
import { useContext, useState } from "react";
import { ufs } from "@/utils/data/ufs";
import { AuthContext } from "@/contexts/AuthContext";
import { NavBar } from "@/components/NavBar";

const data = mockTransferenciasEspeciais

export function ListarTransferencias(){
    const [ufSelecionada, setUfSelecionada] = useState("");

    const handleComboChange = (value:string) => {
        setUfSelecionada(value);
    };

    const { user } = useContext(AuthContext)
    return(
        <>
            <NavBar nomeUsuario={user?.nome} />
            <div className="container space-y-20 mb-20">
                <h1 className="text-blue-600 text-2xl font-bold">Painel das Transferências Especiais</h1>
                <div>
                    <div className="flex flex-col space-y-2">
                        <span className="text-xl font-bold">{ufSelecionada ? ufs.filter(uf => uf.value === ufSelecionada)[0].label : "Todos os Estados"}</span>
                        <span className="text-xl font-semibold">Total em Transferências Especiais: {(ufSelecionada ? data.reduce((acc, data) => data.uf.toLowerCase() === ufSelecionada ? acc + data.valor : acc + 0, 0) : data.reduce((acc, data) => acc + data.valor, 0)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</span>
                    </div>
                </div>
                <div className="mx-auto">
                    <DataTable columns={columns} data={data} onComboChange={handleComboChange} />
                </div>
            </div>
        </>     
    )
}