import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { columns } from "@/utils/data-tables/ListarEmendas/columns"

import { DataTable } from "@/utils/data-tables/ListarEmendas/data-table"
import { mockEmendas } from "@/utils/data/emendas";

export function ListarEmendas(){
    const navigate = useNavigate()
    const data = mockEmendas

    return(
        <>
            <div className="h-[100vh] flex items-center">
                <div className="container space-y-20">
                    <div className="flex flex-col">
                        <h1 className="text-blue-600 text-2xl font-bold">Emendas</h1>
                        <span className="">Visualize o rol de emendas do autor</span> 
                    </div>
                    <div>
                        <DataTable columns={columns} data={data}/>
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