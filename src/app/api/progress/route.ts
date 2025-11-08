import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/utils/db';
import { ProgressUpdate } from '@/app/models';

export async function GET() {
  try {
    await connectToDatabase();
    const updates = await ProgressUpdate.find().sort({ completedAt: -1 });
    return NextResponse.json(updates);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch progress updates' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { category, title, description, links } = await req.json();
    await connectToDatabase();
    const update = await ProgressUpdate.create({ category, title, description, links });
    return NextResponse.json(update);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create progress update' }, { status: 500 });
  }
}