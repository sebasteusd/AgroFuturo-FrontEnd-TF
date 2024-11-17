import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaGruposComponent } from './empresa-grupos.component';

describe('EmpresaGruposComponent', () => {
  let component: EmpresaGruposComponent;
  let fixture: ComponentFixture<EmpresaGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaGruposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
