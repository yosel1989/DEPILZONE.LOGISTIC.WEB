import {AfterViewInit, Component, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import Swal from 'sweetalert2';
import {AuthService} from "../../../services/auth.service";
import {Subscription} from 'rxjs';
import { Subject } from 'rxjs';
import {WhiteValidator} from "../../../helpers/validators";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSort} from "@angular/material/sort";
import {Proveedor} from "../../../models/Proveedor";
import {ProveedorService} from "../../../services/proveedor.service";

@Component({
  selector: 'mdl-buscar-proveedor',
  templateUrl: './mdl-buscar-proveedor.component.html',
  styleUrls: ['./mdl-buscar-proveedor.component.scss']
})

export class MdlBuscarProveedorComponent implements OnInit, AfterViewInit, OnDestroy {

  formGroup!: FormGroup
  submitted = false;

  // subscriptions
  sbcForm!: Subscription;

  proveedores: Proveedor[] = [];
  sbcProveedores: Subscription | null = null;
  loadingProveedores = false;

  _collectionSelected: Proveedor[] = [];
  _selected !: Subject<Proveedor[]>;

  displayedColumns: string[];
  dataSource : MatTableDataSource<Proveedor>;
  selection :SelectionModel<Proveedor>;
  @ViewChild(MatSort) sort!: MatSort;

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
    public bsModalRef: BsModalRef,
    private frmBuilder: FormBuilder,
    private authService: AuthService,
    private proveedorService: ProveedorService
  ) {
    this.displayedColumns = ['select', 'id', 'ruc', 'razonSocial','contactoTelefono', 'contactoCorreo','estado'];
    this.dataSource = new MatTableDataSource<Proveedor>([]);
    this.selection = new SelectionModel<Proveedor>(true, []);
      this.initForm();
  }

  ngOnInit(): void {
    this._selected = new Subject<Proveedor[]>();
    console.log(this._collectionSelected);
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this._selected.complete();
    if(this.sbcProveedores){ this.sbcProveedores.unsubscribe(); }
  }

  initForm(): void{
    this.formGroup = this.frmBuilder.group({
      searchControl: new FormControl(null, Validators.required)
    },{
      validator: WhiteValidator('searchControl')
    });
  }

  // getters
  get f(): any{
    return this.formGroup.controls;
  }

  // data
  collectionProveedors(parameters : string): void{
    this.loadingProveedores = true;
    this.sbcProveedores = this.proveedorService.collectionByParameters(parameters).subscribe((res: Proveedor[]) => {
      this.proveedores = res;
      this.dataSource.data = res;
      this.loadingProveedores = false;
    }, (error: any) => {
      console.log(error);
      this.loadingProveedores = false;
    });
  }

  // events
  onSearch(): void{
    this.submitted = true;

    if(this.formGroup.invalid){
      return;
    }
    const _s = (!this.f.searchControl.value || this.f.searchControl.value.toString().trim() === '') ? null : this.f.searchControl.value.toString().trim();
    this.collectionProveedors(_s);
  }
  onPush(): void{
    if(!this.selection.selected.length){
      this.Toast.fire({
        icon: 'error',
        title: 'Tiene 0 proveedores seleccionados'
      });
      return;
    }

    const items = this.selection.selected.filter(x => !this._collectionSelected.map(x => x.id).includes(x.id));
    this._selected.next(items);
    this.bsModalRef.hide();
  }

  // table
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

}
