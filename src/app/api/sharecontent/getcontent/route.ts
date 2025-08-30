import {connect} from '@/dbConfig/dbConfig';
import ContentPost from '@/models/contentModel';
import { NextRequest, NextResponse } from 'next/server';


connect();

export async function POST(request: NextRequest, response: NextResponse){
    try {
        const { searchParams } = new URL(request.url);
        const temp = searchParams.get("temp");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;
        let filter: any = {};
        if(temp){
            const now = new Date();
            const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            filter.createdAt = { $gte: yesterday };
            filter.temp = true
        }

        // const ipAddress = request.headers.get('x-forwarded-for') || "";
        // console.log("ip address is", ipAddress)

        

        const data = await ContentPost.find(filter, null, { sort: { createdAt: -1 } }).skip(skip).limit(limit);
        const total = await ContentPost.countDocuments(filter);

        return NextResponse.json({message: 'Data fetched successfully', data, total}, {status: 200},);
    } catch (error: any) {
        return NextResponse.json( {error: error.message}, {status: 500});
    }
}
