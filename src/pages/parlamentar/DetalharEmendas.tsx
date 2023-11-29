import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { columns } from "@/utils/data-tables/DetalharEmendas/columns"

import { DataTable } from "@/utils/data-tables/DetalharEmendas/data-table"
import { useParams } from 'react-router-dom';
import { mockEmendas } from "@/utils/data/emendas";

export function DetalharEmendas(){
    const navigate = useNavigate()

    const { id } = useParams();
    const data = mockEmendas.filter(emenda => emenda.id === id)[0]

    return(
        <>
            <div className="h-[100vh] flex items-center">
                <div className="container space-y-20">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-blue-600 text-2xl font-bold">Dados da Emenda</h1>
                            <span>Dados da programação orçamentária da emenda</span>
                        </div>
                        <Button className="px-10" onClick={() => navigate("/emendas/listar")}>Voltar</Button>    
                    </div>
                    <div className="flex">
                        <div className="space-y-4">
                            <div>
                                <span className="font-semibold">Código</span>
                                <span className="ml-2">{data.id}</span>    
                            </div>   
                            <div>
                                <span className="font-semibold">Funcional</span>
                                <span className="ml-2">{data.funcionalProgramatica}</span>    
                            </div>   
                            <div>
                                <span className="font-semibold">UO</span>
                                <span className="ml-2">{data.uo}</span>    
                            </div>   
                            <div>
                                <span className="font-semibold">Ação</span>
                                <span className="ml-2">{data.acao}</span>    
                            </div>   
                        </div>
                        <div className="space-y-4 ml-60">
                            <div>
                                <span className="font-semibold">Localizador</span>
                                <span className="ml-2">{data.localizacao}</span>    
                            </div>   
                            <div>
                                <span className="font-semibold">Exercício</span>
                                <span className="ml-2">{data.exercicio}</span>    
                            </div>
                        </div>
                    </div>
                    <div>
                        <DataTable columns={columns} data={data.emendasIndicadas}/>
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