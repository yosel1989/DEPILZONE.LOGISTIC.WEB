import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {ArticuloStock} from "../models/Articulo";
import {Observable, throwError} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticuloStockService {
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

  create(articuloStock: ArticuloStock): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/api/articuloStock`, articuloStock,{headers: this.headers}).pipe(
      map((response: any) => {

        if(response.status === 200){
          return true;
        }

        throw throwError(response.message);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  update(articuloStock: ArticuloStock): Observable<boolean> {
    return this.http.put<any>(`${environment.apiUrl}/api/articuloStock/${articuloStock.id}`, articuloStock,{headers: this.headers}).pipe(
      map((response:any) => {

        if(response.status === 200){
          return true;
        }

        throw throwError(response.message);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  collection(): Observable<ArticuloStock[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/articuloStock`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : ArticuloStock[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const cat = new ArticuloStock();
            cat.id = x.id;
            cat.idArticulo = x.idArticulo;
            cat.articulo = x.articulo;
            cat.stockInicial = x.stockInicial;
            cat.stock = x.stock;
            cat.idAlmacen = x.idAlmacen;
            cat.almacen = x.almacen;
            cat.idSede = x.idSede;
            cat.sede = x.sede;
            cat.idAlmacenUbicacion = x.idAlmacenUbicacion;
            cat.almacenUbicacion = x.almacenUbicacion;
            cat.idTransaccion = x.idTransaccion;
            cat.fechaRegistro = new Date(x.fechaRegistro);
            cat.fechaModifico = x.fechaModifico ? new Date(x.fechaModifico) : null;
            cat.idEstado = x.idEstado;
            cat.estado = x.estado;
            cat.usuarioRegistro = x.usuarioRegistro;
            cat.usuarioModifico = x.usuarioModifico;
            collection.push(cat);
          });
        }
        return collection;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }


  collectionByParameters(parameters: string): Observable<ArticuloStock[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/articuloStock/buscar/${parameters}`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : ArticuloStock[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const cat = new ArticuloStock();
            cat.id = x.id;
            cat.idArticulo = x.idArticulo;
            cat.articulo = x.articulo;
            cat.stockInicial = x.stockInicial;
            cat.stock = x.stock;
            cat.idAlmacen = x.idAlmacen;
            cat.almacen = x.almacen;
            cat.idSede = x.idSede;
            cat.sede = x.sede;
            cat.idAlmacenUbicacion = x.idAlmacenUbicacion;
            cat.almacenUbicacion = x.almacenUbicacion;
            cat.idTransaccion = x.idTransaccion;
            cat.fechaRegistro = new Date(x.fechaRegistro);
            cat.fechaModifico = x.fechaModifico ? new Date(x.fechaModifico) : null;
            cat.idEstado = x.idEstado;
            cat.estado = x.estado;
            cat.usuarioRegistro = x.usuarioRegistro;
            cat.usuarioModifico = x.usuarioModifico;
            collection.push(cat);
          });
        }
        return collection;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

}
