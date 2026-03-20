import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  // Campos del formulario
  tipoIdentificacion = '';
  numeroIdentificacion = '';
  nombres = '';
  apellidos = '';
  correo = '';
  genero = '';
  fechaNacimiento = '';

  // Errores
  errores: { [key: string]: string } = {};

  // Regex correo
  private regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  validarCampo(campo: string): void {
    switch (campo) {
      case 'numeroIdentificacion':
        this.errores['numeroIdentificacion'] = this.numeroIdentificacion.trim()
          ? '' : 'Ingrese el número de identificación.';
        break;
      case 'nombres':
        this.errores['nombres'] = this.nombres.trim()
          ? '' : 'Ingrese sus nombres.';
        break;
      case 'apellidos':
        this.errores['apellidos'] = this.apellidos.trim()
          ? '' : 'Ingrese sus apellidos.';
        break;
      case 'correo':
        this.errores['correo'] = this.regexCorreo.test(this.correo)
          ? '' : 'Ingrese un correo electrónico válido.';
        break;
    }
  }

  validarFormulario(): void {
    this.errores = {};
    let valido = true;

    // Validaciones
    if (!this.tipoIdentificacion) {
      this.errores['tipoIdentificacion'] = 'Seleccione un tipo de identificación.';
      valido = false;
    }
    if (!this.numeroIdentificacion.trim()) {
      this.errores['numeroIdentificacion'] = 'Ingrese el número de identificación.';
      valido = false;
    }
    if (!this.nombres.trim()) {
      this.errores['nombres'] = 'Ingrese sus nombres.';
      valido = false;
    }
    if (!this.apellidos.trim()) {
      this.errores['apellidos'] = 'Ingrese sus apellidos.';
      valido = false;
    }
    if (!this.regexCorreo.test(this.correo)) {
      this.errores['correo'] = 'Ingrese un correo electrónico válido.';
      valido = false;
    }
    if (!this.genero) {
      this.errores['genero'] = 'Seleccione un género.';
      valido = false;
    }

    if (valido) {
      console.log('Formulario válido. Datos:', {
        tipoIdentificacion: this.tipoIdentificacion,
        numeroIdentificacion: this.numeroIdentificacion,
        nombres: this.nombres,
        apellidos: this.apellidos,
        correo: this.correo,
        genero: this.genero,
        fechaNacimiento: this.fechaNacimiento
      });
      alert('¡Cita agendada exitosamente!');
      this.limpiarFormulario();
    }
  }

  onSubmit(): void {
    this.validarFormulario();
  }

  limpiarFormulario(): void {
    this.tipoIdentificacion = '';
    this.numeroIdentificacion = '';
    this.nombres = '';
    this.apellidos = '';
    this.correo = '';
    this.genero = '';
    this.fechaNacimiento = '';
    this.errores = {};
  }
}

