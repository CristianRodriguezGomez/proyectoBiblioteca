import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { environment } from 'src/app/environments/environment';
import { ImagenesService } from 'src/app/services/imagenes.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  usuarios : any;
  usuario = new Usuario();
  idUsuario: any;
  liga: string = environment.API_URI_IMAGENES;
  fileToUpload: any;
  imgPrincipal: any;
  rol: any;
  constructor(private imagenesService: ImagenesService, private usuarioService: UsuarioService, private router: Router, private ComunicacionService: ComunicacionService) {
    this.list();
    this.idUsuario=localStorage.getItem('idUsuario')//nuevoooooo
    console.log(this.idUsuario);
    
    console.log(this.rol);


  }
  list() {
    this.usuarioService.list().subscribe((resUsuario: any) => {


      console.log(this.idUsuario)

    },
      (err: any) => console.error(err)
    );
  }
  
  cargandoImagen(files: any, carpeta: any) {
    console.log(files.files[0]);

    this.imgPrincipal = null;
    this.fileToUpload = files.files[0];
    let imgPromise = this.getFileBlob(this.fileToUpload);
    imgPromise.then(blob => {
      console.log(blob);

      this.imagenesService.guardarImagen(this.idUsuario, blob, carpeta).subscribe(
        (res: any) => {
          this.imgPrincipal = blob;
        },
        err => console.error(err));
    })
  }


  getFileBlob(file: any) {
    var reader = new FileReader();
    return new Promise(function (resolve, reject) {
      reader.onload = (function (thefile) {
        return function (e: any) {
          resolve(e.target.result);
        };
      })(file);
      reader.readAsDataURL(file);
    });
  }
  dameNombre(id: any) {
    //console.log("hola");

    return this.liga + "/perfil/" + id + ".jpg"
  }
  onImgError(event: any) {
    event.target.src = this.liga + "/perfil/0.png";
  }

  editarUsuario(id: any) {
    console.log("editar usuario " + id);
    this.visualizarUsuario(id);
    this.usuarioService.list().subscribe((resUsuario: any) => {
      console.log(resUsuario);
      this.usuarios = resUsuario;

    },
      (err: any) => console.error(err)
    );

  }
  visualizarUsuario(id: any) {
    this.usuarioService.listOne(id).subscribe((resUsuario: any) => {
      console.log(resUsuario);
      this.usuario = resUsuario;
      //console.log("visualizar categoria "+id)

    },
      (err: any) => console.error(err)
    );
  }

  actualizarUsuario() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Usuario Actualizado!",
      showConfirmButton: true/*
      list(){
        this.usuarioService.list().subscribe((resUsuario: any) => {
          this.idUsuario = resUsuario[0][100].id;
          console.log(this.idUsuario)   
       
       
      },
      (err: any) => console.error(err)
      );
      }
      */
    })

    console.log(this.usuario)
    this.usuarioService.updateusuarios(this.usuario).subscribe((resUsuario: any) => {
      console.log(resUsuario);
      this.list();
    },
      (err: any) => console.error(err)
    );
  }



}
