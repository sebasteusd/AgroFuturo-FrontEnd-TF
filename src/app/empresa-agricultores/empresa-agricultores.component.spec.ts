import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaAgricultoresComponent } from './empresa-agricultores.component';

describe('EmpresaAgricultoresComponent', () => {
  let component: EmpresaAgricultoresComponent;
  let fixture: ComponentFixture<EmpresaAgricultoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaAgricultoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaAgricultoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
