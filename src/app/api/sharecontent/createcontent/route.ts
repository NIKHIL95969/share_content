import { connect } from '@/dbConfig/dbConfig';
import ContentPost from '@/models/contentModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

async function handler(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { content } = reqBody;
        const { searchParams } = new URL(request.url);
        const temp = searchParams.get("temp") === "true";
        let filter: any = {};
        if (temp) {
            const now = new Date();
            const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            filter.createdAt = { $gte: yesterday };
            filter.temp = true;
        }
        const createContent = new ContentPost({ content, temp });
        const savedPost = await createContent.save();
        if (!savedPost) {
            return NextResponse.json({ error: 'Unable to create post' }, { status: 400 });
        }
        const allpost = await ContentPost.find(filter, null, { sort: { createdAt: -1 } });
        return NextResponse.json({ message: 'Post saved successfully', allpost }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export const POST = handler;