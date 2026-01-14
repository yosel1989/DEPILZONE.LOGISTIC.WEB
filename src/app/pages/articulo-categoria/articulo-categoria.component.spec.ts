import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCategoriaComponent } from './articulo-categoria.component';

describe('ArticuloCategoriaComponent', () => {
  let component: ArticuloCategoriaComponent;
  let fixture: ComponentFixture<ArticuloCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
