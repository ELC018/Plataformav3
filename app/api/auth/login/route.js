import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { correo, contrasena } = await request.json();

    // Buscar usuario por correo
    const result = await pool.query(
      `SELECT u.id_usuario, u.nombre, u.correo, u.contrasena,
              array_agg(r.nombre) as roles
       FROM usuarios u
       LEFT JOIN t_usuarios tu ON u.id_usuario = tu.id_usuario
       LEFT JOIN roles r ON tu.id_rol = r.id_rol
       WHERE u.correo = $1
       GROUP BY u.id_usuario`,
      [correo]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 401 }
      );
    }

    const usuario = result.rows[0];

    // Verificar contraseña
    if (contrasena !== usuario.contrasena) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }

    // Obtener permisos del usuario
    const permisosResult = await pool.query(
      `SELECT p.nombre
       FROM permisos p
       JOIN rol_permiso rp ON p.id_permiso = rp.id_permiso
       JOIN t_usuarios tu ON rp.id_rol = tu.id_rol
       WHERE tu.id_usuario = $1`,
      [usuario.id_usuario]
    );

    const permisos = permisosResult.rows.map(p => p.nombre);

    // Crear token JWT
    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        roles: usuario.roles,
        permisos: permisos
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      success: true,
      token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        roles: usuario.roles,
        permisos: permisos
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}