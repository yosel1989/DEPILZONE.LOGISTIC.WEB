import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection!: signalR.HubConnection;
  signalReceived = new EventEmitter<any>();
  idConexionSignalR: any;
  idUsuario: number;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
    });
    this.idUsuario = this.authService.getUser() ? this.authService.getUser()!.id : 0;
    this.buildConnection(this.idUsuario);
    this.startConnection();
  }

  public buildConnection(idUsuario: number): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}${environment.proxySignalR}?idUsuario=${idUsuario}`)
    .build();
  }

  public startConnection = () => {
    this.hubConnection
    .start()
    .then(() => {
      this.registerSignalEvents();
    })
    .catch( error =>
      console.log('Error de conexion' + error)
    );
  }

  private registerSignalEvents(): void {
    console.log('Conexion realizada...');
    this.hubConnection.on('mensajeroSignal', (data: MensajeSignalR) => {
      data.datos = JSON.parse(data.datosJSON);
      this.signalReceived.emit(data);
    });
  }

  preferenteEscanearTeleoperador(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUrl}/api/signalr/escanearPregunta`, {headers: this.headers});
  }

}

export class MensajeSignalR
{
  public exito!: boolean;
  public mensaje!: string;
  public idPerfil!: number;
  public datosJSON: any;
  public tipo!: number;
  public datos: any;
  constructor() {
  }
}
