import mongoose from "mongoose"

const username = Bun.env.MONGGO_DB_USER || 'bannawatra'
const password = Bun.env.MONGO_DB_PASS || 'your_pass'
const db_name = Bun.env.MONGGODB_NAME || 'Tinner_app'

const uri = `mongodb+srv://${username}:${password}@cluster0.akwct.mongodb.net/?retryWrites=true&w=majority&appName=${db_name}`

export const MongoDB = {
    connect: async function () {
        try {
            await mongoose.connect(uri)
            console.log('MongoDB is connected')
        } catch (error) {
            console.error('MongoDB is not connected')
            console.error(error)
        }
    }
}
