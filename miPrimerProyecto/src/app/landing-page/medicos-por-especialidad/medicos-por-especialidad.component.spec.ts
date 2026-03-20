import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosPorEspecialidadComponent } from './medicos-por-especialidad.component';

describe('MedicosPorEspecialidadComponent', () => {
  let component: MedicosPorEspecialidadComponent;
  let fixture: ComponentFixture<MedicosPorEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicosPorEspecialidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicosPorEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
