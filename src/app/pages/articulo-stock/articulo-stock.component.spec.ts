import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloStockComponent } from './articulo-categoria.component';

describe('ArticuloCategoriaComponent', () => {
  let component: ArticuloStockComponent;
  let fixture: ComponentFixture<ArticuloStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
