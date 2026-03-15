import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  descripcionEspecialidad: string = '';
  mostrarDescripcion: boolean = false;

  descripciones: any = {
    terapia: 'La Terapia Neural regula el sistema nervioso mediante anestésicos locales.',
    quiropraxia: 'La Quiropraxia trata trastornos del sistema musculoesquelético.',
    fisioterapia: 'La Fisioterapia usa ejercicio y masaje para rehabilitar lesiones.',
    nutricion: 'La Nutrición diseña planes alimentarios personalizados.',
    cardiologia: 'La Cardiología trata enfermedades del corazón.',
    neurologia: 'La Neurología trata enfermedades del sistema nervioso.',
    pediatria: 'La Pediatría se ocupa de la salud de niños y adolescentes.',
    psicologia: 'La Psicología evalúa y trata trastornos mentales y emocionales.',
    traumatologia: 'La Traumatología trata lesiones del sistema musculoesquelético.',
    oftalmologia: 'La Oftalmología trata enfermedades de los ojos.'
  };

  mostrarEspecialidad(clave: string) {
    this.descripcionEspecialidad = this.descripciones[clave] || '';
    this.mostrarDescripcion = true;
  }
}
