import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Cliente } from '../../clientes/cliente';
import { ClienteService } from '../../clientes/listarClientes/servicios/cliente.service';
import { CategoriaService } from '../../clientes/listarClientes/servicios/categoria.service';
import { Categoria } from '../../clientes/categoria';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = { id: 0, nombre: '', apellido: '', email: '', objCategoria: { id: 1 } };
  public categorias: Categoria[] = [];
  public titulo: string = "Componente formulario de creación";

  constructor(
    private clienteService: ClienteService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarCliente();
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
      if (this.categorias.length > 0 && (!this.cliente.objCategoria || !this.cliente.objCategoria.id)) {
        this.cliente.objCategoria = { id: this.categorias[0].id };
      }
    });
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.titulo = "Componente formulario de actualización";
        this.clienteService.getCliente(id).subscribe(
          (cliente) => {
            this.cliente = cliente;
            if (!this.cliente.objCategoria && this.categorias.length > 0) {
              this.cliente.objCategoria = { id: this.categorias[0].id };
            }
          }
        );
      }
    });
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes/listarClientes']);
        Swal.fire('Nuevo cliente', `El cliente ${this.cliente.nombre} ha sido creado con éxito!`, 'success');
      }
    );
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes/listarClientes']);
        Swal.fire('Cliente Actualizado', `El cliente ${this.cliente.nombre} ha sido actualizado con éxito!`, 'success');
      }
    );
  }

}
