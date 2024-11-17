import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaMercadosComponent } from './empresa-mercados.component';

describe('EmpresaMercadosComponent', () => {
  let component: EmpresaMercadosComponent;
  let fixture: ComponentFixture<EmpresaMercadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaMercadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaMercadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
