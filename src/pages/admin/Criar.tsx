import { NavBar } from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import { AuthContext } from "@/contexts/AuthContext"
import { usuarios } from "@/utils/data/usuarios"
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

export function Criar() {
    const data = usuarios
    const { user } = useContext(AuthContext)

    const formSchema = z.object({
        nome: z.string(),
        cpf: z.string(),
        role: z.string(),
        cnpj: z.string(),
      })

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            cpf: "",
            role: "",
            cnpj:""
        },
    })
    
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const [openRoles, setOpenRoles] = React.useState(false)
    const [valueRoles, setValueRoles] = React.useState("")
    const roles = ["Nenhum","Beneficiário","Administrador","Parlamentar"]


    return(
        <>
            <NavBar nomeUsuario={user?.nome} />
            <div className="container space-y-20 mb-20">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-blue-600 text-2xl font-bold">Novo Usuário</h1>
                        <span className="">Crie usuários ou emendas para aplicação</span> 
                    </div>
                    <Button variant="outline">Voltar</Button>
                </div>
                <div>
                <Tabs defaultValue="usuarios" className="w-full">
                        <TabsList>
                            <TabsTrigger value="usuarios">Usuário</TabsTrigger>
                            <TabsTrigger value="emendas">Emenda</TabsTrigger>
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
                                                    <Input placeholder="CPF" {...field} />
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
                                                    <Input placeholder="CNPJ relacionado" disabled={valueRoles.toLowerCase() !== "beneficiário"} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    }
                                    <Button type="submit">Criar usuário</Button>
                                </form>
                            </Form>
                        </TabsContent>
                        <TabsContent value="emendas">
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>  
    )
}