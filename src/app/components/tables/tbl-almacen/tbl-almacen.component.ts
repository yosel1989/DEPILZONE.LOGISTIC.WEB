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
import {Almacen} from "../../../models/Almacen";
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {BehaviorSubject} from "rxjs";
import {Subscription} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";
import {AlmacenService} from "../../../services/almacen.service";


@Component({
  selector: 'tbl-almacen',
  templateUrl: './tbl-almacen.component.html',
  styleUrls: ['./tbl-almacen.component.scss'],
  animations: [
    trigger('slideFromBottom', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('300ms {{delay}}ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 }, ))
      ], { params: { delay: 10 } })
    ])
  ]
})
export class TblAlmacenComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() onEdit = new EventEmitter<Almacen>();
  selected = new  BehaviorSubject<Almacen | null>(null);
  _loading = new  BehaviorSubject<boolean>(false);

  displayedColumns: string[];
  dataSource : MatTableDataSource<Almacen>;
  selection :SelectionModel<Almacen>;

  data: Almacen[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading = false;

  // subscriptions
  sbcCollection!: Subscription;

  globalIdSede = 0;

  constructor(
    @Inject(ChangeDetectorRef) private readonly cdr: ChangeDetectorRef,
    private api: AlmacenService
  ) {
    this.displayedColumns = ['select', 'nombre', 'sede', 'fechaRegistro', 'fechaModifico', 'estado', 'actions'];
    this.dataSource = new MatTableDataSource<Almacen>([]);
    this.selection = new SelectionModel<Almacen>(false, []);
    this.selection.changed.subscribe((res: SelectionChange<Almacen>)=>{
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
    this.sbcCollection = this.api.collection().subscribe((res: Almacen[]) => {
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


  edit(almacen: Almacen): void{
    this.onEdit.emit(almacen);
  }

}
