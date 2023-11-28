import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { columns } from "@/utils/data-tables/ListarProgramas/columns"
import { DataTable } from "@/utils/data-tables/ListarProgramas/data-table"
import { mockProgramas } from "@/utils/data/programas";

export function ListarProgramas(){
    const navigate = useNavigate()
    const data = mockProgramas

    return(
        <>
            <div className="h-[100vh] flex items-center">
                <div className="container space-y-20">
                    <div className="flex flex-col">
                        <h1 className="text-blue-600 text-2xl font-bold">Programas</h1>
                        <span className="">Visualize programas na plataforma transfereGov</span> 
                    </div>
                    <div>
                        <DataTable columns={columns} data={data}/>
                    </div>
                    <div className="absolute right-10 bottom-10">
                        <div className="flex flex-col space-y-3">
                            <ModeToggle/>
                            <Button className="p-0" onClick={() => navigate("/")}><SignOut size={20} weight="bold"/></Button>
                        </div>
                    </div>
                </div>
            </div>
        </>  
    )
}