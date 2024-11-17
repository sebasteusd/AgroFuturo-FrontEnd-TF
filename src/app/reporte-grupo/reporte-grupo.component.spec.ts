import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteGrupoComponent } from './reporte-grupo.component';

describe('ReporteGrupoComponent', () => {
  let component: ReporteGrupoComponent;
  let fixture: ComponentFixture<ReporteGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteGrupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
