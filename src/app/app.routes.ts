import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { CreaeditausersComponent } from './components/users/creaeditausers/creaeditausers.component';
import { AgricultorComponent } from './components/agricultor/agricultor.component';
import { CreaeditaagricultorComponent } from './components/agricultor/creaeditaagricultor/creaeditaagricultor.component';
import { RoleComponent } from './components/role/role.component';
import { CreaeditaroleComponent } from './components/role/creaeditarole/creaeditarole.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { CreaeditaempresaComponent } from './components/empresa/creaeditaempresa/creaeditaempresa.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CreaeditaproductoComponent } from './components/producto/creaeditaproducto/creaeditaproducto.component';
import { CompraComponent } from './components/compra/compra.component';
import { GrupoempresaagricultorComponent } from './components/grupoempresaagricultor/grupoempresaagricultor.component';
import { SolicitudagricultorempresaComponent } from './components/solicitudagricultorempresa/solicitudagricultorempresa.component';
import { CreaeditacompraComponent } from './components/compra/creaeditacompra/creaeditacompra.component';
import { CreaeditagrupoComponent } from './components/grupoempresaagricultor/creaeditagrupo/creaeditagrupo.component';
import { CreaeditarsolicitudComponent } from './components/solicitudagricultorempresa/creaeditarsolicitud/creaeditarsolicitud.component';
import { GrupoagricultorComponent } from './components/grupoagricultor/grupoagricultor.component';
import { CreaeditagrupoagriComponent } from './components/grupoagricultor/creaeditagrupoagri/creaeditagrupoagri.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AgricultorHomeComponent } from './agricultor-home/agricultor-home.component';
import { EmpresaHomeComponent } from './empresa-home/empresa-home.component';
import { AgricultorMercadosComponent } from './agricultor-mercados/agricultor-mercados.component';
import { AgricultoresAyudaComponent } from './agricultores-ayuda/agricultores-ayuda.component';
import { AgricultoresEmpresasComponent } from './agricultores-empresas/agricultores-empresas.component';
import { AgricultoresPerfilComponent } from './agricultores-perfil/agricultores-perfil.component';
import { AgricultoresGruposComponent } from './agricultores-grupos/agricultores-grupos.component';
import { EmpresaMercadosComponent } from './empresa-mercados/empresa-mercados.component';
import { EmpresaAyudaComponent } from './empresa-ayuda/empresa-ayuda.component';
import { EmpresaAgricultoresComponent } from './empresa-agricultores/empresa-agricultores.component';
import { EmpresaGruposComponent } from './empresa-grupos/empresa-grupos.component';
import { EmpresaPerfilComponent } from './empresa-perfil/empresa-perfil.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ReporteComprasComponent } from './reporte-compras/reporte-compras.component';
import { ReporteGrupoComponent } from './reporte-grupo/reporte-grupo.component';
import { ReporteProductosAgricultorComponent } from './reporte-productos-agricultor/reporte-productos-agricultor.component';
import { ReporteComprasEmpresaComponent } from './reporte-compras-empresa/reporte-compras-empresa.component';
import { IntegrantesComponent } from './integrantes/integrantes.component';

export const routes: Routes = [
    {
        path: 'home', component: HomeComponent
    },
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'agricultor-home', component: AgricultorHomeComponent },
    { path: 'empresa-home', component:EmpresaHomeComponent},
    {path:'agricultor-inicio', component:AgricultorHomeComponent},
    {path:'agricultor-mercados', component:AgricultorMercadosComponent},
    {path:'agricultores-ayuda', component:AgricultoresAyudaComponent},
    {path:'agricultores-empresas',component:AgricultoresEmpresasComponent},
    {path:'agricultores-perfil',component:AgricultoresPerfilComponent},
    {path:'agricultores-grupos',component:AgricultoresGruposComponent},
    {path:'emmpresa-inicio',component:EmpresaHomeComponent},
    {path:'empresa-mercados', component:EmpresaMercadosComponent},
    {path:'empresa-ayuda', component:EmpresaAyudaComponent},
    {path:'empresa-agricultores', component:EmpresaAgricultoresComponent},
    {path:'empresa-grupos', component:EmpresaGruposComponent},
    {path:'empresa-perfil', component:EmpresaPerfilComponent},
    {path:'reportes',component:ReportesComponent},
    {path:'reporte-compras',component:ReporteComprasComponent},
    {path:'reporte-grupo',component:ReporteGrupoComponent},
    {path:'reporte-productos-agricultor',component:ReporteProductosAgricultorComponent},
    {path:'reporte-compras-empresa',component:ReporteComprasEmpresaComponent},
    {path:'integrantes',component:IntegrantesComponent},
    {
        
        path:'usuarios', component:UsersComponent,
        children:[
            {
                path:'nuevo', component:CreaeditausersComponent
            },
            {
                path:'ediciones/:id', component:CreaeditausersComponent
            }
        ]
    },
    {
        path:'agricultor', component:AgricultorComponent,
        children:[
            {
                path:'nuevo', component:CreaeditaagricultorComponent
            },
            {
                path:'ediciones/:id', component:CreaeditaagricultorComponent
            }
        ]
    },
    {
        path:'roles', component:RoleComponent,
        children:[
            {
                path:'nuevo', component:CreaeditaroleComponent
            },
            {
                path:'ediciones/:id', component:CreaeditaroleComponent
            }
        ]
    },
    {
        path:'empresas', component:EmpresaComponent,
        children:[
            {
                path:'nuevo', component:CreaeditaempresaComponent
            },
            {
                path:'ediciones/:id', component:CreaeditaempresaComponent
            }
        ]
    },
    {
        path:'productos', component:ProductoComponent,
        children:[
            {
                path:'nuevo', component:CreaeditaproductoComponent
            },
            {
                path:'ediciones/:id', component:CreaeditaproductoComponent
            }
        ]
    },
    {
        path:'compras', component:CompraComponent,
        children:[
            {
                path:'nuevo', component:CreaeditacompraComponent
            },
            {
                path:'ediciones/:id', component:CreaeditacompraComponent
            }
        ]
    },
    {
        path:'grupoempresa', component:GrupoempresaagricultorComponent,
        children:[
            {
                path:'nuevo', component:CreaeditagrupoComponent
            },
            {
                path:'ediciones/:id', component:CreaeditagrupoComponent
            }
        ]
    },
    {
        path:'solicitudagricultor', component:SolicitudagricultorempresaComponent,
        children:[
            {
                path:'nuevo', component:CreaeditarsolicitudComponent
            },
            {
                path:'ediciones/:id', component:CreaeditarsolicitudComponent
            }
        ]
    },
    {
        path:'grupoagricultor',component:GrupoagricultorComponent,
        children:[
            {
                path:'nuevo',component:CreaeditagrupoagriComponent
            },
            {
                path:'ediciones/:id',component:CreaeditagrupoagriComponent
            }
        ]
    }
];
