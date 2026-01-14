import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, EventEmitter,
  Inject, OnDestroy,
  OnInit, Output, ViewChild
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionChange, SelectionModel} from "@angular/cdk/collections";
import {Articulo} from "../../../models/Articulo";
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {BehaviorSubject} from "rxjs";
import {Subscription} from "rxjs";
import {ArticuloService} from "../../../services/articulo.service";
import {animate, style, transition, trigger} from '@angular/animations';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";


@Component({
  selector: 'tbl-articulo',
  templateUrl: './tbl-articulo.component.html',
  styleUrls: ['./tbl-articulo.component.scss'],
  animations: [
    trigger('slideFromBottom', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('300ms {{delay}}ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 }, ))
      ], { params: { delay: 10 } })
    ])
  ]
})
//
// trigger('slideFromBottom', [
//   transition('void => *', [
//     style({ opacity: 0, transform: 'translateY(15px)' }),
//     animate('300ms {{delay}}ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 }, ))
//   ], { params: { delay: 10 } })
// ])


export class TblArticuloComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() onEdit = new EventEmitter<Articulo>();
  @Output() onShowProviders = new EventEmitter<Articulo>();
  selected = new  BehaviorSubject<Articulo | null>(null);
  _loading = new BehaviorSubject<boolean>(false);

  displayedColumns: string[];
  public dataSource : MatTableDataSource<Articulo>;
  selection :SelectionModel<Articulo>;

  public data: Articulo[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading = false;
  subscription!: Subscription;

  constructor(
    @Inject(ChangeDetectorRef) private readonly cdr: ChangeDetectorRef,
    private api: ArticuloService
  ) {
    this.displayedColumns = ['select', 'id','codigo', 'nombre', 'descripcion', 'unidadMedida', 'categoria', 'fechaRegistro', 'fechaModifico', 'estado', 'actions'];
    this.dataSource = new MatTableDataSource<Articulo>([]);
    this.selection = new SelectionModel<Articulo>(false, []);
    this.selection.changed.subscribe((res: SelectionChange<Articulo>)=>{
      this.selected.next( res.added.length ? res.added[0] : null );
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.showCollection();
  }

  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe()}
  }

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


  // data
  showCollection(): void{
    this.loading = true;
    this._loading.next(true);
    this.subscription = this.api.collection().subscribe((res: Articulo[]) => {
      this.dataSource.data = res;
      this.selection.clear();
      this.loading = false;
      this._loading.next(false);
    }, (error: any) => {
      console.log(error);
      this.loading = false;
      this._loading.next(false);
    })
  }

  // events
  edit(articulo: Articulo): void{
    this.selection.select(articulo);
    this.onEdit.emit(articulo);
  }
  showProviders(articulo: Articulo): void{
    this.onShowProviders.emit(articulo)
  }

}
