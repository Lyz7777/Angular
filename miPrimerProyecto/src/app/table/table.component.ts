import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../clientes/listarClientes/servicios/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00c2ff',
      cancelButtonColor: '#7b4bff',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          () => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            Swal.fire(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            );
          }
        );
      }
    });
  }
}
