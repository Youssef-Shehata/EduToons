import {connectToDatabase,sql} from '../../../../dbConfig';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { pathname } = new URL(request.url);
  const id = Number(pathname.split('/').pop()); // Extract the id from the URL

  const pool = await connectToDatabase();
  try {
    const result = await pool.request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM teachers where id = @id');
    return new Response(JSON.stringify(result.recordset), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Database query failed', details: err }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


export async function DELETE(request) {
    const { pathname } = new URL(request.url);
    const id = Number(pathname.split('/').pop()); // Extract the id from the URL

  const pool = await connectToDatabase();
  try {
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM teachers WHERE id = @id');
    return new Response(JSON.stringify({ message: 'Data deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Database deletion failed', details: err }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

  
export async function handler(request) {
    switch (request.method) {
        case 'GET':
        return GET(request);
        case 'POST':
        return POST(request);
        case 'PUT':
        return PUT(request);
        case 'DELETE':
        return DELETE(request);
        default:
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}