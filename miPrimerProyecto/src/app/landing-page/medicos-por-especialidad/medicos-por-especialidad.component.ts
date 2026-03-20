import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Medico {
  nombre: string;
  especialidad: string;
  subespecialidad: string;
  imagen: string;
  frase: string;
}

@Component({
  selector: 'app-medicos-por-especialidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medicos-por-especialidad.component.html',
  styleUrl: './medicos-por-especialidad.component.css'
})
export class MedicosPorEspecialidadComponent implements OnInit {

  descripcionVisible = false;
  descripcionTexto = '';
  medicosFiltrados: Medico[] = [];

  descripciones: { [key: string]: string } = {
    terapia:      'La Terapia Neural regula el sistema nervioso mediante anestésicos locales aplicados en puntos específicos del cuerpo.',
    quiropraxia:  'La Quiropraxia trata trastornos del sistema musculoesquelético, especialmente de la columna, mediante ajustes manuales.',
    fisioterapia: 'La Fisioterapia usa ejercicio, masaje y técnicas físicas para rehabilitar lesiones y mejorar la movilidad.',
    nutricion:    'La Nutrición y Dietética Terapéutica diseña planes alimentarios personalizados para tratar y prevenir enfermedades.',
    cardiologia:  'La Cardiología se enfoca en el diagnóstico y tratamiento de enfermedades del corazón y sistema circulatorio.',
    neurologia:   'La Neurología estudia y trata enfermedades del sistema nervioso central y periférico.',
    pediatria:    'La Pediatría se ocupa de la salud integral de niños y adolescentes desde el nacimiento.',
    psicologia:   'La Psicología clínica evalúa y trata trastornos mentales, emocionales y del comportamiento.',
    traumatologia:'La Traumatología se especializa en lesiones del sistema musculoesquelético, como fracturas y esguinces.',
    oftalmologia: 'La Oftalmología diagnostica y trata enfermedades de los ojos y problemas de visión.'
  };

  medicos: Medico[] = [
    {
      nombre: 'Dra. Cambelly Anthonia',
      especialidad: 'Cardiología',
      subespecialidad: 'Cardiología Intervencionista',
      imagen: 'assets/Doctora1.png',
      frase: '"Tu corazón es mi prioridad."'
    },
    {
      nombre: 'Dr. Joe McLister',
      especialidad: 'Neurología',
      subespecialidad: 'Neurología Clínica',
      imagen: 'assets/Doctor2.png',
      frase: '"La mente sana mueve el mundo."'
    },
    {
      nombre: 'Dr. Eddie Vembar',
      especialidad: 'Oftalmología',
      subespecialidad: 'Cirugía Refractiva',
      imagen: 'assets/Doctor3.png',
      frase: '"Ver bien es vivir mejor."'
    },
    {
      nombre: 'Dra. Talia Wender',
      especialidad: 'Traumatología',
      subespecialidad: 'Ortopedia Deportiva',
      imagen: 'assets/Doctora4.png',
      frase: '"Recupera tu movimiento."'
    },
    {
      nombre: 'Dra. Itzel Manguir',
      especialidad: 'Pediatría',
      subespecialidad: 'Neonatología',
      imagen: 'assets/Doctora5.png',
      frase: '"Cada niño merece lo mejor."'
    },
    {
      nombre: 'Dr. John Smith',
      especialidad: 'Fisioterapia',
      subespecialidad: 'Fisioterapia Deportiva',
      imagen: 'assets/Doctor6.png',
      frase: '"Comprometido con tu recuperación."'
    },
    {
      nombre: 'Dr. Gael Merk',
      especialidad: 'Nutrición',
      subespecialidad: 'Dietética Terapéutica',
      imagen: 'assets/Doctor7.png',
      frase: '"Un alimento sano alarga la vida."'
    },
    {
      nombre: 'Dra. Alli Samthara',
      especialidad: 'Psicología',
      subespecialidad: 'Terapia Cognitivo-Conductual',
      imagen: 'assets/Doctora8.png',
      frase: '"La salud mental importa."'
    },
    {
      nombre: 'Dr. Ronny Trhankers',
      especialidad: 'Oftalmología',
      subespecialidad: 'Cirugía',
      imagen: 'assets/Doctor9.png',
      frase: '"Ojos sanos, vida saludable."'
    },
    {
      nombre: 'Dra. Alli Samthara',
      especialidad: 'Traumatología',
      subespecialidad: 'Terapia Física',
      imagen: 'assets/Doctora10.png',
      frase: '"Primero tu, y luego el mundo."'
    }
  ];

  ngOnInit(): void {
    // Cargar todos los médicos al iniciar
    this.medicosFiltrados = this.medicos;
  }

  mostrarEspecialidad(clave: string): void {
    this.descripcionTexto = this.descripciones[clave] || 'Especialidad no disponible';
    this.descripcionVisible = true;

    // Mapeo de claves a especialidades
    const especialidadMap: { [key: string]: string } = {
      terapia: 'Terapia Neural',
      quiropraxia: 'Quiropraxia',
      fisioterapia: 'Fisioterapia',
      nutricion: 'Nutrición',
      cardiologia: 'Cardiología',
      neurologia: 'Neurología',
      pediatria: 'Pediatría',
      psicologia: 'Psicología',
      traumatologia: 'Traumatología',
      oftalmologia: 'Oftalmología'
    };

    const especialidad = especialidadMap[clave];
    if (especialidad) {
      this.medicosFiltrados = this.medicos.filter(m =>
        m.especialidad.toLowerCase() === especialidad.toLowerCase()
      );
    }
  }
}

