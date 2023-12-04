import { NavBar } from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import { AuthContext } from "@/contexts/AuthContext"
import { useContext } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger } from "@radix-ui/react-popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { PopoverContent } from "@/components/ui/popover"
import { Check } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import React from "react"
import { ChevronsUpDown } from "lucide-react"
import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react" 
import { api } from "@/services/api";
import { useNavigate } from "react-router-dom"
import { abi, contractAddress } from "@/utils/contrato"
import { MaskitoOptions } from "@maskito/core"
import { useMaskito } from "@maskito/react"

export function Criar() {

    const { user, userAccess } = useContext(AuthContext)
    const userWallet = useAddress()
    const {contract} = useContract(contractAddress, abi)
    userAccess("administrador")

    const formSchema = z.object({
        nome: z.string(),
        cpf: z.string({
            required_error: "CPF é obrigatório"
        }).length(14, {
            message: "CPF incorreto"
        }),
        role: z.string({
            required_error: "Cargo é obrigatório"
        }),
        cnpj: z.string().max(18, {
            message: "CNPJ incorreto"
        }),
		wallet: z.string(),
		password: z.string({
            required_error: "Senha é obrigatória"
        }),
      })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            cpf: "",
            role: "",
            cnpj:"",
			wallet: "",
			password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
		try{
            let cpf = values.cpf
            let wallet = values.wallet
            let nome = values.nome
            let cnpj = values.cnpj
            let role = values.role
            let password = values.password

			await api.post("registerUser", {
                cpf, wallet, nome, cnpj, role, password
            });

            await contract.call("registraParlamentar", [1, values.wallet, values.nome,])  

            window.alert(`Sucesso: Usuário registrado com sucesso`);

		}catch(err: any){
            window.alert(`Error: ${err}`);
		}
	}

    const [openRoles, setOpenRoles] = React.useState(false)
    const [valueRoles, setValueRoles] = React.useState("")
    const roles = ["Nenhum","Beneficiário","Administrador","Parlamentar"]
    const navigate = useNavigate()

    const cpfMask: MaskitoOptions = {
        mask: [/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,"-",/\d/,/\d/]
    };
    const cpfRef = useMaskito({options: cpfMask});

    const cnpjMask: MaskitoOptions = {
        mask: [/\d/,/\d/,".",/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,"/",/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/]
    };
    const cnpjRef = useMaskito({options: cnpjMask});

    return(
        <>
            <NavBar nomeUsuario={user?.nome} />
            <div className="container space-y-20 mb-20">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-blue-600 text-2xl font-bold">Novo Usuário</h1>
                        <span className="">Crie usuários para aplicação</span> 
                    </div>
                    <Button variant="outline" onClick={() => navigate("/admin/dashboard")} >Voltar</Button>
                </div>
                <div>
                <Tabs defaultValue="usuarios" className="w-full">
                        <TabsList>
                            <TabsTrigger value="usuarios">Usuário</TabsTrigger>
                            {/* <TabsTrigger value="emendas">Emenda</TabsTrigger> */}
                        </TabsList>
                        <TabsContent value="usuarios" className="flex flex-col">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="nome"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nome" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cpf"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>CPF</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="CPF" {...field} 
                                                        ref={cpfRef}
                                                        onInput={(evt) => {
                                                            form.setValue("cpf", evt.currentTarget.value);}}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
									<FormField
                                        control={form.control}
                                        name="wallet"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Endereço da carteira do usuário</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="0xasecdef..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Senha para primeiro acesso</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Senha para primeiro acesso" type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({}) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Cargo</FormLabel>
                                            <FormControl>
                                            <Popover open={openRoles} onOpenChange={setOpenRoles}>
                                                <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={openRoles}
                                                    className="w-[200px] justify-between"
                                                >
                                                    {valueRoles
                                                    ? roles.find((role) => role.toLowerCase() === valueRoles.toLowerCase())
                                                    : "Selecione o cargo"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Selecione a UF" />
                                                    <CommandEmpty>Nenhum cargo encontrada</CommandEmpty>
                                                    <CommandGroup>
                                                    {roles.map((role) => (
                                                        <CommandItem
                                                        key={role.toLowerCase()}
                                                        value={role.toLowerCase()}
                                                        onSelect={(currentValue) => {
                                                            setValueRoles(currentValue.toLowerCase() === valueRoles.toLowerCase() ? "" : role)
                                                            form.setValue("role", currentValue)
                                                            setOpenRoles(false)
                                                            if(currentValue.toLowerCase() !== "beneficiário"){
                                                                form.setValue("cnpj", "")
                                                            }
                                                        }}
                                                        >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            valueRoles === role.toLowerCase() ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {role}
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
                                    {
                                        valueRoles.toLowerCase() === "beneficiário" &&
                                        <FormField
                                        control={form.control}
                                        name="cnpj"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>CNPJ Relacionado</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="CNPJ relacionado"
                                                        {...field}
                                                        ref={cnpjRef}
                                                        onInput={(evt) => {
                                                            form.setValue("cnpj", evt.currentTarget.value);}}
                                                     />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    }
                                    <div>
                                        {
                                            userWallet ?
                                                <div className="flex items-center space-x-5">
                                                    <Button type="submit">Criar usuário</Button>
                                                    <ConnectWallet btnTitle="conectar a carteira" style={{
                                                        padding: 10,
                                                        borderRadius: 3,
                                                        backgroundColor: "hsl(var(--primary) / 0.5)",
                                                        color: "hsl(var(--primary-foreground))",
                                                        height: 43
                                                    }} />
                                                </div>
                                                :
                                                <ConnectWallet btnTitle="conectar a carteira" style={{
                                                    padding: 10,
                                                    borderRadius: 3,
                                                    backgroundColor: "hsl(var(--primary) / 0.9)",
                                                    color: "hsl(var(--primary-foreground))"
                                                }} />
                                        }
                                    </div>
                                </form>
                            </Form>
                        </TabsContent>
                        {/* <TabsContent value="emendas">
                        </TabsContent> */}
                    </Tabs>
                </div>
            </div>
        </>  
    )
}