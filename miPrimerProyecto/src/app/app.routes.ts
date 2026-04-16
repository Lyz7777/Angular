import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { FormComponent } from './crearClientes/form/form.component';
import { ListarMedicosComponent } from './medicos/listar-medicos/listar-medicos.component';
import { FormMedicoComponent } from './medicos/form-medico/form-medico.component';
import { FranjasMedicoComponent } from './medicos/franjas-medico/franjas-medico.component';

export const routes: Routes = [
  { path: '', redirectTo: '/clientes/listarClientes', pathMatch: 'full' },
  { path: 'clientes/listarClientes', component: TableComponent },
  { path: 'clientes/form', component: FormComponent },
  { path: 'clientes/form/:id', component: FormComponent },
  { path: 'medicos', component: ListarMedicosComponent },
  { path: 'medicos/form', component: FormMedicoComponent },
  { path: 'medicos/form/:id', component: FormMedicoComponent },
  { path: 'medicos/:id/franjas', component: FranjasMedicoComponent }
];
