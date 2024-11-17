import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultoresEmpresasComponent } from './agricultores-empresas.component';

describe('AgricultoresEmpresasComponent', () => {
  let component: AgricultoresEmpresasComponent;
  let fixture: ComponentFixture<AgricultoresEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgricultoresEmpresasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgricultoresEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
