import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOURI}/${process.env.DB_NAME}`)
        console.log(`MongoDB Connected---- ${connectionInstance.connection.host}`);
    } catch (e) {
        console.log('Mongo DB Error ---', e)
        process.exit(1)
    }
}
export default connectDB