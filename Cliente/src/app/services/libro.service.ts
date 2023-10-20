import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  constructor(private http: HttpClient) { }
  list(){
    
    return this.http.get(`${environment.API_URI}/libros/`);
  }
  createlibros(libro: any) {
    return this.http.post(`${environment.API_URI}/libros/`,libro);
  }
  insertarlibro(libro:any){
    return this.http.post(`${environment.API_URI}/libros/insertarlibro/`,libro);

  }
  listOne(id: any) {
    return this.http.get(`${environment.API_URI}/libros/`+id);
  }

  updatelibros(libro: any) {
    return this.http.put(`${environment.API_URI}/libros/update/`+libro.id,libro);

  }
  deletelibros(id: any){
    return this.http.delete(`${environment.API_URI}/libros/delete/`+id);

  }
 

 
  


}
