import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteComprasEmpresaComponent } from './reporte-compras-empresa.component';

describe('ReporteComprasEmpresaComponent', () => {
  let component: ReporteComprasEmpresaComponent;
  let fixture: ComponentFixture<ReporteComprasEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteComprasEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteComprasEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
