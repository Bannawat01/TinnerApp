import mongoose, { RootFilterQuery } from "mongoose"
import { updateProfile, user, userPagination, userPaginator } from "../types/user.type"
import { IUserDocument } from "../interfaces/user.interface"
import { QueryHelper } from "../helpers/query.helper"
import { User } from "../models/user.model"

export const UserService = {
    _get: async function (pagination: userPagination, user_id: string): Promise<userPaginator> {
        let filter: RootFilterQuery<IUserDocument> = {
            _id: { $nin: new mongoose.Types.ObjectId(user_id) },
            $and: QueryHelper.parseUserQuery(pagination)
        }
        const query = User.find({ filter }).sort({ last_active: -1 }) //descendent order 🟣/ ascendent order
        const skip = pagination.pageSize * (pagination.currentPage - 1) //skip the first n elements
        query.skip(skip).limit(pagination.pageSize)

        // const docs = await query.exec()
        // const totle = await User.countDocuments(filter).exec() //เอาไปใส่เป็น length ของข้อมูล
        const [doc, totle] = await Promise.all([
            query.exec(),
            User.countDocuments(filter).exec()
        ])

        pagination.length = totle
        return {
            pagination: pagination,
            items: doc.map(doc => doc.toUser())
        }
    },
    get get() {
        return this._get
    },
    set get(value) {
        this._get = value
    },

    getByUserName: function (username: string): Promise<user> {
        throw new Error("Not implemented")
    },

    updateProfile: function (newProfile: updateProfile, user_id: string): Promise<user> {
        throw new Error("Not implemented")
    }
}