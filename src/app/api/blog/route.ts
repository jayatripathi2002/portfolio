import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/utils/db';
import { BlogPost } from '@/app/models';

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content, tags } = await req.json();
    await connectToDatabase();
    const post = await BlogPost.create({ title, content, tags });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}