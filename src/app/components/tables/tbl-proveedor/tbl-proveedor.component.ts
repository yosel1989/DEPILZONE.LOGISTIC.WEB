import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, EventEmitter,
  Inject, OnDestroy,
  OnInit, Output, ViewChild
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionChange, SelectionModel} from "@angular/cdk/collections";
import {Proveedor} from "../../../models/Proveedor";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ProveedorService} from "../../../services/proveedor.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {UtilitiesService} from "../../../services/utilities.service";
import {BehaviorSubject} from "rxjs";
import {Subscription} from "rxjs";


@Component({
  selector: 'tbl-proveedor',
  templateUrl: './tbl-proveedor.component.html',
  styleUrls: ['./tbl-proveedor.component.scss'],
  animations: [
    trigger('slideFromBottom', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('300ms {{delay}}ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 }, ))
      ], { params: { delay: 10 } })
    ])
  ]
})
export class TblProveedorComponent implements OnInit, AfterViewInit, OnDestroy {


  displayedColumns: string[];
  public dataSource : MatTableDataSource<Proveedor>;
  selection :SelectionModel<Proveedor>;

  public data: Proveedor[] = [];

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


  @Output() onEdit = new EventEmitter<Proveedor>();
  _selected = new BehaviorSubject<Proveedor | null>(null);
  _loading = new BehaviorSubject<boolean>(false);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading = false;
  subscription!: Subscription;

  constructor(
    @Inject(ChangeDetectorRef) private readonly cdr: ChangeDetectorRef,
    private api: ProveedorService,
    public util: UtilitiesService
  ) {
    this.displayedColumns = ['select', 'id', 'ruc', 'razonSocial', 'contactoNombre', 'contactoApellido', 'contactoTelefono', 'contactoCorreo', 'ciudad', 'distrito', 'direccion', 'estado', 'fechaRegistro', 'fechaModifico', 'actions'];
    this.dataSource = new MatTableDataSource<Proveedor>([]);
    this.selection = new SelectionModel<Proveedor>(false, []);
    this.selection.changed.subscribe((res: SelectionChange<Proveedor>)=>{
      this._selected.next( res.added.length ? res.added[0] : null );
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

  // data
  showCollection(): void{
    this.loading = true;
    this._loading.next(true);
    this.subscription = this.api.collection().subscribe((res: Proveedor[]) => {
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
  edit(proveedor: Proveedor): void{
    this.selection.select(proveedor);
    this.onEdit.emit(proveedor);
  }

  long(proveedor: Proveedor): void{
    this.selection.select(proveedor);
  }

}
