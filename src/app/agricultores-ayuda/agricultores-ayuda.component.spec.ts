import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultoresAyudaComponent } from './agricultores-ayuda.component';

describe('AgricultoresAyudaComponent', () => {
  let component: AgricultoresAyudaComponent;
  let fixture: ComponentFixture<AgricultoresAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgricultoresAyudaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgricultoresAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
