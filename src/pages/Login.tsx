import imgGoverno from "@/assets/governoImg.png"

import { ModeToggle } from "@/components/mode-toggle";
import { IdentificationCard, Bank, QrCode, Certificate, CloudArrowUp, Wallet } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator";
import type { MaskitoOptions } from '@maskito/core';
import { useMaskito } from '@maskito/react';
import { AuthContext } from '@/contexts/AuthContext'
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export function Login(){
    const { signIn, isAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate()
    const [validacaoLogin, setValidacaoLogin] = useState<any>()

    if(isAuthenticated){
        const { user } = useContext(AuthContext)

        if(user?.role === "administrador") {
            navigate("/admin/dashboard");
          } else if(user?.role === "parlamentar") {
            navigate("/emendas/listar");
          } else if(user?.role === "beneficiário") {
            navigate("/programas/listar");
          } else {
            navigate("/transferenciasEspeciais/listar");
          }
    }
    
    const formSchema = z.object({
        cpf: z.string().length(14, {
            message: "O CPF é inválido."
        }),
        password: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cpf: "",
            password: "",
        },
    })

    const cpfMask: MaskitoOptions = {
        mask: [/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,"-",/\d/,/\d/]
    };
    const cpfRef = useMaskito({options: cpfMask});



    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            const response = await signIn(values)
            setValidacaoLogin(response)
        } catch(err:any){
            return err
        }
    }

    return(
        <>
            <div className="flex h-[100vh] items-center justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-h-[800px]">
                    <div></div>
                    <img className="hidden max-h-[500px] lg:col-span-2 lg:block" src={imgGoverno} />
                    <div className="max-h-[800px]">
                        <div className="border h-full p-5">
                            <span className="font-bold">Identifique-se no gov.br com:</span>
                            <div className="flex items-center my-5">
                                <IdentificationCard size={26}/> 
                                <span className="ml-2 font-semibold">Número do CPF</span>
                            </div>
                            <span className="text-xs">Digite seu CPF para criar ou acessar sua conta gov.br</span>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 my-5 flex flex-col">
                                    {
                                        validacaoLogin &&
                                        <div className="bg-destructive my-2 p-2 rounded"><span className="text-white text-sm">{validacaoLogin}</span></div>
                                    }
                                    <FormField
                                        control={form.control}
                                        name="cpf"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>CPF</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="Digite seu CPF" 
                                                        {...field}
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
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Senha</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="Digite sua senha" 
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="self-end">Continuar</Button>
                                </form>
                            </Form>
                            <span className="font-bold"> Outras opções de identificação:</span>
                            <Separator className="mt-1"/>
                            <div className="flex items-center mt-5">
                                <Wallet size={26}/>
                                <button className="ml-1" onClick={() => {}}>Entrar com sua carteira</button>
                            </div>
                            <div className="flex items-center mt-5">
                                <Bank size={26}/>
                                <span className="ml-2">Login com seu banco</span>
                            </div>
                            <div className="flex items-center my-5">
                                <QrCode size={26}/>
                                <span className="ml-2">Login com QR Code</span>
                            </div>
                            <div className="flex items-center my-5">
                                <Certificate size={26}/>
                                <span className="ml-2">Seu certificado digital</span>
                            </div>
                            <div className="flex items-center mb-20">
                                <CloudArrowUp size={26}/>
                                <span className="ml-2">Seu certificado digital em nuvem</span>
                            </div>
                        </div>
                        <div className=""></div>
                    </div>
                    <div></div>
                    <div className="absolute right-10 bottom-10">
                        <ModeToggle/>
                    </div>      
                </div>
            </div>
        </>
    )
}