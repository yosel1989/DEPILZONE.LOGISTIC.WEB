import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlArticuloComponent } from './articulo.component';

describe('ArticuloComponent', () => {
  let component: MdlArticuloComponent;
  let fixture: ComponentFixture<MdlArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdlArticuloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
