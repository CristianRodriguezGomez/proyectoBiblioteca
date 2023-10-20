import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http: HttpClient) { }
  list(){
    
    return this.http.get(`${environment.API_URI}/estudiantes/`);
  }
  createestudiantes(estudiante: any) {
    return this.http.post(`${environment.API_URI}/estudiantes/`,estudiante);
  }
  insertarestudiante(estudiante:any){
    return this.http.post(`${environment.API_URI}/estudiantes/insertarestudiante/`,estudiante);

  }
  listOne(id: any) {
    return this.http.get(`${environment.API_URI}/estudiantes/`+id);
  }

  updateestudiantes(estudiante: any) {
    return this.http.put(`${environment.API_URI}/estudiantes/update/`+estudiante.id,estudiante);

  }
  deleteestudiantes(id: any){
    return this.http.delete(`${environment.API_URI}/estudiantes/delete/`+id);

  }

}
