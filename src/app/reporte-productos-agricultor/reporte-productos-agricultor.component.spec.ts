import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteProductosAgricultorComponent } from './reporte-productos-agricultor.component';

describe('ReporteProductosAgricultorComponent', () => {
  let component: ReporteProductosAgricultorComponent;
  let fixture: ComponentFixture<ReporteProductosAgricultorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteProductosAgricultorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteProductosAgricultorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
