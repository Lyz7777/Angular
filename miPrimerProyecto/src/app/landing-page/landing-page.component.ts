import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MennuComponent } from './mennu/mennu.component';
import { CarruselComponent } from './carrusel/carrusel.component';
import { MedicosPorEspecialidadComponent } from './medicos-por-especialidad/medicos-por-especialidad.component';
import { FormularioComponent } from './formulario/formulario.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MennuComponent,
    CarruselComponent,
    MedicosPorEspecialidadComponent,
    FormularioComponent,
    FooterComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {}