import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Proveedor} from "../models/Proveedor";
import {Observable, throwError} from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProveedorService {
  private headers: HttpHeaders;
  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
    });
  }

  create(proveedor: Proveedor): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/api/proveedor`, proveedor,{headers: this.headers}).pipe(
      map(({message, status}) => {

        if(status === 200){
          return true;
        }

        throw throwError(message);
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  update(proveedor: Proveedor): Observable<boolean> {
    return this.http.put<any>(`${environment.apiUrl}/api/proveedor/${proveedor.id}`, proveedor,{headers: this.headers}).pipe(
      map(({message, status}) => {

        if(status === 200){
          return true;
        }

        throw throwError(message);
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  collection(): Observable<Proveedor[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/proveedor`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : Proveedor[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const model = new Proveedor();
            model.id = x.id;
            model.ruc = x.ruc;
            model.razonSocial = x.razonSocial;
            model.contactoNombre = x.contactoNombre;
            model.contactoApellido = x.contactoApellido;
            model.contactoTelefono = x.contactoTelefono;
            model.contactoCorreo = x.contactoCorreo;
            model.idUsuarioRegistro = x.idUsuarioRegistro;
            model.idUsuarioModifico = x.idUsuarioModifico;
            model.fechaRegistro = new Date(x.fechaRegistro);
            model.fechaModifico = x.fechaModifico ? new Date(x.fechaModifico) : null;
            model.idEstado = x.idEstado;
            model.estado = x.estado;
            model.idUbicacion = x.idUbicacion;
            model.direccion = x.direccion;
            model.ciudad = x.ciudad;
            model.distrito = x.distrito;
            model.ubigeo = x.ubigeo;
            model.usuarioRegistro = x.usuarioRegistro;
            model.usuarioModifico = x.usuarioModifico;
            collection.push(model);
          });
        }
        // console.log(collection);
        return collection;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }


  collectionByArticle(idArticulo: number): Observable<Proveedor[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/proveedor/articulo/${idArticulo}`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : Proveedor[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const model = new Proveedor();
            model.id = x.id;
            model.ruc = x.ruc;
            model.razonSocial = x.razonSocial;
            model.contactoNombre = x.contactoNombre;
            model.contactoApellido = x.contactoApellido;
            model.contactoTelefono = x.contactoTelefono;
            model.contactoCorreo = x.contactoCorreo;
            model.idUsuarioRegistro = x.idUsuarioRegistro;
            model.idUsuarioModifico = x.idUsuarioModifico;
            model.fechaRegistro = new Date(x.fechaRegistro);
            model.fechaModifico = x.fechaModifico ? new Date(x.fechaModifico) : null;
            model.idEstado = x.idEstado;
            model.estado = x.estado;
            model.idUbicacion = x.idUbicacion;
            model.direccion = x.direccion;
            model.ciudad = x.ciudad;
            model.distrito = x.distrito;
            model.ubigeo = x.ubigeo;
            model.usuarioRegistro = x.usuarioRegistro;
            model.usuarioModifico = x.usuarioModifico;
            collection.push(model);
          });
        }
        // console.log(collection);
        return collection;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }


  collectionByParameters(parameters: string | null): Observable<Proveedor[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/proveedor/buscar/${parameters}`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : Proveedor[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const model = new Proveedor();
            model.id = x.id;
            model.ruc = x.ruc;
            model.razonSocial = x.razonSocial;
            model.contactoNombre = x.contactoNombre;
            model.contactoApellido = x.contactoApellido;
            model.contactoTelefono = x.contactoTelefono;
            model.contactoCorreo = x.contactoCorreo;
            model.idUsuarioRegistro = x.idUsuarioRegistro;
            model.idUsuarioModifico = x.idUsuarioModifico;
            model.fechaRegistro = new Date(x.fechaRegistro);
            model.fechaModifico = x.fechaModifico ? new Date(x.fechaModifico) : null;
            model.idEstado = x.idEstado;
            model.estado = x.estado;
            model.idUbicacion = x.idUbicacion;
            model.direccion = x.direccion;
            model.ciudad = x.ciudad;
            model.distrito = x.distrito;
            model.ubigeo = x.ubigeo;
            model.usuarioRegistro = x.usuarioRegistro;
            model.usuarioModifico = x.usuarioModifico;
            collection.push(model);
          });
        }
        // console.log(collection);
        return collection;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

}
