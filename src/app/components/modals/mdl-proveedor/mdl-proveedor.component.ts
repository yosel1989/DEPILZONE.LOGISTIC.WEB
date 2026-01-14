import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Proveedor} from "../../../models/Proveedor";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProveedorService} from "../../../services/proveedor.service";
import {AuthService} from "../../../services/auth.service";
import Swal from "sweetalert2";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {MdlUbigeoComponent} from "../mdl-ubigeo/mdl-ubigeo.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'mdl-proveedor',
  templateUrl: './mdl-proveedor.component.html',
  styleUrls: ['./mdl-proveedor.component.scss']
})
export class MdlProveedorComponent implements OnInit, AfterViewInit, OnDestroy {

  ubigModalRef?: BsModalRef | null;

  proveedor: Proveedor | null = null;
  formGroup!: FormGroup
  submitted = false;
  loadingSubmit = false;

  created = false;
  updated = false;

  // subscriptions
  sbcForm!: Subscription;

  constructor(
    public bsModalRef: BsModalRef,
    private frmBuilder: FormBuilder,
    private proveedorService: ProveedorService,
    private authService: AuthService,
    private modalService: BsModalService,
    private modalConfig: ModalOptions
  ) {
    this.ubigModalRef = null;
    this.initForm();
  }

  ngOnInit(): void {
    if(this.proveedor){
      this.patchForm();
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  initForm(): void{
    this.formGroup = this.frmBuilder.group({
      ruc: new FormControl(null, Validators.required),
      razonSocial: new FormControl(null, Validators.required),
      contactoNombre: new FormControl(null),
      contactoApellido: new FormControl(null),
      contactoTelefono: new FormControl(null),
      contactoCorreo: new FormControl(null),
      idUbicacion: new FormControl(null),
      direccion: new FormControl(null),
      ubigeo: new FormControl(null),
      idEstado: new FormControl(1, Validators.required)
    });
  }

  patchForm(): void{
    this.formGroup.patchValue({
      ruc: this.proveedor?.ruc,
      razonSocial: this.proveedor?.razonSocial,
      contactoNombre: this.proveedor?.contactoNombre,
      contactoApellido: this.proveedor?.contactoApellido,
      contactoTelefono: this.proveedor?.contactoTelefono,
      contactoCorreo: this.proveedor?.contactoCorreo,
      idUbicacion: this.proveedor?.idUbicacion,
      direccion: this.proveedor?.direccion,
      ubigeo: this.proveedor?.ubigeo,
      idEstado: this.proveedor?.idEstado
    });
  }

  onSubmit(): void{
    this.submitted = true;

    if(this.formGroup.invalid){
      return;
    }

    this.loadingSubmit = true;
    if(!this.proveedor){
      this.sbcForm = this.proveedorService.create(this.model).subscribe((res: boolean) => {
        if(res){
          this.loadingSubmit = false;
          this.created = true;
          Swal.fire({
            text: "Se registro el proveedor con exito",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Aceptar",
            customClass: {
              confirmButton: "btn btn-primary"
            }
          }).then( (result) => {
            if (result.value) {
              this.bsModalRef.hide();
            }
          });
        }
      }, (err: any) => {
        this.loadingSubmit = false;
        // console.error(err.error.message);
        Swal.fire({
          title: 'Error',
          text: err.error.message,
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        });
      });
    }else{
      this.sbcForm = this.proveedorService.update(this.model).subscribe((res: boolean) => {
        if(res){
          this.loadingSubmit = false;
          this.updated = true;
          Swal.fire({
            text: "Se actualizó el proveedor con éxito",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Aceptar",
            customClass: {
              confirmButton: "btn btn-primary"
            }
          }).then( (result) => {
            if (result.value) {
              this.bsModalRef.hide();
            }
          });
        }
      }, (err: any) => {
        this.loadingSubmit = false;
        Swal.fire({
          title: 'Error',
          text: err.error.message,
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
      id: this.proveedor ? this.proveedor.id : 0,
      ruc: this.f.ruc.value,
      razonSocial: this.f.razonSocial.value,
      contactoNombre: this.f.contactoNombre.value,
      contactoApellido: this.f.contactoApellido.value,
      contactoTelefono: this.f.contactoTelefono.value,
      contactoCorreo: this.f.contactoCorreo.value,
      idUbicacion: this.f.idUbicacion.value,
      direccion: this.f.direccion.value,
      idUsuarioRegistro: !this.proveedor ? this.authService.getUser()?.id : 0,
      idUsuarioModifico: this.proveedor ? this.authService.getUser()?.id : 0,
      idEstado: parseInt(this.f.idEstado.value)
    }
  }

  openUbigeo(): void{
    const data = this.f.idUbicacion.value ? {
      idUbicacion: this.f.idUbicacion.value,
      direccion: this.f.direccion.value
    } : null;
    this.ubigModalRef = this.modalService.show(MdlUbigeoComponent,  Object.assign({}, this.modalConfig, { id: new Date().getTime(), class: 'mw-650px', keyboard: false, backdrop: "static",
      ignoreBackdropClick: false, initialState: { data: data }}) );
    this.ubigModalRef.onHide?.subscribe((res) => {
      if(this.ubigModalRef?.content.change){
        const {idUbicacion, direccion, ubigeo} = this.ubigModalRef?.content.data;
        this.f.idUbicacion.patchValue(idUbicacion);
        this.f.direccion.patchValue(direccion);
        this.f.ubigeo.patchValue(ubigeo);
      }
    });
  }

}
