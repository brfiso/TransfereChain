import { ModeToggle } from "@/components/mode-toggle";
import { DataTable } from "@/utils/data-tables/ListarTransferencias/data-table";
import { columns } from "@/utils/data-tables/ListarTransferencias/columns"
import { Button } from "@/components/ui/button";
import { mockTransferenciasEspeciais } from "@/utils/data/transferenciasEspeciais";

import { SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ufs } from "@/utils/data/ufs";

const data = mockTransferenciasEspeciais

export function ListarTransferencias(){
    const navigate = useNavigate()
    const [ufSelecionada, setUfSelecionada] = useState("");

    const handleComboChange = (value:string) => {
        setUfSelecionada(value);
    };
    return(
        <>
        <div className="h-[100vh] flex items-center">
            <div className="container space-y-20">
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
                <div className="absolute right-10 bottom-10">
                    <div className="flex flex-col space-y-3">
                        <ModeToggle/>
                        <Button className="p-0" onClick={() => navigate("/")}><SignOut size={20} weight="bold" /></Button>
                    </div>
                </div>
            </div>
        </div>
        </>     
    )
}