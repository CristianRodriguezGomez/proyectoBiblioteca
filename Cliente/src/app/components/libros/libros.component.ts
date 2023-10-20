import { Component } from '@angular/core';
import { Libro } from '../../models/libro';
import { LibroService } from 'src/app/services/libro.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { ExcelService } from 'src/app/services/excel.service';
import { environment } from 'src/app/environments/environment';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent {
  libros : any;
  libro = new Libro();
  Nuevolibro= new Libro;
  rol:any;
  liga: string = environment.API_URI_IMAGENES;
  pageSize=6;
  p=1;

  exceljsondata: any;
  arrayBuffer: any;
  uploadEvent: any;
  file: any;


  constructor(private excelService:ExcelService,private libroService: LibroService, private router: Router,private ComunicacionService: ComunicacionService) {
    this.list();
    this.rol= Number(localStorage.getItem("rol"))
   // console.log(this.rol);
}
list(){
  this.libroService.list().subscribe((resLibro: any) => {
   // console.log(resLibro);
    this.libros = resLibro;
},
    (err: any) => console.error(err)
  );
}
visualizarLibro(id:any){
  this.libroService.listOne(id).subscribe((resLibro: any) => {
    //console.log(resLibro);
    this.libro=resLibro;
    //console.log("visualizar categoria "+id)

},
    (err: any) => console.error(err)
  );
}
agregarNuevo(id:any){
  //console.log("insertar libro "+id);
//    this.visualizarLibro(id);
}


enviarMensaje(componente: number){
  let opciones={"componente": componente};
  //console.log(opciones);
  this.ComunicacionService.enviar(opciones);
}
    agregarLibro(){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Libro Agregado!",
        showConfirmButton: true
      })
     // console.log(this.libro);
      this.libroService.createlibros(this.libro).subscribe((resLibro: any) =>{
     // console.log(resLibro);
      this.list();
    },
    (err: any) => console.error(err)
  );
    }

    eliminarLibro(id:any){
      Swal.fire("Libro Eliminado");

     // console.log("eliminar libro "+id);
      this.libroService.deletelibros(id).subscribe((resLibro: any) => {
      //  console.log(resLibro);
        this.libroService.list().subscribe((resLibro: any) => {
        //  console.log(resLibro);
          this.libros=resLibro;
      },
          (err: any) => console.error(err)
        );
    },
        (err: any) => console.error(err)
      );
}
 
  
  editarLibro(id:any){
  //  console.log("editar libro "+id);
    this.visualizarLibro(id);
  
  }
  actualizarlibro(){
    Swal.fire(
      'LIbro Actualizado',
      'Operación excitosa :)',
      'success'
    )
   // console.log(this.libro)
    this.libroService.updatelibros(this.libro).subscribe((resLibro: any) => {
    //  console.log(resLibro);
      this.list();
  },
      (err: any) => console.error(err)
    );
  }

  //salida
  regresar(){
    this.router.navigate(['home'])
   // console.log("regresar")
  }
  
  Inicio(){
    localStorage.removeItem("tipoUsuario")
    this.router.navigate(['login'])
   // console.log("salir")
  }


  exportAsXLSX()
{
let element = document.getElementById('datosLibros');
this.excelService.exportAsExcelFile(element, 'Datos de Libros');
}

cargarExcelLibros(event: any) {
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
    this.libroService.insertarlibro(this.exceljsondata).subscribe((resLibro: any) => {
     // console.log(resLibro);
      this.list();
    },
      (err: any) => console.error(err)
    );
  }

}
  }
  

