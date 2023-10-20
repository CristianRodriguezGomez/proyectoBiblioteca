import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { EncargadoComponent } from './components/encargado/encargado.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { LibrosComponent } from './components/libros/libros.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import * as $ from 'jquery';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EncargadoComponent,
    EstudiantesComponent,
    LibrosComponent,
    PrestamosComponent,
    HomeComponent,
    FooterComponent,
    NavigationComponent,
    UsuariosComponent,
    CarrerasComponent,
    RecuperarComponent,
    PerfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }