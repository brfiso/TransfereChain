import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { columns } from "@/utils/data-tables/DetalharProgramas/columns"
import { DataTable } from "@/utils/data-tables/DetalharProgramas/data-table"
import { buttonVariants } from "@/components/ui/button"
import { mockProgramas } from "@/utils/data/programas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useContext, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { NavBar } from "@/components/NavBar";
import { AuthContext } from "@/contexts/AuthContext";
import { ConnectWallet } from "@thirdweb-dev/react";

export function DetalharProgramas(){
    const navigate = useNavigate()
    const { id } = useParams();
    const params = new URLSearchParams(window.location.search);
    const successParam = params.get("success");  
    const saveSuccessParam = params.get("savesuccess");  

    const data = mockProgramas.filter(programa => programa.id === id)[0]
    const [modalOpen, setModalOpen] = useState(false)
    const { user, userAccess } = useContext(AuthContext)
    
    userAccess("beneficiário")

    return(
        <>
            <NavBar nomeUsuario={user?.nome} />
                <div className="container space-y-20 mb-20">
                    <div className="flex flex-col">
                        <h1 className="text-blue-600 text-2xl font-bold">Dados do Programas</h1>
                        <span className="">Permite manuntenção de programas na plataforma transfereGov</span> 
                    </div>
                    {
                        successParam &&
                        <div className="bg-green-600 p-3 rounded">
                            <span className="font-semibold">Registro de ciência efetuado com sucesso!!</span>
                        </div>
                    }
                    {
                        saveSuccessParam &&
                        <div className="bg-green-600 p-3 rounded">
                            <span className="font-semibold">Prestação de contas efetuada com sucesso!!</span>
                        </div>
                    }
                    <Tabs defaultValue="dadosBasicos" className="w-full">
                        <TabsList>
                            <TabsTrigger value="dadosBasicos">Dados Básicos</TabsTrigger>
                            <TabsTrigger value="beneficiarios">Beneficiários</TabsTrigger>
                        </TabsList>
                        <TabsContent value="dadosBasicos" className="flex flex-col">
                            <div className="flex justify-between items-center space-x-5">
                                <div className="w-full">
                                    <Label>Ano</Label>
                                    <Input type="text" value={data.ano} disabled />
                                </div>
                                <div className="w-full">
                                    <Label>Modalidade de transferência</Label>
                                    <Input type="text" value={data.modalidadeTransferencia} disabled />
                                </div>
                                <div className="w-full">
                                    <Label>Código</Label>
                                    <Input type="text" value={data.id} disabled />
                                </div>
                            </div>
                            <div className="flex justify-between items-center space-x-5">
                                <div className="w-full">
                                    <Label>Órgão</Label>
                                    <Input type="text" value={data.orgao} disabled />
                                </div>
                                <div className="w-full">
                                    <Label>Órgão Repassador</Label>
                                    <Input type="text" value={data.orgaoRepassador} disabled />
                                </div>
                            </div>
                            <div className="flex justify-between items-center space-x-5">
                                <div className="w-full">
                                    <Label>Unidade gestora</Label>
                                    <Input type="text" value={data.unidadeGestora} disabled />
                                </div>
                                <div className="w-full">
                                    <Label>Unidade orçamentária responsávels</Label>
                                    <Input type="text" value={data.unidadeOrcamentariaResponsavel} disabled />
                                </div>
                            </div>
                            <div className="mt-20">
                                <Button onClick={() => navigate("/programas/listar")} className={buttonVariants({ variant: "secondary", size:"lg" })}>Voltar</Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="beneficiarios">
                            <DataTable columns={columns} data={data.emenda.emendasIndicadas.slice(1)}/>
                            <div className="mt-20 space-x-5">
                                <Button onClick={() => navigate("/programas/listar")} className={buttonVariants({ variant: "secondary", size:"lg" })}>Voltar</Button>
                                <Button className={buttonVariants({ size:"lg" })} onClick={() => setModalOpen(true)}>Ciente</Button>
                            </div>
                            <Dialog open={modalOpen}>
                                <DialogContent onClose={() => setModalOpen(false)}>
                                    <DialogHeader>
                                    <DialogTitle>Registrar Ciência</DialogTitle>
                                    <DialogDescription>
                                        Após o registro da ciência os valores das emendas ficarão disponíveis pela autorização de empenho pelo órgão concedente.
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div></div>
                                    <Separator/>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-semibold">Dados da carteira</span>
                                        <ConnectWallet btnTitle="Conectar a carteira" style={{color: "hsl(var(--foreground))", background: "hsl(var(--secondary))"}}/>
                                    </div>
                                    <div className="flex justify-end items-center space-x-5">
                                        <Button className={buttonVariants({ variant: "secondary", size:"lg" })} onClick={() => setModalOpen(false)} >Voltar</Button>
                                        <Button className={buttonVariants({ size:"lg" })} onClick={() => {setModalOpen(false); navigate(`/programas/detalhar/${id}?success=true`)}}>Ciente</Button>
                                    </div>
                                    </DialogContent>
                                </Dialog>
                        </TabsContent>
                    </Tabs>
                </div>
        </>  
    )
}