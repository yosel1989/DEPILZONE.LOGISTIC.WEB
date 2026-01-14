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
import {TransaccionTipo} from "../../../models/Transaccion";
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {TransaccionTipoService} from "../../../services/transaccion-tipo.service";
import {BehaviorSubject} from "rxjs";
import {Subscription} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'tbl-transaccion-tipo',
  templateUrl: './tbl-transaccion-tipo.component.html',
  styleUrls: ['./tbl-transaccion-tipo.component.scss'],
  animations: [
    trigger('slideFromBottom', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('300ms {{delay}}ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 }, ))
      ], { params: { delay: 10 } })
    ])
  ]
})
export class TblTransaccionTipoComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() onEdit = new EventEmitter<TransaccionTipo>();
  selected = new  BehaviorSubject<TransaccionTipo | null>(null);
  _loading = new  BehaviorSubject<boolean>(false);

  displayedColumns: string[];
  dataSource : MatTableDataSource<TransaccionTipo>;
  selection :SelectionModel<TransaccionTipo>;

  data: TransaccionTipo[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading = false;

  // subscriptions
  sbcCollection!: Subscription;

  constructor(
    @Inject(ChangeDetectorRef) private readonly cdr: ChangeDetectorRef,
    private api: TransaccionTipoService
  ) {
    this.displayedColumns = ['select', 'id', 'nombre','nombreCorto', 'descripcion', 'fechaRegistro', 'fechaModifico', 'estado', 'actions'];
    this.dataSource = new MatTableDataSource<TransaccionTipo>([]);
    this.selection = new SelectionModel<TransaccionTipo>(false, []);
    this.selection.changed.subscribe((res: SelectionChange<TransaccionTipo>)=>{
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
    this.sbcCollection = this.api.collection().subscribe((res: TransaccionTipo[]) => {
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


  edit(tipo: TransaccionTipo): void{
    this.onEdit.emit(tipo);
  }

}
