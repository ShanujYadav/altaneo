import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOURI}`)
        console.log(`MongoDB Connecte---- ${connectionInstance.connection.host}`);
    } catch (e) {
        console.log('Mongo DB Error ---', e)
        process.exit(1)
    }
}
export default connectDB;