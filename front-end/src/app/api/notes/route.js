import { NextResponse } from 'next/server';

export async function POST(req) {
    const body = await req.json();
    const { title, description, date } = body;
    console.log('Received note:', { title, description, date });
    return NextResponse.json({ message: body }, { status: 200 });
}