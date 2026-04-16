import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Medico } from '../medico';
import { MedicoService } from '../servicios/medico.service';

@Component({
  selector: 'app-listar-medicos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-medicos.component.html',
  styleUrl: './listar-medicos.component.css'
})
export class ListarMedicosComponent implements OnInit {
  medicos: Medico[] = [];

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(): void {
    this.medicoService.getMedicos().subscribe(medicos => (this.medicos = medicos));
  }

  eliminar(medico: Medico): void {
    Swal.fire({
      title: '¿Eliminar medico?',
      text: `Se eliminara a ${medico.nombre} ${medico.apellido}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.medicoService.delete(medico.id).subscribe(() => {
          this.medicos = this.medicos.filter(m => m.id !== medico.id);
          Swal.fire('Eliminado', 'Medico eliminado correctamente.', 'success');
        });
      }
    });
  }
}
