import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {OrdenCompra, OrdenCompraDetalle} from "../models/OrdenCompra";
import {Observable, throwError} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrdenCompraService {
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

  create(orden: OrdenCompra): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/api/ordenCompra`, orden,{headers: this.headers}).pipe(
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

  collection(): Observable<OrdenCompra[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/ordenCompra`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : OrdenCompra[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const cat = new OrdenCompra();
            cat.id = x.id;
            cat.items = x.items;
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

  find(idOrdenCompra: number): Observable<OrdenCompra> {
    return this.http.get<any>(`${environment.apiUrl}/api/ordenCompra/${idOrdenCompra}`, {headers: this.headers}).pipe(
      map((response:any) => {
        if(response.status === 200){
          const data = response.data;
          const cat = new OrdenCompra();
          cat.id = data.id;
          cat.items = data.items;
          cat.fechaRegistro = new Date(data.fechaRegistro);
          cat.fechaModifico = data.fechaModifico ? new Date(data.fechaModifico) : null;
          cat.idEstado = data.idEstado;
          cat.estado = data.estado;
          cat.usuarioRegistro = data.usuarioRegistro;
          cat.usuarioModifico = data.usuarioModifico;

          if(data.detalle){
            data.detalle.forEach((x: any) => {
              const det = new OrdenCompraDetalle();
              det.articulo = x.articulo;
              det.unidadMedida = x.unidadMedida;
              det.cantidad = x.cantidad
              cat.detalle.push(det);
            });
          }
          return cat;
        }

        throw  throwError(response.message);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

}
