import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TransaccionTipo} from '../../../models/Transaccion';

import Swal from 'sweetalert2';
import {TransaccionTipoService} from '../../../services/transaccion-tipo.service';
import {AuthService} from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import {Sede} from "../../../models/Sede";
import {SedeService} from "../../../services/sede.service";
import {ArticuloStock} from "../../../models/Articulo";
import {MdlBuscarArticuloStockComponent} from "../mdl-buscar-articulo-stock/mdl-buscar-articulo-stock.component";
import {MatTableDataSource} from "@angular/material/table";
import { TransaccionService } from 'src/app/services/transaccion.service';
import {TipoTransaccion} from "../../../helpers/enums";


@Component({
  selector: 'mdl-transaccion',
  templateUrl: './mdl-transaccion.component.html',
  styleUrls: ['./mdl-transaccion.component.scss']
})
export class MdlTransaccionComponent implements OnInit, AfterViewInit, OnDestroy {

  TipoTransaccion = TipoTransaccion;

  displayedColumns: string[];
  dataSource: MatTableDataSource<ArticuloStock>;

  transaccionTipo: TransaccionTipo | null = null;
  formGroup!: FormGroup;
  submitted = false;
  loadingSubmit = false;

  created = false;
  updated = false;

  // subscription
  sbcForm!: Subscription;

  tiposTransaccion : TransaccionTipo[] = [];
  sbcTiposTransaccion: Subscription | null;
  loadingTiposTransaccion = false;

  sedes: Sede[] = [];
  sbcSedes: Subscription | null = null;
  loadingSedes = false;

  bsModalBuscarArticulo!: BsModalRef | null;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });


  constructor(
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private frmBuilder: FormBuilder,
    private api: TransaccionService,
    private transaccionTipoService: TransaccionTipoService,
    private authService: AuthService,
    private sedeService: SedeService
  ) {
    this.displayedColumns =  ['id', 'articulo', 'almacen', 'ubicacion', 'stock', 'apartado', 'acciones'];
    this.dataSource = new MatTableDataSource<ArticuloStock>([]);
    this.sbcTiposTransaccion = null;
      this.initForm();
  }

  ngOnInit(): void {
    this.collectonTransaccionTipo();
    this.collectonSedes();
    if(this.transaccionTipo){
      this.patchForm();
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if(this.sbcForm){this.sbcForm.unsubscribe()}
    if(this.sbcTiposTransaccion){this.sbcTiposTransaccion.unsubscribe()}
  }

  initForm(): void{
    this.formGroup = this.frmBuilder.group({
      idTipoTransaccion: new FormControl('', Validators.required),
      idSedeOrigen: new FormControl('', Validators.required),
      idSedeDestino: new FormControl('', Validators.required),
      generarGuia: new FormControl(false, Validators.required),
      idEstado: new FormControl(1)
    });
  }

  patchForm(): void{
  }

  onSubmit(): void{
    this.submitted = true;
    this.loadingSubmit = true;

    if(this.formGroup.invalid){
      this.loadingSubmit = false;
      return;
    }

    if(this.invalidMaxStock()){
      this.Toast.fire({
        icon: 'error',
        title: 'No exceda la cantidad del stock disponible'
      });
      this.loadingSubmit = false;
      return;
    }

    if(this.zeroValue()){
      this.Toast.fire({
        icon: 'error',
        title: 'Debe ingresar una cantidad mayor a 0'
      });
      this.loadingSubmit = false;
      return;
    }

    if(!this.dataSource.data.length){
      this.Toast.fire({
        icon: 'error',
        title: 'Falta añadir articulos'
      });
      this.loadingSubmit = false;
      return;
    }

    this.sbcForm = this.api.create(this.model).subscribe((res: boolean) => {
      if(res){
        this.loadingSubmit = false;
        this.created = true;
        Swal.fire({
          text: 'Se registro la transacción con éxito',
          icon: 'success',
          buttonsStyling: false,
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        }).then( (result) => {
          if (result.value) {
            this.bsModalRef.hide();
          }
        });
      }
    }, (error: any) => {
      this.loadingSubmit = false;
      console.error(error);
      Swal.fire({
        text: 'Ocurrio un error al intentar realizar la transacción',
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: 'btn btn-primary'
        }
      })
    });
  }

  // getters
  get f(): any{
    return this.formGroup.controls;
  }
  get model(): any{
    return {
      id: this.transaccionTipo ? this.transaccionTipo.id : 0,
      idTipoTransaccion: parseInt(this.f.idTipoTransaccion.value),
      idSedeOrigen: this.f.idSedeOrigen.value ? parseInt(this.f.idSedeOrigen.value) : null,
      idSedeDestino: this.f.idSedeDestino.value ? parseInt(this.f.idSedeDestino.value) : null,
      generarGuia: this.f.generarGuia.value,
      idUsuarioRegistro: !this.transaccionTipo ? this.authService.getUser()?.id : 0,
      idUsuarioModifico: this.transaccionTipo ? this.authService.getUser()?.id : 0,
      idEstado: parseInt(this.f.idEstado.value),
      detalle: this.dataSource.data.map( (x: ArticuloStock) => {
        return {
          id: 0,
          idArticuloStock: x.id,
          cantidad: x.apartado,
          observacion: null
        }
      })
    }
  }

  // data
  collectonTransaccionTipo(): void{
    this.loadingTiposTransaccion = true;
    this.sbcTiposTransaccion = this.transaccionTipoService.collection().subscribe((res: TransaccionTipo[]) => {
      this.tiposTransaccion = res;
      this.loadingTiposTransaccion = false;
    }, (error: any) => {
      this.loadingTiposTransaccion = false;
      console.log(error);
    })
  }
  collectonSedes(): void{
    this.loadingSedes = true;
    this.sbcTiposTransaccion = this.sedeService.collection().subscribe((res: Sede[]) => {
      this.sedes = res;
      this.loadingSedes = false;
    }, (error: any) => {
      console.log(error);
      this.loadingSedes = false;
    })
  }

  //functions
  invalidMaxStock(): boolean{
    if(!this.dataSource.data.length){ return false }
    const found = this.dataSource.data.find(x => x.apartado > x.stock);
    return !!found;
  }
  zeroValue(): boolean{
    if(!this.dataSource.data.length){ return false }
    const found = this.dataSource.data.find(x => x.apartado === 0);
    return !!found;
  }

  //events
  onSearchArticle(): void{
    const initialState = {_collectionSelected: this.dataSource.data};
    this.bsModalBuscarArticulo = this.modalService.show(MdlBuscarArticuloStockComponent, { id: new Date().getTime(), class: 'mw-850px modal-dialog-centered modal-dialog-scrollable', keyboard: false, backdrop: "static",
      ignoreBackdropClick: true, initialState});

    this.bsModalBuscarArticulo.content._selected.subscribe((res: ArticuloStock[]) => {
      this.dataSource.data = res.concat(...this.dataSource.data);
    });
  }
  onRemove(idArticuloStock: number): void{
    this.dataSource.data = this.dataSource.data.filter( x => x.id !== idArticuloStock);
  }
  onChangeApartado(idArticuloStock: number, cant: string): void{
    this.dataSource.data.map(x => {
      if(x.id === idArticuloStock){ x.apartado = parseInt(cant,10) }
      return x;
    });
  }

  isTransaccion(idTipoTransaccion: TipoTransaccion): boolean{
    if(this.f.idTipoTransaccion.value){
      return parseInt(this.f.idTipoTransaccion.value, 10) === idTipoTransaccion;
    }
    return false;
  }

}
