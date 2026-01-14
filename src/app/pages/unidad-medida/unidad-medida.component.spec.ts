import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloUnidadMedidaComponent } from './articulo-categoria.component';

describe('ArticuloCategoriaComponent', () => {
  let component: ArticuloUnidadMedidaComponent;
  let fixture: ComponentFixture<ArticuloUnidadMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloUnidadMedidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloUnidadMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
