import {connectToDatabase,sql} from '../../../dbConfig';

export async function GET() {
  const pool = await connectToDatabase();
  try {
    const result = await pool.request().query('SELECT * FROM teachers');
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


export async function POST(req) {
  const {url,status,teacherid} = await req.json();
  const pool = await connectToDatabase();
  try {
    await pool.request()
      .input('url', sql.VarChar, url)
      .input('status', sql.VarChar, status)
      .input('teacherid', sql.Int, teacherid)
      .query("INSERT into teachers (url,status,teacherid) VALUES (@url,@status,@teacherid)"
        // ,[name,img,role]
      );
    return new Response(JSON.stringify({ message: 'Data inserted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Database insertion failed', details: err }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request) {
  const { id, data, column } = await request.json();
  const pool = await connectToDatabase();
  try {
    await pool.request()
      .input('id', sql.Int, id)
      .input('data', sql.VarChar, data)
      .query(`UPDATE teachers SET ${column} = @data WHERE id = @id`);
    return new Response(JSON.stringify({ message: 'Data updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Database update failed', details: err }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request) {
  // const {idd} = await request.params.json();
  // console.log(idd)
  const { id } = await request.json();
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