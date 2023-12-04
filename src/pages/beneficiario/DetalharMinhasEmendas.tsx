import { Button, buttonVariants } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { columns } from "@/utils/data-tables/DetalharAnexos/columns"
import { DataTable } from "@/utils/data-tables/DetalharAnexos/data-table"
import { useParams } from 'react-router-dom';
import { mockEmendas } from "@/utils/data/emendas";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { mockProgramas } from "@/utils/data/programas";
import { AuthContext } from "@/contexts/AuthContext";
import { NavBar } from "@/components/NavBar";

export function DetalharMinhasEmendas(){
    const navigate = useNavigate()

    const { id } = useParams();
    const alvo = mockEmendas.filter(emenda => emenda.emendasIndicadas.filter(emendaIndicada => emendaIndicada.id === id)[0])[0]
    const programa = mockProgramas.filter(programa => programa.emenda.id === alvo.id)[0]
    const data = alvo.emendasIndicadas.filter(emenda => emenda.id === id)[0]
    // const MAX_FILE_SIZE = 5000000;
    // const ACCEPTED_TYPES = ["application/pdf"];
    

    const formSchema = z.object({
        tipoDocumento: z.string({
            required_error: "O tipo de documento é obrigatório"
        }),
        breveDescricao: z.string({
            required_error: "A breve descrição é obrigatória"
        }),
        file: z.any()
            // .any().refine((files) => files?.length == 1, "Comprovante é obrigatório.")
            // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `O tamanho máximo do arquivo é 50MB.`)
            // .refine(
            //     (files) => ACCEPTED_TYPES.includes(files?.[0]?.type),
            //     "Apenas arquivos .pdf são aceitos."
            // ),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          tipoDocumento: "",
          breveDescricao: "",
          file: null
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        navigate(`/programas/detalhar/${programa.id}?savesuccess=true`)
    }

    const tipos: string[] = [
        "Contrato",
        "Nota Fiscal"
    ]

    const [openTipo, setOpenTipo] = useState(false)
    const [valueTipo, setValueTipo] = useState("")
    const { user, userAccess } = useContext(AuthContext)

    userAccess("beneficiário")

    return(
        <>
            <NavBar nomeUsuario={user?.nome} />
            <div className="container space-y-20 mb-20">
                <div className="flex flex-col">
                    <h1 className="text-blue-600 text-2xl font-bold">Prestar Conta</h1>
                    <span>Preste contas documentando os gastos da emenda</span>    
                </div>
                <div>
                    <span className="font-semibold text-xl">Dados da Emenda</span>
                    <Separator className="mt-1 mb-2"/>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="font-semibold">Código:</span>
                                <span className="ml-2">{data.id}</span>    
                            </div>   
                            <div>
                                <span className="font-semibold">Exercício:</span>
                                <span className="ml-2">{alvo.exercicio}</span>    
                            </div>   
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="font-semibold">UO:</span>
                            <span className="ml-2">{alvo.uo}</span>    
                        </div>   
                        <div className="flex ">
                            <span className="font-semibold">Descrição:</span>
                            <span className="ml-2">{data.valorEmenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</span>    
                        </div>   
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex ">
                            <span className="font-semibold">Ação:</span>
                            <span className="ml-2">{data.acao}</span>    
                        </div>   
                    </div>
                </div>
                <div>
                    <DataTable columns={columns} data={data.anexos}/>
                </div>
                <div>
                    <span className="font-semibold text-xl">Enviar Novo Documento</span>
                    <Separator className="mt-1 mb-2"/>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                            <div className="flex justify-between items-center space-x-5">
                                <FormField
                                    control={form.control}
                                    name="tipoDocumento"
                                    render={({}) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel className="mb-2">Tipo de Documento</FormLabel>
                                            <FormControl>
                                            <Popover open={openTipo} onOpenChange={setOpenTipo}>
                                                <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={openTipo}
                                                    className="w-[400px] justify-between"
                                                >
                                                    {valueTipo
                                                    ? tipos.find((tipo) => tipo.toLowerCase() === valueTipo.toLowerCase())
                                                    : "Selecione o tipo de documento"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[400px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Selecione a UF" />
                                                    <CommandEmpty>Nenhum tipo de documento encontrado</CommandEmpty>
                                                    <CommandGroup>
                                                    {tipos.map((tipo) => (
                                                        <CommandItem
                                                        key={tipo.toLowerCase()}
                                                        value={tipo.toLowerCase()}
                                                        onSelect={(currentValue) => {
                                                            setValueTipo(currentValue.toLowerCase() === valueTipo.toLowerCase() ? "" : tipo)
                                                            form.setValue("tipoDocumento", currentValue)
                                                            setOpenTipo(false)
                                                        }}
                                                        >
                                                    <Check
                                                        className={cn(
                                                        "mr-2 h-4 w-4",
                                                        valueTipo === tipo.toLowerCase() ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {tipo}
                                                    </CommandItem>
                                                    ))}
                                                    </CommandGroup>
                                                </Command>
                                                </PopoverContent>
                                            </Popover>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="breveDescricao"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                        <FormLabel>Breve Descrição</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Breve descrição" type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="file"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                        <FormLabel>Arquivo</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Sem arquivo..." 
                                                type="file" 
                                                accept=".pdf" 
                                                {...field} 
                                                // onChange={(event) => {
                                                //     const dataTransfer = new DataTransfer();
                            
                                                //     Array.from(event.target.files!).forEach((file) =>
                                                //       dataTransfer.items.add(file)
                                                //     );
                            
                                                //     const newFiles = dataTransfer.files;
                                                //     form.setValue("file", newFiles[0])
                                                //   }} 
                                                />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex justify-start items-center space-x-5">
                                <Button className={buttonVariants({ variant: "secondary", size:"lg" })} onClick={() => navigate(`/programas/detalhar/${programa.id}`)}>Voltar</Button>
                                <Button type="submit" className={buttonVariants({ size:"lg" })}>Salvar</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </>  
    )
}