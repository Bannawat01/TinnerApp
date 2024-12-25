import Elysia from "elysia"
import { AuthMiddleWare, AuthPlayload } from "../middlewares/auth.middleware"
import { UserDto } from "../types/user.type"
import { LikeService } from "../services/like.service"

export const LikeController = new Elysia({
    prefix: "api/like",
    tags: ["Like"]
})

    .use(AuthMiddleWare)
    .use(UserDto)

    .put('/', async ({ body: { target_id }, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPlayload).id
            await LikeService.toggleLike(user_id, target_id)
            set.status = "No Content"
        } catch (error) {
            set.status = "Bad Request"
            throw new Error("Something went wrong ,try again broooo!!")
        }
    }, {
        detail: { summary: "Like photo" },
        isSignIn: true,
        body: "target_id",
    })

    .get('/followers', async ({ Auth, query }) => {
        const user_id = (Auth.payload as AuthPlayload).id
        const user_pagination = await LikeService.getFollowers(user_id, query)
        return user_pagination
    }, {
        detail: { summary: "Get followers" },
        isSignIn: true,
        query: "pagination",
        response: "users"
    })
    .get('/following', async ({ Auth, query }) => {
        const user_id = (Auth.payload as AuthPlayload).id
        const user_pagination = await LikeService.getFollowing(user_id, query)
        return user_pagination
    }, {
        detail: { summary: "Get following" },
        isSignIn: true,
        query: "pagination",
        response: "users"
    })




