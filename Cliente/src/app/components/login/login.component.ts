import { Component } from '@angular/core';
import Swal from "sweetalert2";
import { Router } from '@angular/router';
//importamos el servicio
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from "../../models/usuario";
import { CorreoService } from 'src/app/services/correo.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { environment } from 'src/app/environments/environment';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  imgPrincipal: any;
  liga: string = environment.API_URI_IMAGENES;
  idUsuario:any;
  //creamos la varible
  usuario = new Usuario();
  constructor(private imagenesService: ImagenesService,private usuarioService: UsuarioService, private router: Router, private correoService: CorreoService) {
    this.imgPrincipal=null;
    
  }
  
/*
verificaUsuario() {

  this.usuarioService.verificaUsuario(this.usuario.email, this.usuario.password).subscribe((resUsuario: any) => {
    //console.log(resUsuario);
    if (resUsuario == null) {
      //console.log("el usuario no existe")
      Swal.fire({
        position: "center",
        icon: "error",
        title: "correo o contraseña inválido",
        showConfirmButton: true
      })
    } else {
      //console.log("el usuario existe");
      localStorage.setItem("tipoUsuario", resUsuario.rol + " ")   
      this.router.navigate(['home/usuarios'])
    }
  },
    (err: any) => console.error(err)
  );
}
*/
  verificaUsuario() {

    this.usuarioService.verificaUsuario(this.usuario.email, this.usuario.password).subscribe((resUsuario: any) => {
      
      var tipo=JSON.parse(JSON.stringify(resUsuario));
      ////console.log(resUsuario);
      if (resUsuario == null) {
     //   //console.log("el usuario no existe")
        // Swal.fire("texto");
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Verifique su Usuario/Contraseña",
          showConfirmButton: true

        })
      } else {
        ////console.log("el usuario existe")

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Administrador Correcto!",
          showConfirmButton: true
        })

        localStorage.setItem("rol", resUsuario[0]["rol"] + " ")
        // agrega variables de entorno, es como diccionario
        ////console.log(resUsuario[0]["rol"]);
        // agrega variables de entorno, es como diccionario
        ////console.log(resUsuario[0]["idUsuario"]);

        if (tipo[0].rol== 1) {
        //  //console.log(tipo[0].rol);
          
          localStorage.setItem("idUsuario",tipo[0].id + '');
        //  //console.log(tipo[0].id + "Letrero de login");
        
          

          this.router.navigate(['home'])//usuarios
          

        } else {
          this.router.navigate(['encargado'])//usuarios
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Encargado Correcto!",
            showConfirmButton: true
          })
        }
      }
    },
      (err: any) => console.error(err)
    );
  }
  
  modalCambiarContrasenya() {

  //  //console.log("modalCambiarContrasenya");
    jQuery.noConflict();
    $('#modalCambiarContrasenya').modal();
    $('#modalCambiarContrasenya').modal('open');
  }
  
  cambiarContrasenya() {
    this.correoService.enviarCorreoRecuperarContrasenya(this.usuario).subscribe((resUsuario: any) => {
    //  //console.log(resUsuario);
    },
      (err: any) => console.error(err));
  }

}
