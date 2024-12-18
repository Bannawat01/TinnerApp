import Elysia from "elysia"
import { AuthMiddleWare, AuthPlayload } from "../middlewares/auth.middleware"
import { UserDto } from "../types/user.type"
import { LikeService } from "../services/like.service"

export const LikeController = new Elysia({
    prefix: "api/photo",
    tags: ["Photo"]
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



