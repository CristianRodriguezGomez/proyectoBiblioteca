import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { environment } from 'src/app/environments/environment';
import { ImagenesService } from 'src/app/services/imagenes.service';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  usuarios : any;
  usuario = new Usuario();
  idUsuario: any;
  liga: string = environment.API_URI_IMAGENES;
  fileToUpload:any;
  imgPrincipal:any;
  rol:any;
  pageSize=6;
  p=1;
  arrayBuffer: any;
  file: any;
  uploadEvent: any;
  exceljsondata: any;
  constructor(private imagenesService: ImagenesService,private usuarioService: UsuarioService, private router: Router, private ComunicacionService: ComunicacionService) {
    this.list();
    this.rol= Number(localStorage.getItem("rol"))
    //console.log(this.rol);
}
list(){
  this.usuarioService.list().subscribe((resUsuario: any) => {
    //console.log();
    this.usuarios = resUsuario;
    this.idUsuario = resUsuario[0].id;
    
},
(err: any) => console.error(err)
);
}
visualizarUsuario(id:any){
  this.usuarioService.listOne(id).subscribe((resUsuario: any) => {
    //console.log(resUsuario);
    this.usuario=resUsuario;
    ////console.log("visualizar categoria "+id)

},
    (err: any) => console.error(err)
  );
}
agregarNuevoUsuario(id:any){
  //console.log("insertar usuario "+id);
//    this.visualizarLibro(id);
}

//Enviamos el mensaje.
enviarMensaje(componente: number){
  let opciones={"componente": componente};
  //console.log(opciones);
  this.ComunicacionService.enviar(opciones);
}




  agregarUsuario(){
    //Swal.fire("Usuario Agregado");
    Swal.fire(
      'Usuario Agregado',
      'Operación excitosa :)',
      'success'
    )
    //console.log(this.usuario);
    this.usuarioService.createusuarios(this.usuario).subscribe((resUsuario: any)=>{
    //console.log(resUsuario);
    this.list();

    },
    (err: any) => console.error(err)

    )
  }
  eliminarUsuario(id:any){
    Swal.fire("Usuario Eliminado");
   
/*
Swal.fire({
  position: "center",
  icon: "success",
  title: "Usuario Eliminado!",
  showConfirmButton: true
})
*/
    //console.log("eliminar usuario "+id); //+id
    this.usuarioService.deleteusuarios(id).subscribe((resUsuario: any) => {
      //console.log(resUsuario);
      this.usuarioService.list().subscribe((resUsuario: any) => {
        //console.log(resUsuario);
        this.usuarios=resUsuario;
    },
        (err: any) => console.error(err)
      );
      
  },
      (err: any) => console.error(err)
    );
   
  }
  editarUsuario(id:any){
    //console.log("editar usuario "+id);
    this.visualizarUsuario(id);
    this.usuarioService.list().subscribe((resUsuario: any) => {
      //console.log(resUsuario);
      this.usuarios=resUsuario;
  },
  (err: any) => console.error(err)
  );
  
  }
  actualizarUsuario(){
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Usuario Actualizado!",
      showConfirmButton: true
    })

    //console.log(this.usuario)
    this.usuarioService.updateusuarios(this.usuario).subscribe((resUsuario: any) => {
      //console.log(resUsuario);
      this.list();    
  },
      (err: any) => console.error(err)
    );
  }
regresar(){
  this.router.navigate(['home'])
  //console.log("regresar")
}
Inicio(){
  localStorage.removeItem("tipoUsuario")
  this.router.navigate(['login'])
  //console.log("salir")
}

cargarExcelProfesor(event:any){
  if (event.target.files.length > 0) {
  this.file = event.target.files[0];
  this.uploadEvent = event;
  }
  this.file = event.target.files[0];
  let fileReader = new FileReader();
  fileReader.readAsArrayBuffer(this.file);
  fileReader.onload = (e) => {
  this.arrayBuffer = fileReader.result;
  var data = new Uint8Array(this.arrayBuffer);
  var arr = new Array();
  for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");
  var workbook = XLSX.read(bstr, { type: "binary" });
  var first_sheet_name = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[first_sheet_name];
  this.exceljsondata = XLSX.utils.sheet_to_json(worksheet, { raw: true })
  this.usuarioService.insertausuario(this.exceljsondata).subscribe((resUsuario: any) => {
    //console.log(resUsuario);
    this.list();    
},
    (err: any) => console.error(err)
  );
}
  
  }
  }


  
  
