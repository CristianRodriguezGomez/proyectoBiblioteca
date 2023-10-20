import { Component } from '@angular/core';
import { Carrera } from '../../models/carrera';
import { Estudiante } from 'src/app/models/estudiante';
import { CarreraService } from 'src/app/services/carrera.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { ExcelService } from 'src/app/services/excel.service';
import { environment } from 'src/app/environments/environment';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent {
  carreras: any;
  carrera = new Carrera();
  estudiantes: any;
  estudiante = new Estudiante();
  Nuevacarrera = new Carrera;
  liga: string = environment.API_URI_IMAGENES;
  rol: any;
  pageSize=6;
  p=1;

  uploadEvent: any;
  file: any;
  arrayBuffer: any;
  exceljsondata: any;

  constructor(private excelService: ExcelService, private carreraService: CarreraService, private router: Router, private ComunicacionService: ComunicacionService) {
    this.list();
    this.rol = Number(localStorage.getItem("rol"))
    console.log(this.rol);
  }
  list() {
    this.carreraService.list().subscribe((resCarrera: any) => {
      console.log(resCarrera);
      this.carreras = resCarrera;
    },
      (err: any) => console.error(err)
    );
  }
  visualizarCarrera(id: any) {
    this.carreraService.listOne(id).subscribe((resCarrera: any) => {
      console.log(resCarrera);
      this.carrera = resCarrera;
      //console.log("visualizar categoria "+id)

    },
      (err: any) => console.error(err)
    );
  }
  agregarNueva(id: any) {
    console.log("insertar carrera " + id);
    //    this.visualizarLibro(id);
  }

  enviarMensaje(componente: number) {
    let opciones = { "componente": componente };
    console.log(opciones);
    this.ComunicacionService.enviar(opciones);
  }
  agregarCarrera() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Carrera Agregada!",
      showConfirmButton: true
    })
    console.log(this.carrera);
    this.carreraService.createcarreras(this.carrera).subscribe((resCarrera: any) => {
      console.log(resCarrera);
      this.list();
    },
      (err: any) => console.error(err)
    );
  }



  editarCarrera(id: any) {
    console.log("editar carrera " + id);
    this.visualizarCarrera(id);

  }
  eliminarCarrera(id: any) {
    Swal.fire("Carrera Eliminada");

    console.log("eliminar carrera " + id);
    this.carreraService.deletecarreras(id).subscribe((resCarrera: any) => {
      console.log(resCarrera);
      this.carreraService.list().subscribe((resCarrera: any) => {
        console.log(resCarrera);
        this.carreras = resCarrera;
      },
        (err: any) => console.error(err)
      );
    },
      (err: any) => console.error(err)
    );
  }
  actualizarCarrera() {
    Swal.fire(
      'LIbro Actualizado',
      'Operación excitosa :)',
      'success'
    )
    console.log(this.carrera)
    this.carreraService.updatecarreras(this.carrera).subscribe((resCarrera: any) => {
      console.log(resCarrera);
      this.list();
    },
      (err: any) => console.error(err)
    );
  }

  //salida
  regresar() {
    this.router.navigate(['home'])
    console.log("regresar")
  }

  Inicio() {
    localStorage.removeItem("tipoUsuario")
    this.router.navigate(['login'])
    console.log("salir")
  }

  exportAsXLSX() {
    let element = document.getElementById('datosLicenciaturas');
    this.excelService.exportAsExcelFile(element, 'Datos de Licenciaturas');
  }


  cargarExcelCarreras(event: any) {
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
      this.carreraService.insertacarrera(this.exceljsondata).subscribe((resCarrera: any) => {
        console.log(resCarrera);
        this.list();
      },
        (err: any) => console.error(err)
      );
    }

  }
}


