import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListadoProveedoresComponent } from './tabla-listado-articulos.component';

describe('TablaListadoArticulosComponent', () => {
  let component: TablaListadoProveedoresComponent;
  let fixture: ComponentFixture<TablaListadoProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaListadoProveedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListadoProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
