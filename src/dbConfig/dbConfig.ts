import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log('MongoDB connected successfully')
        })

        connection.on('error', (err)=>{
            console.log( 'MongoDB connection error. Please connect MongoDB'+ err)
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong');
        console.log(error)
    }
}