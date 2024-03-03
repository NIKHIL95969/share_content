import {connect} from '@/dbConfig/dbConfig';
import ContentPost from '@/models/contentModel';
import { NextRequest, NextResponse } from 'next/server';


connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const { content} = reqBody;

        const createContent = new ContentPost({
            content
        });
        const savedPost = await createContent.save();
        
        if(!savedPost){
            return NextResponse.json({error: 'Unable to create post'}, {status: 400});
        }

        return NextResponse.json({message: 'Post saved successfully'}, {status: 200},);

    } catch (error: any) {
        return NextResponse.json( {error: error.message}, {status: 500});
    }
}