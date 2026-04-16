INSERT INTO categorias (id, nombreCategoria) VALUES (1, 'Bronce');
INSERT INTO categorias (id, nombreCategoria) VALUES (2, 'Plata');
INSERT INTO categorias (id, nombreCategoria) VALUES (3, 'Oro');

INSERT INTO clientes (nombre, apellido, email, createAt, idCategoria) VALUES 
('Juan', 'Perez', 'juan@unicauca.edu.co', '2025-01-22', 1);

INSERT INTO clientes (nombre, apellido, email, createAt, idCategoria) VALUES 
('Catalina', 'Lopez', 'catalina@unicauca.edu.co', '2025-03-22', 2);

INSERT INTO clientes (nombre, apellido, email, createAt, idCategoria) VALUES 
('Sandra', 'Sanchez', 'sandra@unicauca.edu.co', '2025-06-22', 3);


INSERT INTO clientes (nombre, apellido, email, createAt, idCategoria) VALUES 
('Andres', 'Perez', 'andres@unicauca.edu.co', '2025-04-22', 1);

INSERT INTO medicos (nombre, apellido, email, estado) VALUES
('Laura', 'Mendez', 'laura.mendez@hospital.com', TRUE);

INSERT INTO franjas (horaInicio, horaFin, fecha, estado, idMedico) VALUES
('07:00:00', '07:30:00', '2026-04-10', 'DISPONIBLE', 1);

