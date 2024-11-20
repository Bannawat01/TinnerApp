import mongoose from "mongoose"

const username = Bun.env.MONGGO_DB_USER || 'bannawatra'
const password = Bun.env.MONGGO_DB_PASSWORD || 'your_password'
const db_name = Bun.env.MONGGODB_NAME || 'Tinner_app'

const uri = `mongodb + srv://${username}:${password}@cluster0.akwct.mongodb.net/?retryWrites=true&w=majority&appName=${db_name}`

export const MongoDB = {
    connect: async function () {
        await mongoose.connect(uri)
    }
}