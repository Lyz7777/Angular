CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombreCategoria VARCHAR(255)
);

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    email VARCHAR(255),
    createAt DATE,
    idCategoria INT,
    FOREIGN KEY (idCategoria) REFERENCES categorias(id)
);

CREATE TABLE medicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    estado BOOLEAN NOT NULL
);

CREATE TABLE franjas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    horaInicio TIME NOT NULL,
    horaFin TIME NOT NULL,
    fecha DATE NOT NULL,
    estado VARCHAR(20) NOT NULL,
    idMedico INT NOT NULL,
    FOREIGN KEY (idMedico) REFERENCES medicos(id),
    CONSTRAINT chk_estado_franja CHECK (estado IN ('DISPONIBLE', 'NO_DISPONIBLE', 'OCUPADA'))
);









