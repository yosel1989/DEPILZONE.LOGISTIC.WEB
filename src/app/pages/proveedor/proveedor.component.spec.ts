import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorComponent } from './articulo.component';

describe('ArticuloComponent', () => {
  let component: ProveedorComponent;
  let fixture: ComponentFixture<ProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
