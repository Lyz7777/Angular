import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Medico } from '../medico';
import { Franja } from '../franja';
import { MedicoService } from '../servicios/medico.service';

@Component({
  selector: 'app-franjas-medico',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './franjas-medico.component.html',
  styleUrl: './franjas-medico.component.css'
})
export class FranjasMedicoComponent implements OnInit {
  idMedico = 0;
  medico: Medico | null = null;
  fechaConsulta = new Date().toISOString().slice(0, 10);
  franjas: Franja[] = [];
  nuevaFranja: Franja = {
    fecha: new Date().toISOString().slice(0, 10),
    horaInicio: '07:00',
    horaFin: '07:30',
    estado: 'DISPONIBLE'
  };

  constructor(
    private medicoService: MedicoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idMedico = Number(params['id']);
      if (this.idMedico) {
        this.cargarMedico();
        this.cargarFranjas();
      }
    });
  }

  cargarMedico(): void {
    this.medicoService.getMedico(this.idMedico).subscribe(medico => (this.medico = medico));
  }

  cargarFranjas(): void {
    this.medicoService.getFranjasByFecha(this.idMedico, this.fechaConsulta).subscribe(franjas => {
      this.franjas = franjas;
    });
  }

  guardarFranja(): void {
    this.nuevaFranja.fecha = this.fechaConsulta;
    this.medicoService.crearFranja(this.idMedico, this.nuevaFranja).subscribe({
      next: () => {
        Swal.fire('Franja creada', 'La franja se registro correctamente.', 'success');
        this.cargarFranjas();
      },
      error: () => {
        Swal.fire('Error', 'No se pudo registrar la franja. Revisa horario y traslapes.', 'error');
      }
    });
  }
}
