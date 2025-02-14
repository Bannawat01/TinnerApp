import Elysia, { t } from "elysia"
import { AuthMiddleWare, AuthPlayload } from "../middlewares/auth.middleware"
import { UserDto } from "../types/user.type"
import { UserService } from "../services/user.service"
import { set } from "mongoose"

export const UserController = new Elysia({
    prefix: '/api/user',
    tags: ['User']
})
    .use(UserDto)
    .use(AuthMiddleWare)

    .get('/all', () => {
        return {
            user: [
                { id: '1', name: 'John Snow' },
                { id: '2', name: 'Steve Minecraft' },
            ]
        }
    })

    .get('/username', ({ params: { username } }) => {
        return UserService.getByUserName(username)
    }, {
        detail: { summary: 'Get user by username' },
        // query: t.Object({
        //     username: t.String()
        // }),
        response: "user",
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

    .patch('/', async ({ body, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPlayload).id //get user_id from token
            await UserService.updateProfile(body, (Auth.payload as AuthPlayload).id)
            set.status = 204 //success
        } catch (error) {
            set.status = 400 //bad request
            if (error instanceof Error)
                throw new Error(error.message)
            set.status = 500 // internal server error
            throw new Error('Something went wrong, try agian later')
        }
    }, {
        detail: { summary: 'Update profile' },
        body: "update_profile",
        // response: "user",
        isSignIn: true,
    })