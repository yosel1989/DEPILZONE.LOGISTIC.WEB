import {AfterViewInit, Component, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import Swal from 'sweetalert2';
import {AuthService} from "../../../services/auth.service";
import {Subscription} from 'rxjs';
import { Subject } from 'rxjs';
import {WhiteValidator} from "../../../helpers/validators";
import {ArticuloOrden} from "../../../models/Articulo";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSort} from "@angular/material/sort";
import {ArticuloService} from "../../../services/articulo.service";

@Component({
  selector: 'mdl-buscar-articulo-orden',
  templateUrl: './mdl-buscar-articulo-orden.component.html',
  styleUrls: ['./mdl-buscar-articulo-orden.component.scss']
})


export class MdlBuscarArticuloOrdenComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() type: string | null = null;

  formGroup!: FormGroup
  submitted = false;

  // subscriptions
  sbcForm!: Subscription;

  articulos: ArticuloOrden[] = [];
  sbcArticulos: Subscription | null = null;
  loadingArticulos = false;

  _collectionSelected: ArticuloOrden[] = [];
  _selected !: Subject<ArticuloOrden[]>;

  displayedColumns: string[];
  dataSource : MatTableDataSource<ArticuloOrden>;
  selection :SelectionModel<ArticuloOrden>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public bsModalRef: BsModalRef,
    private frmBuilder: FormBuilder,
    private authService: AuthService,
    private api: ArticuloService
  ) {
    this.displayedColumns = ['select', 'id', 'nombre', 'codigo', 'unidadMedida', 'estado'];
    this.dataSource = new MatTableDataSource<ArticuloOrden>([]);
    this.selection = new SelectionModel<ArticuloOrden>(true, []);
      this.initForm();
  }

  ngOnInit(): void {
    this._selected = new Subject<ArticuloOrden[]>();
    // console.log(this._collectionSelected);
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this._selected.complete();
    if(this.sbcArticulos){ this.sbcArticulos.unsubscribe(); }
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
  collectionArticuloByParameter(parametros : string): void{
    this.selection.clear();
    this.loadingArticulos = true;
    this.sbcArticulos = this.api.collectionOrdenByParameters(parametros).subscribe((res: ArticuloOrden[]) => {
      this.articulos = res;
      this.dataSource.data = res;
      this.loadingArticulos = false;
    }, (error: any) => {
      console.log(error);
      this.loadingArticulos = false;
    });
  }

  // events
  onSearch(): void{
    this.submitted = true;

    if(this.formGroup.invalid){
      return;
    }
    const _s = (!this.f.searchControl.value || this.f.searchControl.value.toString().trim() === '') ? null : this.f.searchControl.value.toString().trim();
    this.collectionArticuloByParameter(_s);
  }
  onPush(): void{
    let items = this.selection.selected.filter(x => !this._collectionSelected.map(x => x.id).includes(x.id));
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
