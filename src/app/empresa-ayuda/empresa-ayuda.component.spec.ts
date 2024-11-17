import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaAyudaComponent } from './empresa-ayuda.component';

describe('EmpresaAyudaComponent', () => {
  let component: EmpresaAyudaComponent;
  let fixture: ComponentFixture<EmpresaAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaAyudaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
