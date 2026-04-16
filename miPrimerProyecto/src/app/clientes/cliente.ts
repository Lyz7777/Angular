export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  createAt?: string;
  objCategoria: {
    id: number;
    nombre?: string;
  };
}

