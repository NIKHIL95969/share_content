import {connect} from '@/dbConfig/dbConfig';
import ContentPost from '@/models/contentModel';
import { NextRequest, NextResponse } from 'next/server';


connect();

export async function GET(request: NextRequest, response: NextResponse){
    try {
        console.log("Hit the server for getContent")
        
        // const ipAddress = request.headers.get('x-forwarded-for') || "";
        // console.log("ip address is", ipAddress)

        const data = await ContentPost.find({}, null, { sort: { createdAt: -1 } });
        console.log(data)

        return NextResponse.json({message: 'Data fetched successfully', data}, {status: 200},);
    } catch (error: any) {
        return NextResponse.json( {error: error.message}, {status: 500});
    }
}