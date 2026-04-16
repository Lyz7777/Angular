import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Medico } from '../medico';
import { MedicoService } from '../servicios/medico.service';

@Component({
  selector: 'app-form-medico',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './form-medico.component.html',
  styleUrl: './form-medico.component.css'
})
export class FormMedicoComponent implements OnInit {
  medico: Medico = { id: 0, nombre: '', apellido: '', email: '', estado: true };
  titulo = 'Crear medico';

  constructor(
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarMedico();
  }

  cargarMedico(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = Number(params['id']);
      if (id) {
        this.titulo = 'Actualizar medico';
        this.medicoService.getMedico(id).subscribe(medico => (this.medico = medico));
      }
    });
  }

  guardar(): void {
    if (this.medico.id) {
      this.medicoService
        .update({
          id: this.medico.id,
          nombre: this.medico.nombre,
          apellido: this.medico.apellido,
          email: this.medico.email
        })
        .subscribe(() => {
          Swal.fire('Actualizado', 'Medico actualizado con exito.', 'success');
          this.router.navigate(['/medicos']);
        });
      return;
    }

    this.medicoService
      .create({
        nombre: this.medico.nombre,
        apellido: this.medico.apellido,
        email: this.medico.email
      })
      .subscribe(() => {
        Swal.fire('Creado', 'Medico creado con exito.', 'success');
        this.router.navigate(['/medicos']);
      });
  }
}
