import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Check, ChevronsUpDown } from "lucide-react" 

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { List } from "@phosphor-icons/react"

import { EmendaIndicada } from "@/utils/data/emendas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import React from "react"
import { beneficiarios } from "@/utils/data/beneficiarios"
import { ufs } from "@/utils/data/ufs"
import { Separator } from "@/components/ui/separator"
import { useNavigate, useParams } from "react-router-dom"
import { ConnectWallet } from "@thirdweb-dev/react"

export const columns: ColumnDef<EmendaIndicada>[] = [
    {
        accessorKey: "gnd",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                GND
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
      accessorKey: "iduso",
      header: ({ column }) => {
          return (
            <Button
              className="px-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              IDUSO
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
      },
    },
    {
        accessorKey: "mod",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                MOD
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
      accessorKey: "fte",
      header: ({ column }) => {
          return (
            <Button
              className="px-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              FTE
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
      },
    },
    {
      accessorKey: "nomeBeneficiario",
      header: ({ column }) => {
          return (
            <Button
              className="px-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Nome
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
      },
    },
    {
      accessorKey: "cnpjBeneficiario",
      header: ({ column }) => {
          return (
            <Button
              className="px-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              CNPJ
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
      },
    },
    {
        accessorKey: "valorEmenda",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Val. Emenda
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
        cell: ({ row }) => {
          const valor = parseFloat(row.getValue("valorEmenda"))
          const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          }).format(valor)
  
          return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "valorIndicado",
        header: ({ column }) => {
            return (
              <Button
                className="px-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Indicado
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
        cell: ({ row }) => {
          const valor = parseFloat(row.getValue("valorIndicado"))
          const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          }).format(valor)
  
          return <div className="text-left font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "valorPriorizado",
      header: ({ column }) => {
          return (
            <Button
              className="px-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Priorizado
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
      },
      cell: ({ row }) => {
        const valor = parseFloat(row.getValue("valorPriorizado"))
        const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        }).format(valor)

        return <div className="text-left font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "valorImpedido",
      header: ({ column }) => {
          return (
            <Button
              className="px-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Impedido
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
      },
      cell: ({ row }) => {
        const valor = parseFloat(row.getValue("valorImpedido"))
        const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        }).format(valor)

        return <div className="text-left font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "valorBloqueado",
      header: ({ column }) => {
          return (
            <Button
              className="px-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Bloqueado
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
      },
      cell: ({ row }) => {
        const valor = parseFloat(row.getValue("valorBloqueado"))
        const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        }).format(valor)

        return <div className="text-left font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "valorTramitando",
    header: ({ column }) => {
        return (
          <Button
            className="px-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tramitando
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => {
      const valor = parseFloat(row.getValue("valorTramitando"))
      const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      }).format(valor)

      return <div className="text-left font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "valorPendente",
    header: ({ column }) => {
        return (
          <Button
            className="px-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Pendente
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => {
      const valor = parseFloat(row.getValue("valorPendente"))
      const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      }).format(valor)

      return <div className="text-left font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "valorEmpenhado",
    header: ({ column }) => {
        return (
          <Button
            className="px-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Empenhado
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => {
      const valor = parseFloat(row.getValue("valorEmpenhado"))
      const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      }).format(valor)

      return <div className="text-left font-medium">{formatted}</div>
  },
  },
  {
    id: "actions",
    accessorKey: "ações",
    header: "Ações",
    cell: ({ row }) => {
    const emenda = row.original
    const navigate = useNavigate()
    const { id } = useParams();

    const formSchema = z.object({
      beneficiario: z.string(
        {
          required_error: "O beneficiário é obrigatório"
        }
      ),
      estado: z.string(),
      valor: z.number(
        {
          required_error: "O valor não pode ser nulo"
        }
      ).nonnegative().lte(emenda.valorEmenda, {
        message: "Insira um valor válido",
      }).min(1,{
        message: "Insira um valor válido",
      }),
      cnpj: z.string(),
      nome: z.string(),
      uf: z.string(),
      municipio: z.string(),
      naturezaJuridica: z.string(),
      estabelecimento: z.string(),
      justificativa: z.string( 
      {
        required_error: "A justificativa é obrigatória"
      }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            beneficiario: "",
            estado: "",
            valor: 0,
            cnpj: "",
            nome: "",
            uf: "",
            municipio: "",
            naturezaJuridica: "",
            estabelecimento: "",
            justificativa: "",
        },
    })
    
    const [openBeneficiarios, setOpenBeneficiarios] = React.useState(false)
    const [valueBeneficiarios, setValueBeneficiarios] = React.useState("")

    const [openUfs, setOpenUfs] = React.useState(false)
    const [valueUfs, setValueUfs] = React.useState("")

    const [modal, setModal] = React.useState(false)

    function onSubmit(values: z.infer<typeof formSchema>) {
      setModal(false)
      console.log(values)
      return navigate(`/emendas/detalhar/${id}?success=true`)
    }
    
      return (
        <Dialog open={modal}>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <List size={16} />
              </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator/>
                <DialogTrigger onClick={() => setModal(true)}><DropdownMenuItem>Adicionar Beneficiário</DropdownMenuItem></DialogTrigger>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>
                Alterar Beneficiário
              </DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent onClose={() => setModal(false)} className="min-w-[800px]">
            <DialogHeader>
              <DialogTitle>Adicionar Beneficiário</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <FormField
                    control={form.control}
                    name="beneficiario"
                    render={({}) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Beneficiário</FormLabel>
                        <FormControl>
                          <Popover open={openBeneficiarios} onOpenChange={setOpenBeneficiarios}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openBeneficiarios}
                                className="w-[300px] justify-between"
                              >
                                {valueBeneficiarios
                                  ? beneficiarios.find((beneficiario) => beneficiario.nome.toLowerCase() === valueBeneficiarios.toLowerCase())?.nome
                                  : "Selecione o beneficiário"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0">
                              <Command>
                                <CommandInput placeholder="Selecione o beneficiário" />
                                <CommandEmpty>Nenhum beneficiário encontrado</CommandEmpty>
                                <CommandGroup>
                                  {beneficiarios.map((beneficiario) => (
                                    valueUfs != "" ?
                                      beneficiario.uf.toLowerCase() === valueUfs.toLowerCase() &&
                                        <CommandItem
                                          key={beneficiario.nome.toLowerCase()}
                                          value={beneficiario.nome.toLowerCase()}
                                          onSelect={(currentValue) => {
                                            setValueBeneficiarios(currentValue.toLowerCase() === valueBeneficiarios.toLowerCase() ? "" : currentValue)
                                            setOpenBeneficiarios(false)

                                            let beneficiarioAlvo = beneficiarios.filter(beneficiario => beneficiario.nome.toLowerCase() === currentValue.toLowerCase())[0]

                                            form.setValue("beneficiario", currentValue)
                                            form.setValue("cnpj", beneficiarioAlvo.id)
                                            form.setValue("uf", beneficiarioAlvo.uf)
                                            form.setValue("estado", beneficiarioAlvo.uf)
                                            form.setValue("municipio", beneficiarioAlvo.municipio)
                                            form.setValue("naturezaJuridica", beneficiarioAlvo.naturezaJuridica)
                                            form.setValue("estabelecimento", beneficiarioAlvo.estabelecimento)

                                            setValueUfs(beneficiarioAlvo.uf)
                                          }}
                                        >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          valueBeneficiarios === beneficiario.nome.toLowerCase() ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {beneficiario.nome}
                                      </CommandItem>
                                    :
                                    <CommandItem
                                      key={beneficiario.nome.toLowerCase()}
                                      value={beneficiario.nome.toLowerCase()}
                                      onSelect={(currentValue) => {
                                        setValueBeneficiarios(currentValue.toLowerCase() === valueBeneficiarios.toLowerCase() ? "" : currentValue)
                                        setOpenBeneficiarios(false)

                                        let beneficiarioAlvo = beneficiarios.filter(beneficiario => beneficiario.nome.toLowerCase() === currentValue.toLowerCase())[0]

                                        form.setValue("beneficiario", currentValue)
                                        form.setValue("cnpj", beneficiarioAlvo.id)
                                        form.setValue("uf", beneficiarioAlvo.uf)
                                        form.setValue("estado", beneficiarioAlvo.uf)
                                        form.setValue("municipio", beneficiarioAlvo.municipio)
                                        form.setValue("naturezaJuridica", beneficiarioAlvo.naturezaJuridica)
                                        form.setValue("estabelecimento", beneficiarioAlvo.estabelecimento)

                                        setValueUfs(beneficiarioAlvo.uf)
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          valueBeneficiarios === beneficiario.nome.toLowerCase() ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {beneficiario.nome}
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
                    name="estado"
                    render={({}) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Popover open={openUfs} onOpenChange={setOpenUfs}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openUfs}
                                className="w-[200px] justify-between"
                              >
                                {valueUfs
                                  ? ufs.find((uf) => uf.value.toLowerCase() === valueUfs.toLowerCase())?.label
                                  : "Selecione a UF"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Selecione a UF" />
                                <CommandEmpty>Nenhuma UF encontrada</CommandEmpty>
                                <CommandGroup>
                                  {ufs.map((uf) => (
                                    <CommandItem
                                      key={uf.value.toLowerCase()}
                                      value={uf.label.toLowerCase()}
                                      onSelect={(currentValue) => {
                                        setValueUfs(currentValue.toLowerCase() === valueUfs.toLowerCase() ? "" : uf.value)
                                        form.setValue("estado", uf.value)
                                        setOpenUfs(false)
                                        setValueBeneficiarios("")
                                      }}
                                    >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      valueUfs === uf.label.toLowerCase() ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {uf.label}
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
                    name="valor"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Valor</FormLabel>
                                <FormControl>
                                    <Input 
                                      type="number" 
                                      min={0}
                                      max={emenda.valorEmenda}
                                      placeholder="Digite o valor" 
                                      {...field}
                                      onChange={evento => {form.setValue("valor", Number(evento.target.value))}}
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                  />
              </div>
              <div className="flex justify-between items-center">
                 <FormField
                    control={form.control}
                    name="cnpj"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>CNPJ</FormLabel>
                                <FormControl>
                                    <Input 
                                      type="text"
                                      placeholder="Escolha um beneficiário"
                                      {...field}
                                      value={valueBeneficiarios ? beneficiarios.filter(beneficiario => beneficiario.nome.toLowerCase() === valueBeneficiarios.toLowerCase())[0].id : ""}
                                      disabled
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                  />  
                 <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input 
                                      type="text"
                                      placeholder="Escolha um beneficiário"
                                      {...field}
                                      value={valueBeneficiarios ? beneficiarios.filter(beneficiario => beneficiario.nome.toLowerCase() === valueBeneficiarios.toLowerCase())[0].nome : ""}
                                      disabled
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="uf"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>UF</FormLabel>
                                <FormControl>
                                    <Input 
                                      type="text"
                                      placeholder="Escolha um beneficiário"
                                      {...field}
                                      value={valueBeneficiarios ? beneficiarios.filter(beneficiario => beneficiario.nome.toLowerCase() === valueBeneficiarios.toLowerCase())[0].uf : ""}
                                      disabled
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                  />  
              </div>
              <div className="flex justify-between items-center">
                <FormField
                    control={form.control}
                    name="municipio"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Município</FormLabel>
                                <FormControl>
                                    <Input 
                                      type="text"
                                      placeholder="Escolha um beneficiário"
                                      {...field}
                                      value={valueBeneficiarios ? beneficiarios.filter(beneficiario => beneficiario.nome.toLowerCase() === valueBeneficiarios.toLowerCase())[0].municipio : ""}
                                      disabled
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                  />  
                  <FormField
                    control={form.control}
                    name="naturezaJuridica"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>UF</FormLabel>
                                <FormControl>
                                    <Input 
                                      type="text"
                                      placeholder="Escolha um beneficiário"
                                      {...field}
                                      value={valueBeneficiarios ? beneficiarios.filter(beneficiario => beneficiario.nome.toLowerCase() === valueBeneficiarios.toLowerCase())[0].naturezaJuridica : ""}
                                      disabled
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="estabelecimento"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Estabelecimento</FormLabel>
                                <FormControl>
                                    <Input 
                                      type="text"
                                      placeholder="Escolha um beneficiário"
                                      {...field}
                                      value={valueBeneficiarios ? beneficiarios.filter(beneficiario => beneficiario.nome.toLowerCase() === valueBeneficiarios.toLowerCase())[0].estabelecimento : ""}
                                      disabled
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                  />    
              </div>
              <div className="flex justify-between items-center">
                <FormField
                    control={form.control}
                    name="justificativa"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormLabel>Justificativa</FormLabel>
                                <FormControl>
                                    <Input 
                                      type="text"
                                      placeholder="Justifique a escolha deste beneficiário"
                                      {...field}
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />   
              </div>
              <Separator/>
              <div className="flex flex-col">
                <span className="text-lg font-semibold">Meus Dados</span>
                <ConnectWallet btnTitle="Conectar a carteira" style={{color: "hsl(var(--foreground))", background: "hsl(var(--secondary))"}}/>
              </div>
                  <Button type="submit" className="self-end">Continuar</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )
    },
  }
]