import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT u.id_usuario, u.nombre, u.correo, 
             string_agg(r.nombre, ', ') as roles
      FROM usuarios u
      LEFT JOIN t_usuarios tu ON u.id_usuario = tu.id_usuario
      LEFT JOIN roles r ON tu.id_rol = r.id_rol
      GROUP BY u.id_usuario
    `);
    return NextResponse.json({ 
      success: true, 
      usuarios: result.rows 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}