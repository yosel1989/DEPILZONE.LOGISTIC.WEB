import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Transaccion, TransaccionDetalle, TransaccionTipo} from '../../../models/Transaccion';

import Swal from 'sweetalert2';
import {TransaccionTipoService} from '../../../services/transaccion-tipo.service';
import {AuthService} from '../../../services/auth.service';
import { Subscription } from 'rxjs/dist/types/internal/Subscription';
import {SedeService} from "../../../services/sede.service";
import {MatTableDataSource} from "@angular/material/table";
import { TransaccionService } from 'src/app/services/transaccion.service';
import {TipoTransaccion} from "../../../helpers/enums";


@Component({
  selector: 'mdl-confirmar-transaccion-entrada',
  templateUrl: './mdl-confirmar-transaccion-entrada.component.html',
  styleUrls: ['./mdl-confirmar-transaccion-entrada.component.scss']
})
export class MdlConfirmarTransaccionEntradaComponent implements OnInit, AfterViewInit, OnDestroy {

  // Input
  transaccion: Transaccion | null = null;

  TipoTransaccion = TipoTransaccion;

  displayedColumns: string[];
  dataSource: MatTableDataSource<TransaccionDetalle>;

  formGroup!: FormGroup;
  submitted = false;
  loadingSubmit = false;

  created = false;
  updated = false;

  // subscription
  sbcForm!: Subscription;

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

  loading = false;
  subscription: Subscription | null = null;

  constructor(
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private frmBuilder: FormBuilder,
    private api: TransaccionService,
    private transaccionTipoService: TransaccionTipoService,
    private authService: AuthService,
    private sedeService: SedeService
  ) {
    this.displayedColumns =  ['id', 'articulo', 'unidadMedida', 'cantidad','cantidadReal', 'acciones'];
    this.dataSource = new MatTableDataSource<TransaccionDetalle>([]);
    this.initForm();
  }

  ngOnInit(): void {
    if(this.transaccion){
      this.patchForm();
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if(this.sbcForm){this.sbcForm.unsubscribe()}
    if(this.subscription){this.subscription.unsubscribe()}
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

    if(this.invalidMaxCantidad()){
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

  // data
  getTransaccion(idTransaccion: number): void{
    this.loading = true;
    this.subscription = this.api.find(idTransaccion).subscribe((res: Transaccion) => {
      console.log(res);
      this.loading = false;
    }, (error: any) => {
      console.log(error);
      this.loading = false;
    })
  }

  // getters
  get f(): any{
    return this.formGroup.controls;
  }
  get model(): any{
    return {
      id: this.transaccion ? this.transaccion.id : 0,
      idTipoTransaccion: parseInt(this.f.idTipoTransaccion.value),
      idSedeOrigen: this.f.idSedeOrigen.value ? parseInt(this.f.idSedeOrigen.value) : null,
      idSedeDestino: this.f.idSedeDestino.value ? parseInt(this.f.idSedeDestino.value) : null,
      idUsuarioRegistro: !this.transaccion ? this.authService.getUser()?.id : 0,
      idUsuarioModifico: this.transaccion ? this.authService.getUser()?.id : 0,
      idEstado: parseInt(this.f.idEstado.value),
      detalle: this.dataSource.data.map( (x: TransaccionDetalle) => {
        return {
          id: 0,
          idArticuloStock: x.id,
          cantidad: x.cantidad,
          cantidadReal: x.cantidadReal,
          observacion: x.observacion
        }
      })
    }
  }


  //functions
  invalidMaxCantidad(): boolean{
    if(!this.dataSource.data.length){ return false }
    const found = this.dataSource.data.find(x => x.cantidadReal > x.cantidad);
    return !!found;
  }
  zeroValue(): boolean{
    if(!this.dataSource.data.length){ return false }
    const found = this.dataSource.data.find(x => x.cantidadReal === 0);
    return !!found;
  }

  onChangeCantidadReal(idArticuloStock: number, cant: string): void{
    this.dataSource.data.map(x => {
      if(x.id === idArticuloStock){ x.cantidadReal = parseInt(cant,10) }
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
