import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaHomeComponent } from './empresa-home.component';

describe('EmpresaHomeComponent', () => {
  let component: EmpresaHomeComponent;
  let fixture: ComponentFixture<EmpresaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
