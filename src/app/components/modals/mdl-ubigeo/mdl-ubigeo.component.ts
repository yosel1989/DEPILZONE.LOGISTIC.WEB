import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {UCiudad, UDepartamento, UDistrito} from "../../../models/Ubigeo";
import {UbigeoService} from "../../../services/ubigeo.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'mdl-ubigeo',
  templateUrl: './mdl-ubigeo.component.html',
  styleUrls: ['./mdl-ubigeo.component.scss']
})
export class MdlUbigeoComponent implements OnInit, AfterViewInit, OnDestroy {

  data: {
    idUbicacion: string | null,
    direccion: string | null,
    ubigeo: string | null
  } | null = null;
  change = false;

  @Input() idUbigeo: FormControl | null = null;
  @Input() direccion: FormControl | null = null;

  formGroup!: FormGroup
  submitted = false;
  loadingSubmit = false;

  created = false;
  updated = false;

  loadingDpt = false;
  collectionDpt : UDepartamento[] = [];

  loadingCit = false;
  collectionCit : UCiudad[] = [];

  loadingDst = false;
  collectionDst : UDistrito[] = [];

  // subscriptions
  sbcDepartment!: Subscription;
  sbcCity!: Subscription;
  sbcDistrit!: Subscription;

  constructor(
    public bsModalRef: BsModalRef,
    private frmBuilder: FormBuilder,
    private ubigeoService: UbigeoService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    if(this.data){
      this.patchForm();
    }
    this.loadDepartments();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if(this.sbcDepartment){this.sbcDepartment.unsubscribe()}
    if(this.sbcCity){this.sbcCity.unsubscribe()}
    if(this.sbcDistrit){this.sbcDistrit.unsubscribe()}
  }

  initForm(): void{
    this.formGroup = this.frmBuilder.group({
      idDepartamento: new FormControl('', Validators.required),
      idCiudad: new FormControl({value:'',disabled:true}),
      idDistrito: new FormControl({value:'',disabled:true}, Validators.required),
      direccion: new FormControl(null, Validators.required)
    });
  }

  patchForm(): void{
    if(this.data?.idUbicacion){

      this.loadCities(this.data?.idUbicacion.toString().substring(0,2), false);
      this.loadDistrits(this.data?.idUbicacion.toString().substring(0,2), this.data?.idUbicacion.toString().substring(2,4));

      this.formGroup.patchValue({
        idDepartamento: this.data?.idUbicacion.toString().substring(0,2),
        idCiudad: this.data?.idUbicacion.toString().substring(2,4),
        idDistrito: this.data?.idUbicacion.toString(),
        direccion: this.data?.direccion
      });
    }
  }

  onSubmit(): void{
    this.submitted = true;

    if(this.formGroup.invalid){
      return;
    }

    this.data = {
      idUbicacion : this.f.idDistrito.value,
      direccion: this.f.direccion.value,
      ubigeo: this.collectionDpt.find(d => d.id === this.f.idDepartamento.value)?.nombre + ' - ' +
              this.collectionCit.find(c => c.id === this.f.idCiudad.value)?.nombre + ' - ' +
              this.collectionDst.find(d => d.id === this.f.idDistrito.value)?.nombre + ' - ' +
              this.f.direccion.value
    };
    this.change = true;

    this.bsModalRef.hide();

  }

  // getters
  get f(): any{
    return this.formGroup.controls;
  }

  // data
  loadDepartments(): void{
    this.loadingDpt = true;
    this.sbcDepartment = this.ubigeoService.department().subscribe((res: UDepartamento[]) => {
      this.collectionDpt = res;
      this.loadingDpt = false;
    }, (error: any) => {
      console.log(error);
      this.loadingDpt = false;
    });
  }
  loadCities(idDepartment: string, init: boolean = true): void{
    if(idDepartment === ''){
      this.collectionCit = [];
      this.collectionDst = [];
      this.f.idCiudad.patchValue('');
      this.f.idCiudad.disable();
      this.f.idDistrito.patchValue('');
      this.f.idDistrito.disable();
      return;
    }
    this.loadingCit = true;
    this.sbcCity = this.ubigeoService.cities(idDepartment).subscribe((res: UCiudad[]) => {
      this.collectionCit = res;
      if( !res.length ) {
        this.f.idCiudad.patchValue('');
        this.f.idCiudad.disable();
        this.f.idDistrito.patchValue('');
        this.f.idDistrito.disable();
      }else{
        if(init){
          this.f.idCiudad.patchValue('');
          this.f.idCiudad.enable();
          this.f.idDistrito.patchValue('');
          this.f.idDistrito.disable();
        }else{
          // this.f.idCiudad.patchValue(this.data?.idUbicacion?.substring(2,4));
          this.f.idCiudad.enable();
          // this.f.idDistrito.patchValue(this.data?.idUbicacion);
          this.f.idDistrito.enable();
        }
      }
      this.loadingCit = false;
    }, (error: any) => {
      console.log(error);
      this.loadingCit = false;
    });
  }
  loadDistrits(idDepartment: string, idCiudad: string): void{
    if(idCiudad === ''){
      this.collectionDst = [];
      this.f.idDistrito.setValue({value:'', disabled: true});
      return;
    }
    this.loadingDst = true;
    this.sbcDistrit = this.ubigeoService.districts(idDepartment, idCiudad).subscribe((res: UCiudad[]) => {
      this.collectionDst = res;
      if( !res.length ) { this.f.idDistrito.disable() }else{ this.f.idDistrito.enable() }
      this.loadingDst = false;
    }, (error: any) => {
      console.log(error);
      this.loadingDst = false;
    });
  }

}
