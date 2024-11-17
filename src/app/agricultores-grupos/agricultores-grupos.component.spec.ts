import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultoresGruposComponent } from './agricultores-grupos.component';

describe('AgricultoresGruposComponent', () => {
  let component: AgricultoresGruposComponent;
  let fixture: ComponentFixture<AgricultoresGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgricultoresGruposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgricultoresGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
