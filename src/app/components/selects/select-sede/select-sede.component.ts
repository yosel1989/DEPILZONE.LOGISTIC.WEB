import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {SedeService} from "../../../services/sede.service";
import {Sede} from "../../../models/Sede";
import * as CryptoJS from 'crypto-js';
import {AuthService} from "../../../services/auth.service";
import { Perfil } from 'src/app/helpers/enums';

@Component({
  selector: 'app-select-sede',
  templateUrl: './select-sede.component.html',
  styleUrls: ['./select-sede.component.scss']
})
export class SelectSedeComponent implements OnInit, AfterViewInit, OnDestroy {

  perfil = Perfil;
  _subscription : Subscription | null;
  _loading = new BehaviorSubject<boolean>(false);
  _collection = new BehaviorSubject<Sede[]>([]);
  _value = new BehaviorSubject<number>(0);
  constructor(
    private api: SedeService,
    private auth: AuthService
  ) {
    this._subscription = null;
  }

  ngOnInit(): void {
    console.log(this.auth.getUser());
    this.collection();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if(this._subscription){this._subscription.unsubscribe()}
  }

  collection(): void{
    this._loading.next(true);
    this._subscription = this.api.collection().subscribe((res: Sede[]) => {
      if(![Perfil.SA, Perfil.SISTEMAS].includes(this.auth.getUser()!.idPerfil)){
        this._collection.next(res.filter(s => s.id === this.auth.getSede()?.id));
      }else{
        this._collection.next(res);
      }
      this._loading.next(false);
    }, error => {
      console.log('Error al obtener el listado de sedes', error);
      this._loading.next(false);
    });
  }

  onChange(event: any): void{
    this._value.next(parseInt(event.target.value));
  }
}
