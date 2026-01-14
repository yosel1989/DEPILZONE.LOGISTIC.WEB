import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, EventEmitter,
  Inject, OnDestroy,
  OnInit, Output, ViewChild
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionChange, SelectionModel} from "@angular/cdk/collections";
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {BehaviorSubject} from "rxjs";
import {Subscription} from "rxjs";
import {animate, style, transition, trigger} from '@angular/animations';
import { AlmacenUbicacion } from 'src/app/models/Almacen';
import {AlmacenUbicacionService} from "../../../services/almacen-ubicacion.service";


@Component({
  selector: 'tbl-almacen-ubicacion',
  templateUrl: './tbl-almacen-ubicacion.component.html',
  styleUrls: ['./tbl-almacen-ubicacion.component.scss'],
  animations: [
    trigger('slideFromBottom', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('300ms {{delay}}ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 }, ))
      ], { params: { delay: 10 } })
    ])
  ]
})

export class TblAlmacenUbicacionComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() onEdit = new EventEmitter<AlmacenUbicacion>();
  selected = new  BehaviorSubject<AlmacenUbicacion | null>(null);
  _loading = new BehaviorSubject<boolean>(false);

  displayedColumns: string[];
  public dataSource : MatTableDataSource<AlmacenUbicacion>;
  selection :SelectionModel<AlmacenUbicacion>;

  public data: AlmacenUbicacion[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading = false;
  subscription!: Subscription;

  constructor(
    @Inject(ChangeDetectorRef) private readonly cdr: ChangeDetectorRef,
    private api: AlmacenUbicacionService
  ) {
    this.displayedColumns = ['select', 'id','nombre', 'sede', 'almacen', 'fechaRegistro', 'fechaModifico', 'estado', 'actions'];
    this.dataSource = new MatTableDataSource<AlmacenUbicacion>([]);
    this.selection = new SelectionModel<AlmacenUbicacion>(false, []);
    this.selection.changed.subscribe((res: SelectionChange<AlmacenUbicacion>)=>{
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
    this.subscription = this.api.collection().subscribe((res: AlmacenUbicacion[]) => {
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
  edit(ubicacion: AlmacenUbicacion): void{
    this.selection.select(ubicacion);
    this.onEdit.emit(ubicacion);
  }

}
