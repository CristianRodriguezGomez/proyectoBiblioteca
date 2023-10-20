import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncargadoComponent } from './components/encargado/encargado.component'
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { LoginComponent } from './components/login/login.component';
import { LibrosComponent } from './components/libros/libros.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { PerfilComponent } from './components/perfil/perfil.component';
const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'recuperar/:token',
        component: RecuperarComponent,
    },

    {
        path: 'home',
        component: HomeComponent,
        children:[
            {
                path: 'usuarios',
                component: UsuariosComponent,
            },
            {
                path: 'perfil',
                component: PerfilComponent,
            },
            {
                path: 'carreras',
                component: CarrerasComponent,
              },
          
            {
                path: 'estudiantes',
                component: EstudiantesComponent,
            },
            {
                path: 'libros',
                component: LibrosComponent,
            },
            {
                path: 'prestamos',
                component: PrestamosComponent,
            },
        ]
    },

    {
        path: 'encargado',
        component: EncargadoComponent,
        children:[
            {
                path: 'carreras',
                component: CarrerasComponent,
              },
            {
                path: 'estudiantes',
                component: EstudiantesComponent,
            },
            {
                path: 'libros',
                component: LibrosComponent,
            },
            {
                path: 'prestamos',
                component: PrestamosComponent,
            },
        ]
    },
   
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }