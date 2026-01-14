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
import {MatTableDataSource} from "@angular/material/table";
import {TipoTransaccion} from "../../../helpers/enums";
import {
  MdlBuscarArticuloOrdenComponent
} from "../mdl-buscar-articulo-orden/mdl-buscar-articulo-orden.component";
import { ArticuloOrden } from 'src/app/models/Articulo';
import {OrdenCompraService} from "../../../services/orden-compra.service";


@Component({
  selector: 'mdl-orden-compra',
  templateUrl: './mdl-orden-compra.component.html',
  styleUrls: ['./mdl-orden-compra.component.scss']
})
export class MdlOrdenCompraComponent implements OnInit, AfterViewInit, OnDestroy {

  TipoTransaccion = TipoTransaccion;
  articuloOrden : ArticuloOrden  | null = null;

  displayedColumns: string[];
  dataSource: MatTableDataSource<ArticuloOrden>;

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
    private api: OrdenCompraService,
    private transaccionTipoService: TransaccionTipoService,
    private authService: AuthService,
    private sedeService: SedeService
  ) {
    this.displayedColumns =  ['id', 'articulo', 'unidadMedida', 'cantidad', 'acciones'];
    this.dataSource = new MatTableDataSource<ArticuloOrden>([]);
    this.sbcTiposTransaccion = null;
      this.initForm();
  }

  ngOnInit(): void {
    // this.collectonTransaccionTipo();
    // this.collectonSedes();
    if(this.articuloOrden){
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
          text: 'Se registro la orden de compra con éxito',
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
        text: 'Ocurrio un error al intentar generar la orden de compra',
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
      id: this.articuloOrden ? this.articuloOrden.id : 0,
      idUsuarioRegistro: !this.articuloOrden ? this.authService.getUser()?.id : 0,
      idUsuarioModifico: this.articuloOrden ? this.authService.getUser()?.id : 0,
      idEstado: parseInt(this.f.idEstado.value),
      detalle: this.dataSource.data.map( (x: ArticuloOrden) => {
        return {
          id: x.id,
          cantidad: x.cantidad,
          observacion: null
        }
      })
    }
  }

  // data
  /*collectonTransaccionTipo(): void{
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
  }*/

  //functions
  zeroValue(): boolean{
    if(!this.dataSource.data.length){ return false }
    const found = this.dataSource.data.find(x => x.cantidad === 0);
    return !!found;
  }

  //events
  onSearchArticle(): void{
    const initialState = {_collectionSelected: this.dataSource.data};
    this.bsModalBuscarArticulo = this.modalService.show(MdlBuscarArticuloOrdenComponent, { id: new Date().getTime(), class: 'mw-850px modal-dialog-centered modal-dialog-scrollable', keyboard: false, backdrop: "static",
      ignoreBackdropClick: true, initialState});

    this.bsModalBuscarArticulo.content._selected.subscribe((res: ArticuloOrden[]) => {
      this.dataSource.data = res.concat(...this.dataSource.data);
    });
  }
  onRemove(idArticulo: number): void{
    this.dataSource.data = this.dataSource.data.filter( x => x.id !== idArticulo);
  }
  onChangeCantidad(idArticuloOrden: number, cant: string): void{
    this.dataSource.data.map(x => {
      if(x.id === idArticuloOrden){ x.cantidad = parseInt(cant,10) }
      return x;
    });
  }

}
