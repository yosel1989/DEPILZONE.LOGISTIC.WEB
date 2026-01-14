import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSedeComponent } from './select-sede.component';

describe('SelectSedeComponent', () => {
  let component: SelectSedeComponent;
  let fixture: ComponentFixture<SelectSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSedeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
