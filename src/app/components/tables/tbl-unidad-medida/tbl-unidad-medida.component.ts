import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, EventEmitter,
  Inject, OnDestroy,
  OnInit, Output, ViewChild
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionChange, SelectionModel} from "@angular/cdk/collections";
import {UnidadMedida} from "../../../models/Articulo";
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {BehaviorSubject} from "rxjs";
import {Subscription} from "rxjs";
import {UnidadMedidaService} from "../../../services/unidad-medida.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ResizedEvent} from "angular-resize-event";
import {Column} from "../../../models/Tabla";
import {UtilitiesService} from "../../../services/utilities.service";


@Component({
  selector: 'tbl-unidad-medida',
  templateUrl: './tbl-unidad-medida.component.html',
  styleUrls: ['./tbl-unidad-medida.component.scss'],
  animations: [
    trigger('slideFromBottom', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('300ms {{delay}}ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 }, ))
      ], { params: { delay: 10 } })
    ]),
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TblUnidadMedidaComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() onEdit = new EventEmitter<UnidadMedida>();
  selected = new  BehaviorSubject<UnidadMedida | null>(null);
  _loading = new  BehaviorSubject<boolean>(false);

  public dataSource : MatTableDataSource<UnidadMedida>;
  selection = new SelectionModel<UnidadMedida>(false, []);

  public data: UnidadMedida[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading = false;

  // subscriptions
  sbcCollection!: Subscription;

  displayedColumns = new BehaviorSubject<string[]>([]);
  _columns : Column[] = [
    new Column({name:'expand',title: '',visible: false, collapse: false}),
    new Column({name:'select',title: '',visible: true, collapse: false, responsive:{sm: false, md: true, lg: true}}),
    new Column({name:'id',title: '',visible: true, collapse: false}),
    new Column({name:'nombre',title: 'Nombre',visible: true, collapse: false}),
    new Column({name:'nombreCorto',title: 'Nombre corto',visible: true, collapse: false}),
    new Column({name:'fechaRegistro',title: 'F. Registro',visible: true, collapse: true}),
    new Column({name:'fechaModifico',title: 'F. Modifico',visible: true, collapse: true}),
    new Column({name:'estado',title: 'Estado',visible: true, collapse: true}),
    new Column({name:'actions',title: 'Acciones',visible: true, collapse: false, responsive:{sm: false, md: true, lg: true}}),
  ];

  _columnsCollapse: {name: string}[] = [];
  _showExpandible = false;


  expandedElement: UnidadMedida | null = null;

  constructor(
    @Inject(ChangeDetectorRef) private readonly cdr: ChangeDetectorRef,
    private api: UnidadMedidaService,
    private util: UtilitiesService
  ) {
    if(this._columns.filter(x => x.visible).length){
      this.displayedColumns.next( this._columns!.filter(x => x.visible).map(y => y.name)! );
    }

    this.dataSource = new MatTableDataSource<UnidadMedida>([]);
    this.selection = new SelectionModel<UnidadMedida>(false, []);
    this.selection.changed.subscribe((res: SelectionChange<UnidadMedida>)=>{
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
    if(this.sbcCollection){ this.sbcCollection.unsubscribe() }
  }


  // data
  showCollection(): void{
    this.loading = true;
    this._loading.next(true);
    this.sbcCollection = this.api.collection().subscribe((res: UnidadMedida[]) => {
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


  // table events
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

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UnidadMedida): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  edit(unidadMedida: UnidadMedida): void{
    this.selection.select(unidadMedida);
    this.onEdit.emit(unidadMedida);
  }
  removeColumn(){
    this._columns.find(x => x.name === 'estado')!.visible = !this._columns.find(x => x.name === 'estado')!.visible;
    this.displayedColumns.next( this._columns.filter(x => x.visible).map(y => y.name) );
    // console.log(this._columns);
  }

  onResized(event: ResizedEvent) {

    if(document.getElementById('tblUnidadMedida')!.clientWidth > event.newRect.width){
      const arrColumn = this._columns.filter(x => (x.collapse && x.visible) );
      const columnExand = this._columns.find(x => x.name==='expand');

      if(arrColumn.filter(x => (x.visible && x.collapse)).length){

        const arrColumnActive = arrColumn.filter(x => (x.visible && x.collapse)).map(y => y.name);
        arrColumnActive.unshift( 'expand');
        this._columnsCollapse = arrColumn.filter(x => (x.visible && x.collapse));
        this.displayedColumns.next( arrColumnActive );
      }

      // this.displayedColumns.next( this._columns.filter(x => (x.visible && x.collapse)).map(y => y.name) );
    }

    // // Responsive option
    // if(this.util.screenLarge){
    //   this.displayedColumns.next( this._columns.filter(x => x.responsive.lg && x.visible).map(y => y.name) );
    // }
    // if(this.util.screenMedium){
    //   this.displayedColumns.next( this._columns.filter(x => x.responsive.md && x.visible).map(y => y.name) );
    // }
    // if(this.util.screenSmall){
    //   this.displayedColumns.next( this._columns.filter(x => x.responsive.sm && x.visible).map(y => y.name) );
    // }

    // Max width option
    // if(document.getElementById('tblUnidadMedida')!.clientWidth > event.newRect.width){
    //
    //   const removeList = this._columns.filter(x => (x.collapse && x.visible) );
    //
    //   if(removeList.length){
    //     const column = this._columns.find(x => removeList.);
    //
    //     console.log(this.displayedColumns.value);
    //
    //     column!.visible = false;
    //     if(column){
    //       this._columnsCollapse.push(column);
    //       this._columns.find(x => x.name === 'expand')!.visible = !!this._columnsCollapse.length;
    //       this.displayedColumns.next( this._columns.filter(x => x.visible).map(y => y.name) );
    //     }
    //   }
    // }
  }

}
