CREATE DATABASE rincon_cacao;
USE rincon_cacao;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    apellido_paterno VARCHAR(30) NOT NULL,
    apellido_materno VARCHAR(30) NOT NULL,
    domicilio VARCHAR(50) NOT NULL,
    fecha_nacimiento VARCHAR(10) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    contrasennia LONG NOT NULL,
    rfc VARCHAR(13) NOT NULL,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estatus INT(1) DEFAULT 1 NOT NULL -- 1. Activo, 2. Inactivo
);

CREATE TABLE proveedor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    apellido_paterno VARCHAR(30) NOT NULL,
    apellido_materno VARCHAR(30) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    empresa VARCHAR(100) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estatus INT(1) DEFAULT 1 NOT NULL -- 1. Activo, 2. Inactivo
);

CREATE TABLE materia_prima (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_proveedor INT NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    duracion INT(3) NOT NULL, -- dias
    stock INT(4) NOT NULL,
    cantidad_minima INT(1) NOT NULL,
    medida INT(1) NOT NULL, -- 1. Kilogramo, 2. Gramo, 3. Litro, 4. Mililitro, 5. Unidad, 6. Paquete, 7. Bolsa, 8. Onza
    precio DOUBLE NOT NULL,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estatus INT(1) DEFAULT 1 NOT NULL, -- 1. Activo, 2. Inactivo
    FOREIGN KEY (id_proveedor) REFERENCES proveedor(id)
);

CREATE TABLE compra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL,
    id_usuario INT NOT NULL, -- empleado que hace la compra
    total DOUBLE NOT NULL,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estatus INT(1) DEFAULT 1 NOT NULL, -- 1. Activo, 2. Inactivo
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

CREATE TABLE detalle_compra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_compra INT NOT NULL,
    id_materia_prima INT NOT NULL,
    id_proveedor INT NOT NULL,
    medida INT(1) NOT NULL, -- 1. Kilogramo, 2. Gramo, 3. Litro, 4. Mililitro, 5. Unidad, 6. Paquete, 7. Bolsa, 8. Onza
    cantidad INT NOT NULL,
    subtotal DOUBLE NOT NULL,
    FOREIGN KEY (id_compra) REFERENCES compra(id),
    FOREIGN KEY (id_materia_prima) REFERENCES materia_prima(id),
    FOREIGN KEY (id_proveedor) REFERENCES proveedor(id)
);

SELECT * FROM usuario;
SELECT * FROM proveedor;
SELECT * FROM materia_prima;
SELECT * FROM compra;
SELECT * FROM detalle_compra;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'CITLALLI123';


