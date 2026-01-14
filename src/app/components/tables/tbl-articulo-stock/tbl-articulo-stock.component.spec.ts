import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaArticulosComponent } from './tabla-listado-articulos.component';

describe('TablaListadoArticulosComponent', () => {
  let component: TablaArticulosComponent;
  let fixture: ComponentFixture<TablaArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaArticulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
