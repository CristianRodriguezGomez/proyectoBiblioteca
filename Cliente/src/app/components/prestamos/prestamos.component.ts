
import { Component } from '@angular/core';
import { Prestamo } from 'src/app/models/prestamo';
import { PrestamoService } from 'src/app/services/prestamo.service';
import { LibroService } from 'src/app/services/libro.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { ExcelService } from 'src/app/services/excel.service';
import { environment } from 'src/app/environments/environment';


@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  //templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent {
  prestamos : any;
  libros:any;
  estudiantes:any;
  rol:any;
  prestamo = new Prestamo();
  Nuevoprestamo= new Prestamo;
  liga: string = environment.API_URI_IMAGENES;
  pageSize=6;
  p=1;
  constructor(private excelService: ExcelService,private prestamoService: PrestamoService, private router: Router, private libroService: LibroService, private estudianteService:EstudianteService,private ComunicacionService: ComunicacionService) {
    this.list();
    this.listaLibros();
    this.listaEstudiantes();
    this.rol= Number(localStorage.getItem("rol"))
    ////console.log(this.rol);

  }
  list(){
    this.prestamoService.list().subscribe((resPrestamo: any) => {
     // //console.log(resPrestamo);
      this.prestamos = resPrestamo;
},
      (err: any) => console.error(err)
    );
  }
  agregarNuevo(id:any){
   // //console.log("insertar prestamo "+id);
  //    this.visualizarLibro(id);
  }

  enviarMensaje(componente: number){
    let opciones={"componente": componente};
   // //console.log(opciones);
    this.ComunicacionService.enviar(opciones);
  }

  agregarPrestamo(){
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Préstamo Agregado!",
      showConfirmButton: true
    })
    ////console.log(this.prestamo);
    this.prestamoService.createprestamos(this.prestamo).subscribe((resPrestamo: any)=>{
    ////console.log(resPrestamo);
    this.list();
    },
    (err: any) => console.error(err)

    )
  }
 
  regresarLibro(id:any){
    this.prestamoService.listOne(id).subscribe((resPrestamo: any) => {
     // //console.log(resPrestamo);
      this.prestamo=resPrestamo;
     // //console.log("visualizar categoria "+id)

  },
      (err: any) => console.error(err)
    );
   // //console.log("devolver libro "+id);
  //    this.visualizarLibro(id);
  }
  devolverLibro(){
    Swal.fire(
      "Libro Entregado",
      "Operación excitosa :)",
      "success"
    )
    //console.log(this.prestamo);
    this.prestamoService.updateprestamos(this.prestamo).subscribe((resPrestamo: any)=>{
    //console.log(resPrestamo);
    this.list();
    },
    (err: any) => console.error(err)

    )
  }
  eliminarPrestamo(id:any){
    Swal.fire("Prestamo Eliminado");

    //console.log("eliminar prestamo "+id);
    this.prestamoService.deleteprestamos(id).subscribe((resPrestamo: any) => {
      //console.log(resPrestamo);
      this.prestamoService.list().subscribe((resPrestamo: any) => {
        //console.log(resPrestamo);
        this.prestamos=resPrestamo;
    },
        (err: any) => console.error(err)
      );
  },
      (err: any) => console.error(err)
    );
  }
  //ocupa el ojito
  visualizarPrestamo(id:any){
    this.prestamoService.listOne(id).subscribe((resPrestamo: any) => {
      //console.log(resPrestamo);
      this.prestamo=resPrestamo;
      //console.log("visualizar categoria "+id)

  },
      (err: any) => console.error(err)
    );
  }
  actualizarPrestamo(){
    Swal.fire(
      'Prestamo Editado',
      'Operación excitosa :)',
      'success'
    )
    //console.log(this.prestamo)
    this.prestamoService.updateprestamos(this.prestamo).subscribe((resPrestamo: any) => {
      //console.log(resPrestamo);
      this.list();
  },
      (err: any) => console.error(err)
    );
}
  editarPrestamo(id:any){
    //console.log("editar prestamo "+id);
    this.visualizarPrestamo(id);
  
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
  listaLibros(){
    this.libroService.list().subscribe((resLibro: any) => {
      //console.log(resLibro);
      this.libros = resLibro;
},
      (err: any) => console.error(err)
    );
  }

  listaEstudiantes(){
    this.estudianteService.list().subscribe((resEstudiante: any) => {
      //console.log(resEstudiante);
      this.estudiantes = resEstudiante;
},
      (err: any) => console.error(err)
    );
  }

  exportAsXLSX()
  {
  let element = document.getElementById('datosPrestamos');
  this.excelService.exportAsExcelFile(element, 'Datos de Préstamos');
  }
  }
  
