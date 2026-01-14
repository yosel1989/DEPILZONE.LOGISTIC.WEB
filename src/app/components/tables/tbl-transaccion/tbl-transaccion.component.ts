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
import {Transaccion} from "../../../models/Transaccion";
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {BehaviorSubject} from "rxjs";
import {Subscription} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";
import { TransaccionService } from 'src/app/services/transaccion.service';
import { EstadoTransaccion } from 'src/app/helpers/enums';


@Component({
  selector: 'tbl-transaccion',
  templateUrl: './tbl-transaccion.component.html',
  styleUrls: ['./tbl-transaccion.component.scss'],
  animations: [
    trigger('slideFromBottom', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('300ms {{delay}}ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 }, ))
      ], { params: { delay: 10 } })
    ])
  ]
})
export class TblTransaccionComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() onShow = new EventEmitter<Transaccion>();
  @Output() onConfirm = new EventEmitter<Transaccion>();
  @Output() onCancel = new EventEmitter<Transaccion>();
  selected = new  BehaviorSubject<Transaccion | null>(null);
  _loading = new  BehaviorSubject<boolean>(false);

  displayedColumns: string[];
  dataSource : MatTableDataSource<Transaccion>;
  selection :SelectionModel<Transaccion>;

  data: Transaccion[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading = false;

  // subscriptions
  sbcCollection!: Subscription;

  EstadoTransaccion = EstadoTransaccion;

  constructor(
    @Inject(ChangeDetectorRef) private readonly cdr: ChangeDetectorRef,
    private api: TransaccionService
  ) {
    this.displayedColumns = ['select', 'id', 'tipoTransaccion','sedeOrigen', 'sedeDestino', 'ordenCompra', 'fechaRegistro', 'fechaModifico', 'estado', 'actions'];
    this.dataSource = new MatTableDataSource<Transaccion>([]);
    this.selection = new SelectionModel<Transaccion>(false, []);
    this.selection.changed.subscribe((res: SelectionChange<Transaccion>)=>{
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
    this.loading = true;
    this._loading.next(true);
    this.sbcCollection = this.api.collection().subscribe((res: Transaccion[]) => {
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


  confirm(item: Transaccion): void{
    this.onConfirm.emit(item);
  }

  show(item: Transaccion): void{
    this.onShow.emit(item);
  }

  cancel(item: Transaccion): void{
    this.onCancel.emit(item);
  }

}
