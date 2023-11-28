import imgGoverno from "@/assets/governoImg.png"

import { ModeToggle } from "@/components/mode-toggle";
import { IdentificationCard, Bank, QrCode, Certificate, CloudArrowUp } from "@phosphor-icons/react";
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
import { useNavigate } from "react-router-dom";
import type {MaskitoOptions} from '@maskito/core';
import {useMaskito} from '@maskito/react';
import { usuarios } from "@/utils/data/usuarios";


export function Login(){
    const navigate = useNavigate();
    const formSchema = z.object({
        cpf: z.string().length(14, {
            message: "O CPF é inválido."
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cpf: "",
        },
    })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        const data = usuarios

        const usuarioEncontrado = data.find(usuario => usuario.id === values.cpf);

        if (usuarioEncontrado) {
            if (usuarioEncontrado.role === "parlamentar") {
                navigate("/emendas/listar");
            } else if (usuarioEncontrado.role === "beneficiario") {
                navigate("/programas/listar");
            } else {
                navigate("/transferenciasEspeciais/listar");
            }
        } else {
            form.setError("cpf", {
                type: "manual",
                message: "Usuário não encontrado.",
            });
        }   
    }

    const cpfMask: MaskitoOptions = {
        mask: [/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,"-",/\d/,/\d/]
    };
    const cpfRef = useMaskito({options: cpfMask});
    
    return(
        <>
            <div className="flex h-[100vh] items-center justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-h-[700px]">
                    <div></div>
                    <img className="hidden max-h-[500px] lg:col-span-2 lg:block" src={imgGoverno} />
                    <div className="max-h-[700px]">
                        <div className="border h-full p-5">
                            <span className="font-bold">Identifique-se no gov.br com:</span>
                            <div className="flex items-center my-5">
                                <IdentificationCard size={26}/> 
                                <span className="ml-2 font-semibold">Número do CPF</span>
                            </div>
                            <span className="text-xs">Digite seu CPF para criar ou acessar sua conta gov.br</span>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 my-5 flex flex-col">
                                    <FormField
                                        control={form.control}
                                        name="cpf"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>CPF</FormLabel>
                                                    <FormControl>
                                                        <Input 
                                                            type="text" 
                                                            placeholder="Digite seu CPF" 
                                                            maxLength={14}
                                                            {...field}
                                                            ref={cpfRef}
                                                            onInput={(evt) => {
                                                                form.setValue("cpf", evt.currentTarget.value);
                                                            }}
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