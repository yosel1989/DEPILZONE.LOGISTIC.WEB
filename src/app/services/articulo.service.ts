import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {Articulo, ArticuloOrden} from "../models/Articulo";
import {environment} from "../../environments/environment";
import {Observable, throwError} from "rxjs";

@Injectable({ providedIn: 'root' })
export class ArticuloService {
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

  create(articulo: Articulo): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/api/articulo`, articulo,{headers: this.headers}).pipe(
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

  update(articulo: Articulo): Observable<boolean> {
    return this.http.put<any>(`${environment.apiUrl}/api/articulo/${articulo.id}`, articulo,{headers: this.headers}).pipe(
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

  collection(): Observable<Articulo[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/articulo`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : Articulo[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const model = new Articulo();
            model.id = x.id;
            model.nombre = x.nombre;
            model.descripcion = x.descripcion;
            model.codigo = x.codigo;
            model.idUnidadMedida = x.idUnidadMedida;
            model.idCategoria = x.idCategoria;
            model.stock = x.stock;
            model.idUsuarioRegistro = x.idUsuarioRegistro;
            model.idUsuarioModifico = x.idUsuarioModifico;
            model.fechaRegistro = new Date(x.fechaRegistro);
            model.fechaModifico = x.fechaModifico ? new Date(x.fechaModifico) : null;
            model.idEstado = x.idEstado;
            model.estado = x.estado;
            model.unidadMedida = x.unidadMedida;
            model.categoria = x.categoria;
            model.usuarioRegistro = x.usuarioRegistro;
            model.usuarioModifico = x.usuarioModifico;
            model.numeroProveedores = x.numeroProveedores;
            collection.push(model);
          });
        }
        return collection;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  collectionByParameters(parameters: string | null): Observable<Articulo[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/articulo/buscar/${parameters}`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : Articulo[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const model = new Articulo();
            model.id = x.id;
            model.nombre = x.nombre;
            model.descripcion = x.descripcion;
            model.codigo = x.codigo;
            model.idUnidadMedida = x.idUnidadMedida;
            model.idCategoria = x.idCategoria;
            model.stock = x.stock;
            model.idUsuarioRegistro = x.idUsuarioRegistro;
            model.idUsuarioModifico = x.idUsuarioModifico;
            model.fechaRegistro = new Date(x.fechaRegistro);
            model.fechaModifico = x.fechaModifico ? new Date(x.fechaModifico) : null;
            model.idEstado = x.idEstado;
            model.estado = x.estado;
            model.unidadMedida = x.unidadMedida;
            model.categoria = x.categoria;
            model.usuarioRegistro = x.usuarioRegistro;
            model.usuarioModifico = x.usuarioModifico;
            collection.push(model);
          });
        }
        return collection;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  collectionOrdenByParameters(parameters: string | null): Observable<ArticuloOrden[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/articulo/buscar/${parameters}`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : ArticuloOrden[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const model = new ArticuloOrden();
            model.id = x.id;
            model.nombre = x.nombre;
            model.codigo = x.codigo;
            model.idEstado = x.idEstado;
            model.unidadMedida = x.unidadMedida;
            model.estado = x.estado;
            collection.push(model);
          });
        }
        return collection;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }


}
