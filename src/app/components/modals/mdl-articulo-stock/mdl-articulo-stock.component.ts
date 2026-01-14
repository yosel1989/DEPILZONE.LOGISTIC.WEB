import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Articulo, ArticuloStock} from '../../../models/Articulo';

import Swal from 'sweetalert2';
import {AuthService} from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import {Sede} from "../../../models/Sede";
import {SedeService} from "../../../services/sede.service";
import {AlmacenService} from "../../../services/almacen.service";
import {Almacen, AlmacenUbicacion} from "../../../models/Almacen";
import {ArticuloStockService} from "../../../services/articulo-stock.service";
import {ArticuloService} from "../../../services/articulo.service";
import {AlmacenUbicacionService} from "../../../services/almacen-ubicacion.service";


@Component({
  selector: 'mdl-articulo-stock',
  templateUrl: './mdl-articulo-stock.component.html',
  styleUrls: ['./mdl-articulo-stock.component.scss']
})
export class MdlArticuloStockComponent implements OnInit, AfterViewInit, OnDestroy {


  articuloStock: ArticuloStock | null = null;
  formGroup!: FormGroup
  submitted = false;
  loadingSubmit = false;

  created = false;
  updated = false;

  // subscription
  sbcForm!: Subscription;


  loadingArticulos = false;
  articulos: Articulo[] = [];
  sbcArticulos!: Subscription;

  loadingAlmacenes = false;
  almacenes: Almacen[] = [];
  sbcAlmacenes!: Subscription;

  loadingSedes = false;
  sedes: Sede[] = [];
  sbcSedes!: Subscription;

  loadingUbicaciones = false;
  ubicaciones: AlmacenUbicacion[] = [];
  sbcUbicaciones!: Subscription;

  constructor(
    public bsModalRef: BsModalRef,
    private frmBuilder: FormBuilder,
    private api: ArticuloStockService,
    private articuloService: ArticuloService,
    private sedeService: SedeService,
    private almacenService: AlmacenService,
    private almacenUbicacionService: AlmacenUbicacionService,
    private authService: AuthService
  ) {
      this.initForm();
  }

  ngOnInit(): void {
    this.getArticulos();
    this.getSedes();
    if(this.articuloStock){
      this.patchForm();
    }
    this.formGroup.get('idSede')?.valueChanges.subscribe((res) => {
      if (res){
        this.getAlmacenes(parseInt(res,10));
      }else{
        this.almacenes = [];
        this.f.idAlmacen.setValue('');
      }
    });

    this.formGroup.get('idAlmacen')?.valueChanges.subscribe((res) => {
      if (res){
        this.getUbicacionesByAlmacen(parseInt(res,10));
      }else{
        this.ubicaciones = [];
        this.f.idAlmacenUbicacion.setValue('');
      }
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if(this.sbcForm){this.sbcForm.unsubscribe()}
    if(this.sbcArticulos){this.sbcArticulos.unsubscribe()}
    if(this.sbcSedes){this.sbcSedes.unsubscribe()}
    if(this.sbcAlmacenes){this.sbcAlmacenes.unsubscribe()}
    if(this.sbcUbicaciones){this.sbcUbicaciones.unsubscribe()}
  }

  initForm(): void{
    this.formGroup = this.frmBuilder.group({
      idArticulo: new FormControl('', Validators.required),
      stockInicial: new FormControl(0, Validators.required),
      idSede: new FormControl('', Validators.required),
      idAlmacen: new FormControl('', Validators.required),
      idAlmacenUbicacion: new FormControl(''),
      idTransaccion: new FormControl(null),
      idEstado: new FormControl(1, Validators.required)
    });
  }

  patchForm(): void{
    this.formGroup.patchValue({
      idArticulo: this.articuloStock?.idArticulo,
      stockInicial: this.articuloStock?.stockInicial,
      idSede: this.articuloStock?.idSede,
      idAlmacen: this.articuloStock?.idAlmacen,
      idAlmacenUbicacion: this.articuloStock?.idAlmacenUbicacion ? this.articuloStock?.idAlmacenUbicacion : '',
      idTransaccion: this.articuloStock?.idTransaccion,
      idEstado: this.articuloStock?.idEstado
    });
    this.getAlmacenes(this.articuloStock!.idSede);
    this.getUbicacionesByAlmacen(this.articuloStock!.idAlmacen);
  }

  onSubmit(): void{
    this.submitted = true;

    console.log(this.formGroup);

    if(this.formGroup.invalid){
      return;
    }

    if(!this.articuloStock){
      this.loadingSubmit = true;
      this.sbcForm = this.api.create(this.model).subscribe((res: boolean) => {
        if(res){
          this.loadingSubmit = false;
          this.created = true;
          Swal.fire({
            text: 'Se registro el stock del artículo con éxito',
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
          text: 'Ocurrio un error al intentar registrar el stock del artículo',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        })
      });
    }else{
      Swal.fire({
        title: 'Actualizar registro',
        text: '¿Desea modificar el registro?',
        icon: 'question',
        buttonsStyling: false,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-light',
        }
      }).then( (result) => {
        if (result.value) {
          this.loadingSubmit = true;
          this.sbcForm = this.api.update(this.model).subscribe((res: boolean) => {
            if(res){
              this.loadingSubmit = false;
              this.updated = true;
              Swal.fire({
                text: 'Se actualizó el stock del artículo con éxito',
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
              text: 'Ocurrio un error al intentar actualizar el stock del artículo',
              icon: 'error',
              buttonsStyling: false,
              confirmButtonText: 'Aceptar',
              customClass: {
                confirmButton: 'btn btn-primary'
              }
            });
          });
        }
      });
    }
  }

  // events
  showAlmacenes(event: any): void{
    this.f.idAlmacen.patchValue('');
    this.getAlmacenes(parseInt(event.target.value,10));
  }

  // getters
  get f(): any{
    return this.formGroup.controls;
  }
  get model(): any{
    return {
      id: this.articuloStock ? this.articuloStock.id : 0,
      idArticulo: parseInt(this.f.idArticulo.value),
      stockInicial: parseInt(this.f.stockInicial.value),
      idSede: parseInt(this.f.idSede.value),
      idAlmacen: parseInt(this.f.idAlmacen.value),
      idAlmacenUbicacion: parseInt(this.f.idAlmacenUbicacion.value),
      idTransaccion: parseInt(this.f.idTransaccion.value),
      idUsuarioRegistro: !this.articuloStock ? this.authService.getUser()?.id : 0,
      idUsuarioModifico: this.articuloStock ? this.authService.getUser()?.id : 0,
      idEstado: parseInt(this.f.idEstado.value)
    }
  }

  //data
  getArticulos(): void{
    this.loadingArticulos = true;
    this.sbcArticulos = this.articuloService.collection().subscribe((res: Articulo[]) => {
      this.articulos = res;
      this.loadingArticulos = false;
    }, (error: any) => {
      console.log(error);
      this.loadingArticulos = false;
    })
  }
  getSedes(): void{
    this.loadingSedes = true;
    this.sbcSedes = this.sedeService.collection().subscribe((res: Sede[]) => {
      this.sedes = res;
      this.loadingSedes = false;
    }, (error: any) => {
      console.log(error);
      this.loadingSedes = false;
    })
  }
  getAlmacenes(idSede: number): void{
    this.loadingAlmacenes = true;
    this.sbcAlmacenes = this.almacenService.collectionBySede(idSede).subscribe((res: Almacen[]) => {
      this.almacenes = res;
      this.loadingAlmacenes = false;
    }, (error: any) => {
      console.log(error);
      this.loadingAlmacenes = false;
    })
  }
  getUbicacionesByAlmacen(idAlmacen: number): void{
    this.loadingUbicaciones = true;
    this.sbcUbicaciones = this.almacenUbicacionService.collectionByAlmacen(idAlmacen.toString()).subscribe((res: AlmacenUbicacion[]) => {
      this.ubicaciones = res;
      this.loadingUbicaciones = false;
    }, (error: any) => {
      console.log(error);
      this.loadingUbicaciones = false;
    })
  }
}
