import {Routes, Route} from 'react-router-dom'

import {Login} from "./pages/Login"
import {DetalharMinhasEmendas} from "./pages/beneficiario/DetalharMinhasEmendas"
import {DetalharProgramas} from "./pages/beneficiario/DetalharProgramas"
import {ListarProgramas} from "./pages/beneficiario/ListarProgramas"
import {DetalharTransferencias} from "./pages/dadosAbertos/DetalharTransferencias"
import {ListarTransferencias} from "./pages/dadosAbertos/ListarTransferencias"
import {DetalharEmendas} from "./pages/parlamentar/DetalharEmendas"
import {ListarEmendas} from "./pages/parlamentar/ListarEmendas"
import {DashBoard} from "./pages/admin/Dashboard"
import {Criar} from "./pages/admin/Criar"


export function Router(){
    return(
        <Routes>
            <Route path='/' element={<Login/>}/>

            {/* Beneficiario - Inicio */}
            <Route path='/programas/listar' element={<ListarProgramas/>}/>
            <Route path='/programas/detalhar/:id' element={<DetalharProgramas/>}/>
            <Route path='/programas/emendas/detalhar/:id' element={<DetalharMinhasEmendas/>}/>
            {/* Beneficiario - Fim */}

            {/* Parlamentar - Inicio */}
            <Route path='/emendas/listar' element={<ListarEmendas/>}/>
            <Route path='/emendas/detalhar/:id' element={<DetalharEmendas/>}/>
            {/* Parlamentar - Fim */}

            {/* Dados aberto - Inicio */}
            <Route path='/transferenciasEspeciais/listar' element={<ListarTransferencias/>}/>
            <Route path='/transferenciasEspeciais/detalhar/:id' element={<DetalharTransferencias/>}/>
            {/* Dados aberto - Fim */}

            {/* Admin - Inicio */}
            <Route path='/admin/dashboard' element={<DashBoard/>}/>
            <Route path='/admin/criar' element={<Criar/>}/>
            {/* Admin - Fim */}
        </Routes>
    )
}