import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json({
      success: true,
      usuario: {
        id: decoded.id,
        nombre: decoded.nombre,
        correo: decoded.correo,
        roles: decoded.roles,
        permisos: decoded.permisos
      }
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Token inválido' },
      { status: 401 }
    );
  }
}