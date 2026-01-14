import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit, Output, ViewChild,
  EventEmitter, Input, OnDestroy
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionChange, SelectionModel} from "@angular/cdk/collections";
import {OrdenCompra} from "../../../models/OrdenCompra";
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {BehaviorSubject} from "rxjs";
import {Subscription} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";
import {OrdenCompraService} from "../../../services/orden-compra.service";
import {EstadoOrdenCompra} from "../../../helpers/enums";


@Component({
  selector: 'tbl-orden-compra',
  templateUrl: './tbl-orden-compra.component.html',
  styleUrls: ['./tbl-orden-compra.component.scss'],
  animations: [
    trigger('slideFromBottom', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('300ms {{delay}}ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 }, ))
      ], { params: { delay: 10 } })
    ])
  ]
})
export class TblOrdenCompraComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() onShow = new EventEmitter<OrdenCompra>();
  @Output() onConfirm = new EventEmitter<OrdenCompra>();
  @Output() onCancel = new EventEmitter<OrdenCompra>();


  selected = new  BehaviorSubject<OrdenCompra | null>(null);
  _loading = new  BehaviorSubject<boolean>(false);

  displayedColumns: string[];
  dataSource : MatTableDataSource<OrdenCompra>;
  selection :SelectionModel<OrdenCompra>;

  data: OrdenCompra[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading = false;

  // subscriptions
  sbcCollection!: Subscription;

  EstadoOrdenCompra = EstadoOrdenCompra;

  constructor(
    @Inject(ChangeDetectorRef) private readonly cdr: ChangeDetectorRef,
    private api: OrdenCompraService
  ) {
    this.displayedColumns = ['select', 'id', 'items', 'fechaRegistro', 'fechaModifico', 'estado', 'actions'];
    this.dataSource = new MatTableDataSource<OrdenCompra>([]);
    this.selection = new SelectionModel<OrdenCompra>(false, []);
    this.selection.changed.subscribe((res: SelectionChange<OrdenCompra>)=>{
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
    if(this.sbcCollection){ this.sbcCollection.unsubscribe(); }
  }

  // data
  showCollection(): void{
    if(this.sbcCollection){ this.sbcCollection.unsubscribe(); }
    this.loading = true;
    this._loading.next(true);
    this.sbcCollection = this.api.collection().subscribe((res: OrdenCompra[]) => {
      this.dataSource.data = res;
      this.selection.clear();
      this.loading = false;
      this._loading.next(false);
    }, (error: Error) => {
      console.log(error);
      this.loading = false;
      this._loading.next(false);
    })
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

  show(item: OrdenCompra): void{
    this.api.find(item.id).subscribe((res: OrdenCompra) => {
      console.log(res);
    }, (error: any) => {
      console.log(error);
    });
  }

  confirm(item: OrdenCompra): void{

  }

  cancel(item: OrdenCompra): void{

  }

}
