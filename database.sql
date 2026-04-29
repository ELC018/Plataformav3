-- =========================================
-- ROLES
-- =========================================
CREATE TABLE IF NOT EXISTS roles (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

-- =========================================
-- USUARIOS
-- =========================================
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(100) UNIQUE,
    contrasena TEXT
);

-- =========================================
-- RELACION USUARIO-ROL (N:N)
-- =========================================
CREATE TABLE IF NOT EXISTS t_usuarios (
    id_usuario INT,
    id_rol INT,
    PRIMARY KEY (id_usuario, id_rol),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

-- =========================================
-- PERMISOS
-- =========================================
CREATE TABLE IF NOT EXISTS permisos (
    id_permiso SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE
);

-- =========================================
-- RELACION ROL-PERMISO (N:N)
-- =========================================
CREATE TABLE IF NOT EXISTS rol_permiso (
    id_rol INT,
    id_permiso INT,
    PRIMARY KEY (id_rol, id_permiso),
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
    FOREIGN KEY (id_permiso) REFERENCES permisos(id_permiso)
);

-- =========================================
-- MODULOS
-- =========================================

-- GALERIA
CREATE TABLE IF NOT EXISTS galeria (
    id_imagen SERIAL PRIMARY KEY,
    titulo VARCHAR(100),
    url TEXT,
    id_usuario INT REFERENCES usuarios(id_usuario)
);

-- BIBLIOTECA
CREATE TABLE IF NOT EXISTS biblioteca (
    id_documento SERIAL PRIMARY KEY,
    titulo VARCHAR(100),
    archivo TEXT,
    id_usuario INT REFERENCES usuarios(id_usuario)
);

-- CHAT GLOBAL
CREATE TABLE IF NOT EXISTS chat_global (
    id_mensaje SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios(id_usuario),
    mensaje TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CHAT IA
CREATE TABLE IF NOT EXISTS chat_ia (
    id_consulta SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios(id_usuario),
    pregunta TEXT,
    respuesta TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- EVALUACION DOCENTE
CREATE TABLE IF NOT EXISTS evaluacion_docente (
    id_evaluacion SERIAL PRIMARY KEY,
    id_estudiante INT REFERENCES usuarios(id_usuario),
    id_docente INT REFERENCES usuarios(id_usuario),
    calificacion INT,
    comentario TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ANUNCIOS
CREATE TABLE IF NOT EXISTS anuncios (
    id_anuncio SERIAL PRIMARY KEY,
    titulo VARCHAR(100),
    contenido TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT REFERENCES usuarios(id_usuario)
);

-- =========================================
-- INSERTAR ROLES
-- =========================================
INSERT INTO roles (nombre) VALUES
('jefa_carrera'),
('administrador'),
('docente'),
('estudiante'),
('egresado'),
('publico')
ON CONFLICT (nombre) DO NOTHING;

-- =========================================
-- INSERTAR PERMISOS
-- =========================================
INSERT INTO permisos (nombre) VALUES
('ver_galeria'),
('subir_galeria'),
('ver_biblioteca'),
('subir_biblioteca'),
('usar_chat_global'),
('usar_chat_ia'),
('evaluar_docente'),
('ver_resultados_evaluacion'),
('ver_anuncios'),
('crear_anuncios'),
('editar_anuncios')
ON CONFLICT (nombre) DO NOTHING;

-- =========================================
-- USUARIOS DE PRUEBA
-- =========================================
INSERT INTO usuarios (nombre, correo, contrasena) VALUES
('Juan Estudiante', 'est@demo.com', '123'),
('Maria Docente', 'doc@demo.com', '123'),
('Admin Sistema', 'admin@demo.com', '123')
ON CONFLICT (correo) DO NOTHING;

-- =========================================
-- ASIGNAR ROLES A USUARIOS
-- =========================================
-- Estudiante (id_usuario=1, id_rol=4)
INSERT INTO t_usuarios VALUES (1, 4) ON CONFLICT DO NOTHING;

-- Docente (id_usuario=2, id_rol=3)
INSERT INTO t_usuarios VALUES (2, 3) ON CONFLICT DO NOTHING;

-- Admin (id_usuario=3, id_rol=2)
INSERT INTO t_usuarios VALUES (3, 2) ON CONFLICT DO NOTHING;

-- =========================================
-- PERMISOS POR ROL
-- =========================================

-- ESTUDIANTE (rol 4)
INSERT INTO rol_permiso
SELECT 4, id_permiso FROM permisos
WHERE nombre IN (
'ver_galeria',
'ver_biblioteca',
'usar_chat_global',
'usar_chat_ia',
'evaluar_docente',
'ver_anuncios'
) ON CONFLICT DO NOTHING;

-- DOCENTE (rol 3)
INSERT INTO rol_permiso
SELECT 3, id_permiso FROM permisos
WHERE nombre IN (
'ver_galeria',
'subir_galeria',
'ver_biblioteca',
'usar_chat_global',
'ver_resultados_evaluacion',
'crear_anuncios'
) ON CONFLICT DO NOTHING;

-- ADMIN (rol 2) - TODOS LOS PERMISOS
INSERT INTO rol_permiso
SELECT 2, id_permiso FROM permisos
ON CONFLICT DO NOTHING;

-- PUBLICO (rol 6)
INSERT INTO rol_permiso
SELECT 6, id_permiso FROM permisos
WHERE nombre IN (
'ver_galeria',
'ver_anuncios'
) ON CONFLICT DO NOTHING;