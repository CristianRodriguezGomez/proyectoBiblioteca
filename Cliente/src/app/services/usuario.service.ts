
//el servicio es un puente entre la base de datos


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { retry } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
//import { headers } from '../models/Header';
import { headers } from 'src/app/models/Header';

@Injectable({
providedIn: 'root'
})
export class UsuarioService {
  //para acceder servicios http
  constructor(private http: HttpClient) { }


  
  verificaUsuario(email:any, password:any){
    let usuario = {
      'email':email,
      'password':password
    }
    //console.log(`${environment.API_URI}/usuarios/verificaUsuario`)
    return this.http.post(`${environment.API_URI}/usuarios/verificaUsuario`,usuario);
  }
  list(){
    
    return this.http.get(`${environment.API_URI}/usuarios/`,{headers:headers});
  }
  createusuarios(usuario: any) {
    return this.http.post(`${environment.API_URI}/usuarios/`,usuario);
  }
  insertausuario(usuario: any) {
    return this.http.post(`${environment.API_URI}/usuarios/insertausuario/`,usuario);
  }
  listOne(id: any) {
    return this.http.get(`${environment.API_URI}/usuarios/`+id);
  }

  updateusuarios(usuario: any) {
    return this.http.put(`${environment.API_URI}/usuarios/update/`+usuario.id,usuario);

  }
  deleteusuarios(id: any){
    return this.http.delete(`${environment.API_URI}/usuarios/delete/`+id);

  }
  CambiarPassword(usuario: any) {
    return this.http.post(`${environment.API_URI}/usuarios/CambiarPassword`, usuario);

  }
 
  }
  
