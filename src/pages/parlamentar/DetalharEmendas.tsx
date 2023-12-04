import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { columns } from "@/utils/data-tables/DetalharEmendas/columns"

import { DataTable } from "@/utils/data-tables/DetalharEmendas/data-table"
import { useParams } from 'react-router-dom';
import { mockEmendas } from "@/utils/data/emendas";
import { NavBar } from "@/components/NavBar";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export function DetalharEmendas(){
    const navigate = useNavigate()

    const { id } = useParams();
    const data = mockEmendas.filter(emenda => emenda.id === id)[0]

    const { user, userAccess } = useContext(AuthContext)
    userAccess("parlamentar")
    return(
        <>
            <NavBar nomeUsuario={user?.nome} />
            <div className="container space-y-20 mb-20">
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
            </div>
        </>  
    )
}