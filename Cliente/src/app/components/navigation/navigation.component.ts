import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/app/environments/environment';
import { ImagenesService } from 'src/app/services/imagenes.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  usuarios : any;
  idUsuario: any;
  liga: string = environment.API_URI_IMAGENES;
  fileToUpload:any;
  imgPrincipal:any;
rol: any;
constructor(private router: Router,private usuarioService: UsuarioService, private imagenesService: ImagenesService){
    this.rol= Number(localStorage.getItem("rol"))
    console.log(this.rol);
}
salir(){
  localStorage.removeItem("rol")

  this.router.navigate(['login']);
  
  Swal.fire({
    position: "center",
    icon: "question",
    title: "Hasta Pronto...",
    showConfirmButton: true
  })
  console.log("salir")
}
}
