
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import {Carrera} from '../models/carrera'
//import {  } from '../models/carrera';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  constructor(private http: HttpClient) { }
  list(){
    
    return this.http.get(`${environment.API_URI}/carreras/`);
  }
  createcarreras(carrera: any) {
    return this.http.post(`${environment.API_URI}/carreras/`,carrera);
  }
  insertacarrera(carrera:any){
    return this.http.post(`${environment.API_URI}/carreras/insertacarrera/`,carrera);

  }
  listOne(id: any) {
    return this.http.get(`${environment.API_URI}/carreras/`+id);
  }

  updatecarreras(carrera: any) {
    return this.http.put(`${environment.API_URI}/carreras/update/`+carrera.id,carrera);

  }
  deletecarreras(id: any){
    return this.http.delete(`${environment.API_URI}/carreras/delete/`+id);

  }

}
