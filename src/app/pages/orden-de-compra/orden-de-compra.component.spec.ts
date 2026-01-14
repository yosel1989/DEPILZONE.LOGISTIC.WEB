import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionTipoComponent } from './articulo-categoria.component';

describe('ArticuloCategoriaComponent', () => {
  let component: TransaccionTipoComponent;
  let fixture: ComponentFixture<TransaccionTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransaccionTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaccionTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
