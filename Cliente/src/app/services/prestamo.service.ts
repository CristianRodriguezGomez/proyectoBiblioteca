import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Prestamo } from '../models/prestamo';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor(private http: HttpClient) { }
  list(){
    
    return this.http.get(`${environment.API_URI}/prestamos/`);
  }
  createprestamos(prestamo: any) {
    return this.http.post(`${environment.API_URI}/prestamos/`,prestamo);
  }
  listOne(id: any) {
    return this.http.get(`${environment.API_URI}/prestamos/`+id);
  }

  updateprestamos(prestamo: any) {
    return this.http.put(`${environment.API_URI}/prestamos/update/`+prestamo.id,prestamo);

  }
  deleteprestamos(id: any){
    return this.http.delete(`${environment.API_URI}/prestamos/delete/`+id);

  }
}
