import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Slide {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})
export class CarruselComponent implements OnInit, OnDestroy {
  slides: Slide[] = [
    {
      image: 'assets/1.png',
      title: '🩺 Consulta General con 20% de descuento',
      description: 'Válido durante todo el mes. ¡Agenda tu cita hoy!'
    },
    {
      image: 'assets/2.png',
      title: '🧠 Evaluación Neurológica Gratuita',
      description: 'Para nuevos pacientes. Cupos limitados.'
    },
    {
      image: 'assets/3.png',
      title: '🍎 Plan Nutrición y Dietética Terapéutica',
      description: 'Primera consulta con descuento especial del 30%.'
    }
  ];

  currentSlideIndex = 0;
  private autoPlayInterval: any;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Cambiar slide cada 3 segundos
  }

  nextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlideIndex = index;
  }
}
