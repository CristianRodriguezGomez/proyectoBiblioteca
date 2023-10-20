import { Component } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { Prestamo } from 'src/app/models/prestamo';
import { PrestamoService } from 'src/app/services/prestamo.service';
import { LibroService } from 'src/app/services/libro.service';
import { Carrera } from 'src/app/models/carrera';
import { CarreraService } from 'src/app/services/carrera.service';
import Swal from "sweetalert2";
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { environment } from 'src/app/environments/environment';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service';
//import * as $ from 'jquery';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent {
  
  estudiantes : any;
  estudiante = new Estudiante();
  Nuevoestudiante= new Estudiante;
  carreras:any;
  carrera = new Carrera();
  liga: string = environment.API_URI_IMAGENES;
  pageSize=6;
  p=1;
  libros:any;
  rol:any;
  prestamos : any;
  prestamo = new Prestamo();

  
  exceljsondata: any;
  arrayBuffer: any;
  uploadEvent: any;
  file: any;


  

  constructor(private excelService: ExcelService,private estudianteService: EstudianteService, private router: Router,private prestamoService: PrestamoService, 
    private libroSErvice: LibroService, private carrerService: CarreraService,private ComunicacionService: ComunicacionService) {
    this.list();
    this.listCarreras();
    this.rol= Number(localStorage.getItem("rol"))
   // console.log(this.rol);
}
listCarreras() {
  this.carrerService.list().subscribe((res: any) => {
   // console.log(res);
    this.carreras = res;
},
(err: any) => console.error(err)
);
}
list(){
  this.estudianteService.list().subscribe((resEstudiante: any) => {
   // console.log(resEstudiante);
    this.estudiantes = resEstudiante;
},
(err: any) => console.error(err)
);
}
visualizarEstudiante(id:any){
  this.estudianteService.listOne(id).subscribe((resEstudiante: any) => {
   // console.log(resEstudiante);
    this.estudiante=resEstudiante;
    //console.log("visualizar categoria "+id)

},
    (err: any) => console.error(err)
  );
}
agregarNuevo(id:any){
 // console.log("insertar estudiante "+id);
//    this.visualizarLibro(id);
}
enviarMensaje(componente: number){
  let opciones={"componente": componente};
  //console.log(opciones);
  this.ComunicacionService.enviar(opciones);
}
  agregarEstudiante(){
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Estudiante Agregado!",
      showConfirmButton: true
    })
    //console.log(this.estudiante);
    this.estudianteService.createestudiantes(this.estudiante).subscribe((resEstudiante: any)=>{
    //  console.log(resEstudiante);
    this.list();

    },
    (err: any) => console.error(err)

    )
  }
 
  eliminarEstudiante(id:any){
    Swal.fire("Estudiante Eliminado");

    //console.log("eliminar estudiante "+id);
    this.estudianteService.deleteestudiantes(id).subscribe((resEstudiante: any) => {
     // console.log(resEstudiante);
      this.estudianteService.list().subscribe((resEstudiante: any) => {
       // console.log(resEstudiante);
        this.estudiantes=resEstudiante;
    },
        (err: any) => console.error(err)
      );
  },
      (err: any) => console.error(err)
    );
  }
  editarEstudiante(id:any){
   // console.log("editar estudiante "+id);
    this.visualizarEstudiante(id);
  
  }
  
  actualizarEstudiante(){
    Swal.fire(
      'Estudiante Actualizado',
      'Operación excitosa :)',
      'success'
    )
   // console.log(this.estudiante)
    this.estudianteService.updateestudiantes(this.estudiante).subscribe((resEstudiante: any) => {
     // console.log(resEstudiante);
      this.list();

  },
      (err: any) => console.error(err)
    );
  }

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
let element = document.getElementById('datosEstudiantes');
this.excelService.exportAsExcelFile(element, 'Datos de Estudiantes');
}


cargarExcelEstudiantes(event: any) {
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
    this.estudianteService.insertarestudiante(this.exceljsondata).subscribe((resEstudiante: any) => {
     // console.log(resEstudiante);
      this.list();
    },
      (err: any) => console.error(err)
    );
  }

}
  
  }

