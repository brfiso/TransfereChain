import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { columns } from "@/utils/data-tables/DetalharTransferencias/columns"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { DataTable } from "@/utils/data-tables/DetalharTransferencias/data-table"
import { useParams } from 'react-router-dom';
import { mockTransferenciasEspeciais } from "@/utils/data/transferenciasEspeciais";
import { NavBar } from "@/components/NavBar";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export function DetalharTransferencias(){
    const navigate = useNavigate()

    const { id } = useParams();
    const data = mockTransferenciasEspeciais.filter(transferenciaEspecial => transferenciaEspecial.id === id)[0]
    const { user } = useContext(AuthContext)

    return(
        <>
            <NavBar nomeUsuario={user?.nome} />
            <div className="container space-y-20 mb-20">
                <div className="flex justify-between items-center">
                    <h1 className="text-blue-600 text-2xl font-bold">Detalhes do Documento</h1>
                    <Button className="px-10" onClick={() => navigate("/transferenciasEspeciais/listar")}>Voltar</Button>    
                </div>
                <div>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="font-semibold">Nº do documento:</span>
                                <span className="ml-2">{data.id}</span>    
                            </div>   
                            <div className="flex ">
                                <span className="font-semibold">Fase:</span>
                                <span className="ml-2">{data.fase}</span>    
                            </div>   
                            <div className="flex ">
                                <span className="font-semibold">Data:</span>
                                <span className="ml-2">{data.dataDocumento}</span>    
                            </div>   
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                            <div>
                                <span className="font-semibold">Tipo de documento:</span>
                                <span className="ml-2">{data.tipoDocumento}</span>    
                            </div>   
                            <div className="flex ">
                                <span className="font-semibold">Descrição:</span>
                                <span className="ml-2">{data.descricaoDocumento}</span>    
                            </div>   
                            <div className="flex ">
                                <span className="font-semibold">Valor do documento:</span>
                                <span className="ml-2">{data.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</span>    
                            </div>   
                        </div>
                    </div>
                <div>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="font-bold text-xl">Dados do Favorecido</AccordionTrigger>
                            <AccordionContent>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="font-semibold">CPF/CNPJ/OUTROS:</span>
                                    <span className="ml-2">{data.favorecido.cnpjFavorecido}</span>    
                                </div>           
                                <div>
                                    <span className="font-semibold">Nome:</span>
                                    <span className="ml-2">{data.favorecido.nomeFavorecido}</span>  
                                </div>
                            </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="font-bold text-xl">Dados do Orgão Pagador</AccordionTrigger>
                            <AccordionContent>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="font-semibold">Órgão Superior:</span>
                                    <span className="ml-2">{data.pagador.orgaoSuperior}</span>    
                                </div>           
                                <div>
                                    <span className="font-semibold">Órgão/Entidade Vinculada:</span>
                                    <span className="ml-2">{data.pagador.entidadeVinculada}</span>  
                                </div>
                                <div>
                                    <span className="font-semibold">Unidade Gestora:</span>
                                    <span className="ml-2">{data.pagador.unidadeGestora}</span>  
                                </div>
                                <div>
                                    <span className="font-semibold">Gestão:</span>
                                    <span className="ml-2">{data.pagador.gestao}</span>  
                                </div>
                            </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="font-bold text-xl">Documentos Relacionados</AccordionTrigger>
                            <AccordionContent>
                            <DataTable columns={columns} data={data.anexos}/>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </>  
    )
}