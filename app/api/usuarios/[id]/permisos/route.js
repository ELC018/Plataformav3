import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request, { params }) {
  const { id } = params;
  
  try {
    const result = await pool.query(`
      SELECT p.nombre
      FROM permisos p
      JOIN rol_permiso rp ON p.id_permiso = rp.id_permiso
      JOIN t_usuarios tu ON rp.id_rol = tu.id_rol
      WHERE tu.id_usuario = $1
    `, [id]);
    
    return NextResponse.json({ 
      success: true, 
      usuario_id: id,
      permisos: result.rows.map(row => row.nombre)
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}