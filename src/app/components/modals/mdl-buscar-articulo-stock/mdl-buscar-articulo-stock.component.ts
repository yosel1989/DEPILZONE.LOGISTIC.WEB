import {AfterViewInit, Component, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import Swal from 'sweetalert2';
import {AuthService} from "../../../services/auth.service";
import {Subscription} from 'rxjs';
import { Subject } from 'rxjs';
import {WhiteValidator} from "../../../helpers/validators";
import {ArticuloStock} from "../../../models/Articulo";
import {ArticuloStockService} from "../../../services/articulo-stock.service";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'mdl-buscar-articulo-stock',
  templateUrl: './mdl-buscar-articulo-stock.component.html',
  styleUrls: ['./mdl-buscar-articulo-stock.component.scss']
})


export class MdlBuscarArticuloStockComponent implements OnInit, AfterViewInit, OnDestroy {



  formGroup!: FormGroup
  submitted = false;

  // subscriptions
  sbcForm!: Subscription;

  articulos: ArticuloStock[] = [];
  sbcArticuloStocks: Subscription | null = null;
  loadingArticuloStocks = false;

  _collectionSelected: ArticuloStock[] = [];
  _selected !: Subject<ArticuloStock[]>;

  displayedColumns: string[];
  dataSource : MatTableDataSource<ArticuloStock>;
  selection :SelectionModel<ArticuloStock>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public bsModalRef: BsModalRef,
    private frmBuilder: FormBuilder,
    private authService: AuthService,
    private articuloService: ArticuloStockService
  ) {
    this.displayedColumns = ['select', 'id', 'articulo', 'stock','sede', 'almacen', 'ubicacion','estado'];
    this.dataSource = new MatTableDataSource<ArticuloStock>([]);
    this.selection = new SelectionModel<ArticuloStock>(true, []);
      this.initForm();
  }

  ngOnInit(): void {
    this._selected = new Subject<ArticuloStock[]>();
    console.log(this._collectionSelected);
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this._selected.complete();
    if(this.sbcArticuloStocks){ this.sbcArticuloStocks.unsubscribe(); }
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
  collectionArticuloStocks(parametros : string | null): void{
    this.loadingArticuloStocks = true;
    if(parametros){
      this.sbcArticuloStocks = this.articuloService.collectionByParameters(parametros).subscribe((res: ArticuloStock[]) => {
        this.articulos = res;
        this.dataSource.data = res;
        this.loadingArticuloStocks = false;
      }, (error: any) => {
        console.log(error);
        this.loadingArticuloStocks = false;
      });
    }else{
      this.sbcArticuloStocks = this.articuloService.collection().subscribe((res: ArticuloStock[]) => {
        this.articulos = res;
        this.dataSource.data = res;
        this.loadingArticuloStocks = false;
      }, (error: any) => {
        console.log(error);
        this.loadingArticuloStocks = false;
      });
    }
  }

  // events
  onSearch(): void{
    this.submitted = true;

    if(this.formGroup.invalid){
      return;
    }
    const _s = (!this.f.searchControl.value || this.f.searchControl.value.toString().trim() === '') ? null : this.f.searchControl.value.toString().trim();
    this.collectionArticuloStocks(_s);
  }
  onPush(): void{
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
