import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlProveedorComponent } from './proveedor.component';

describe('ProveedorComponent', () => {
  let component: MdlProveedorComponent;
  let fixture: ComponentFixture<MdlProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
