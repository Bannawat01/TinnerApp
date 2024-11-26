import { updateProfile, user, userPagination } from "../types/user.type"

export const UserService = {
    get: function (pagination: userPagination, user_id: string): Promise<userPagination> {
        throw new Error("Not implemented")
    },

    getByUserName: function (username: string): Promise<user> {
        throw new Error("Not implemented")
    },

    updateProfile: function (newProfile: updateProfile, user_id: string): Promise<user> {
        throw new Error("Not implemented")
    }
}