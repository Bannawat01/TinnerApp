import Elysia from "elysia"
import { AuthMiddleWare, AuthPlayload } from "../middlewares/auth.middleware"
import { UserDto } from "../types/user.type"
import { UserService } from "../services/user.service"

export const UserController = new Elysia({
    prefix: '/api/user',
    tags: ['User']
})
    .use(UserDto)
    .use(AuthMiddleWare)

    .get('/all', () => {
        return {
            text: "Hello World"
        }
    }, {
        isSignIn: true,
    })

    .get('/', ({ query, Auth }) => {
        const user_id = (Auth.payload as AuthPlayload).id //get user_id from token
        return UserService.get(query, user_id) //get user by user_id
    }, {
        detail: { summary: 'Get user' },
        query: "pagination",
        response: "users",
        isSignIn: true,
    })