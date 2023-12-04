import * as React from "react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import  Logo  from "@/assets/LogoNav.svg"
import { ModeToggle } from "./mode-toggle";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { signOut } from "@/services/api";

interface Props{
    nomeUsuario ?: string
}

export function NavBar({nomeUsuario} : Props) {
    const [menu, setMenu] = React.useState("hidden")

    function handleMenuNav(){
        menu === "hidden" ? setMenu("show") : setMenu("hidden")
    }
    
    return(
        <NavigationMenu className="mb-20 border-b-2">
            <NavigationMenuList className="p-3 w-[100vw] flex">
                <div className="container flex justify-between">
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            <img className="h-10 w-18" src={Logo} />
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <div className="flex">
                        <NavigationMenuList>
                            <div>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Órgãos do Governo
                                </NavigationMenuLink>
                            </div>
                        </NavigationMenuList>
                        <NavigationMenuList>
                            <div>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Acesso à Informação
                                </NavigationMenuLink>
                            </div>
                        </NavigationMenuList>
                        <NavigationMenuList>
                            <div>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Legislação
                                </NavigationMenuLink>
                            </div>
                        </NavigationMenuList>
                        <NavigationMenuList>
                            <div>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Acessibilidade
                                </NavigationMenuLink>
                            </div>
                        </NavigationMenuList>
                        <NavigationMenuList className="border-l pl-4 pr-4">
                            <ModeToggle/>
                        </NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger onClick={() => handleMenuNav()}>
                                <div className="flex items-center space-x-2">
                                    <div>
                                        {nomeUsuario}
                                    </div>
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage/>
                                        <AvatarFallback>{nomeUsuario?.slice(0,2)}</AvatarFallback>
                                    </Avatar>
                                </div>
                            </NavigationMenuTrigger>
                            <div className={menu === "hidden" ? "relative hidden" : "relative"}>
                                <div className="absolute right-0 flex flex-col min-w-[300px] border rounded bg-background"> 
                                    <span className="font-semibold text-sm p-3">Minha conta</span>
                                    <Separator/>
                                    <span className="font-normal hover:bg-slate-200 text-sm p-3">Dados Pessoais</span>
                                    <span className="font-normal hover:bg-slate-200 text-sm p-3">Segurança da Conta</span>
                                    <span className="font-normal hover:bg-slate-200 text-sm p-3">Privacidade</span>
                                    <span className="font-semibold text-sm p-3 mt-2">Serviços</span>
                                    <Separator/>
                                    <span className="font-normal hover:bg-slate-200 text-sm p-3">Carteira de Documentos</span>
                                    <span className="font-normal hover:bg-slate-200 text-sm p-3">Baixar certidões</span>
                                    <span className="font-normal hover:bg-slate-200 text-sm p-3">Assinar documentos digitalmente</span>
                                    <span className="font-normal hover:bg-slate-200 text-sm p-3">Notificações</span>
                                    <span className="font-normal hover:bg-slate-200 text-sm p-3">Ajuda da conta gov.br</span>
                                    <Button className="self-end max-w-[150px] bg-secondary-foreground m-3" onClick={() => signOut()}>Sair da conta</Button>
                                </div> 
                            </div>
                        </NavigationMenuItem>
                    </div>
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
