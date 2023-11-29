import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SignOut } from "@phosphor-icons/react";
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
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export function DetalharProgramas(){
    const navigate = useNavigate()
    const { id } = useParams();
    const params = new URLSearchParams(window.location.search);
    const successParam = params.get("success");  
    const saveSuccessParam = params.get("savesuccess");  

    const data = mockProgramas.filter(programa => programa.id === id)[0]
    const [modalOpen, setModalOpen] = useState(false)
    return(
        <>
            <div className="h-[100vh] flex items-center">
                <div className="container space-y-20">
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
                                    <div>
                                        <span className="text-lg font-semibold">Dados da carteira</span>
                                        <ConnectButton.Custom>
                                        {({
                                            account,
                                            chain,
                                            openAccountModal,
                                            openChainModal,
                                            openConnectModal,
                                            authenticationStatus,
                                            mounted,
                                        }) => {
                                            const ready = mounted && authenticationStatus !== 'loading';
                                            const connected =
                                            ready &&
                                            account &&
                                            chain &&
                                            (!authenticationStatus ||
                                                authenticationStatus === 'authenticated');

                                            return (
                                            <div
                                                {...(!ready && {
                                                'aria-hidden': true,
                                                'style': {
                                                    opacity: 0,
                                                    pointerEvents: 'none',
                                                    userSelect: 'none',
                                                },
                                                })}
                                            >
                                                {(() => {
                                                if (!connected) {
                                                    return (
                                                    <Button onClick={() => {setModalOpen(false); openConnectModal();}} type="button">
                                                        Conectar Carteira
                                                    </Button>
                                                    );
                                                }

                                                if (chain.unsupported) {
                                                    return (
                                                    <Button onClick={() => {setModalOpen(false); openChainModal();}} type="button">
                                                        Network Errada
                                                    </Button>
                                                    );
                                                }

                                                return (
                                                    <div style={{ display: 'flex', gap: 12}}>

                                                    <Button onClick={() => {setModalOpen(false); openAccountModal();}} type="button">
                                                        {account.displayName}
                                                        {account.displayBalance
                                                        ? ` (${account.displayBalance})`
                                                        : ''}
                                                    </Button>
                                                    </div>
                                                );
                                                })()}
                                            </div>
                                            );
                                        }}
                                        </ConnectButton.Custom>
                                    </div>
                                    <div className="flex justify-end items-center space-x-5">
                                        <Button className={buttonVariants({ variant: "secondary", size:"lg" })} onClick={() => setModalOpen(false)} >Voltar</Button>
                                        <Button className={buttonVariants({ size:"lg" })} onClick={() => {setModalOpen(false); navigate(`/programas/detalhar/${id}?success=true`)}}>Ciente</Button>
                                    </div>
                                    </DialogContent>
                                </Dialog>
                        </TabsContent>
                    </Tabs>
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