import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import Swal from 'sweetalert2';
import {AuthService} from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import {AlmacenService} from "../../../services/almacen.service";
import {Sede} from "../../../models/Sede";
import {SedeService} from "../../../services/sede.service";
import {Almacen, AlmacenUbicacion} from 'src/app/models/Almacen';
import {AlmacenUbicacionService} from "../../../services/almacen-ubicacion.service";
import {error} from "jquery";



@Component({
  selector: 'mdl-almacen-ubicacion',
  templateUrl: './mdl-almacen-ubicacion.component.html',
  styleUrls: ['./mdl-almacen-ubicacion.component.scss']
})
export class MdlAlmacenUbicacionComponent implements OnInit, AfterViewInit, OnDestroy {

  ubicacion: AlmacenUbicacion | null = null;
  formGroup!: FormGroup
  submitted = false;
  loadingSubmit = false;

  created = false;
  updated = false;

  sedes: Sede[] = [];
  almacenes: Almacen[] = [];

  // subscription
  sbcForm: Subscription | null = null;
  sbcSedes: Subscription | null = null;
  sbcAlmacenUbicaciones: Subscription | null = null;

  // loadings
  loadingSede = false;
  loadingAlmacenUbicacion = false;

  constructor(
    public bsModalRef: BsModalRef,
    private frmBuilder: FormBuilder,
    private almacenService: AlmacenService,
    private sedeService: SedeService,
    private authService: AuthService,
    private api: AlmacenUbicacionService
  ) {
      this.initForm();
  }

  ngOnInit(): void {
    if (this.ubicacion){
      this.patchForm();
    }
    this.sedeCollection();
    this.formGroup.get('idSede')?.valueChanges.subscribe((res) => {
      if(res){
        this.almacenBySedeCollection(parseInt(res,10));
      }else{
        this.almacenes = [];
      }
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if(this.sbcForm){this.sbcForm.unsubscribe()}
    if(this.sbcSedes){this.sbcSedes.unsubscribe()}
    if(this.sbcAlmacenUbicaciones){this.sbcAlmacenUbicaciones.unsubscribe()}
  }

  initForm(): void{
    this.formGroup = this.frmBuilder.group({
      nombre: new FormControl(null, Validators.required),
      idSede: new FormControl('', Validators.required),
      idAlmacen: new FormControl('', Validators.required),
      idEstado: new FormControl(1, Validators.required),
    });
  }

  patchForm(): void{
    this.formGroup.patchValue({
      nombre: this.ubicacion?.nombre,
      idSede: this.ubicacion?.idSede,
      idAlmacen: this.ubicacion?.idAlmacen,
      idEstado: this.ubicacion?.idEstado
    });
    this.almacenBySedeCollection(this.ubicacion!.idSede);
  }

  onSubmit(): void{
    this.submitted = true;
    this.loadingSubmit = true;

    if(this.formGroup.invalid){
      this.loadingSubmit = false;
      return;
    }

    if(!this.ubicacion){
      this.sbcForm = this.api.create(this.model).subscribe((res: boolean) => {
        if(res){
          this.loadingSubmit = false;
          this.created = true;
          Swal.fire({
            text: 'Se registro la nueva ubicación con éxito',
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
          text: 'Ocurrio un error al intentar registrar la nueva ubicación',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        })
      });
    }else{
      this.sbcForm = this.api.update(this.model).subscribe((res: boolean) => {
        if(res){
          this.loadingSubmit = false;
          this.updated = true;
          Swal.fire({
            text: 'Se actualizó la ubicación con éxito',
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
          text: 'Ocurrio un error al intentar actualizar la ubicación',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        });
      });
    }
  }

  // getters
  get f(): any{
    return this.formGroup.controls;
  }
  get model(): any{
    return {
      id: this.ubicacion ? this.ubicacion.id : 0,
      nombre: this.f.nombre.value,
      idSede: parseInt(this.f.idSede.value),
      idAlmacen: parseInt(this.f.idAlmacen.value),
      idUsuarioRegistro: !this.ubicacion ? this.authService.getUser()?.id : 0,
      idUsuarioModifico: this.ubicacion ? this.authService.getUser()?.id : 0,
      idEstado: parseInt(this.f.idEstado.value)
    }
  }

  // get data
  sedeCollection(): void{
    this.loadingSede = true;
    this.sbcSedes = this.sedeService.collection().subscribe((res: Sede[]) => {
      this.sedes = res;
      this.loadingSede = false;
    }, (err: any) => {
      console.log(err);
      this.loadingSede = false;
    })
  }
  almacenBySedeCollection( idSede: number ): void{
    this.loadingAlmacenUbicacion = true;
    this.sbcAlmacenUbicaciones = this.almacenService.collectionBySede(idSede).subscribe((res: Almacen[]) => {
      this.almacenes = res;
      this.loadingAlmacenUbicacion = false;
    }, (err: any) => {
      console.log(err);
      this.loadingAlmacenUbicacion = false;
    })
  }
}
