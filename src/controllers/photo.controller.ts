import Elysia, { error, t } from "elysia"
import { ImageHelper } from "../helpers/image.helper"
import { PhotoDto } from "../types/photo.type"
import { AuthMiddleWare, AuthPlayload } from "../middlewares/auth.middleware"
import { PhotoService } from "../services/photo.service"

// const _imageDB: { id: string, data: string, type: string }[] = []

export const PhotoController = new Elysia({
    prefix: "api/photo",
    tags: ["Photo"]
})
    .use(PhotoDto)
    .use(AuthMiddleWare)
    .post('/', async ({ body: { file }, set, Auth }) => {
        console.log('muhahaha')
        const user_id = (Auth.payload as AuthPlayload).id
        try {
            return await PhotoService.upload(file, user_id)
        } catch (error) {
            set.status = 400 //bad request
            if (error instanceof Error) {
                throw error
            }
            throw new Error("Something went wrong ,try again broooo!!")
        }
    }, {
        detail: { summary: "Upload photo" },
        body: "upload",
        response: "photo",
        isSignIn: true
    })




// .get('/:id', ({ params: { id }, set }) => {
//     const image = _imageDB.find(image => image.id === id)
//     if (image === undefined) {
//         throw error(406)
//     }
//     const buffer = Buffer.from(image.data, 'base64') // ย้อนสร
//     set.headers['content-type'] = image.type
//     set.headers['content-disposition'] = 'attachment; filename="free-fire"'
//     return buffer
// })

// .post('/', async ({ body: { imgFile }, set }) => {
//     const buffer = await imgFile.arrayBuffer() // Convert file to buffer
//     const isImage = await ImageHelper.isImage(buffer) // Check if file is an image
//     if (!isImage) {
//         set.status = 406
//         throw new Error("Image file must be either a jpeg or png")
//     }
//     const id = _imageDB.length.toString() // Generate id
//     const base64 = Buffer.from(buffer).toString('base64') // คือ การแปลง buffer ให้เป็น base64 string
//     const type = imgFile.type
//     _imageDB.push({ id, data: base64, type }) // Save image to database
//     // console.log(_imageDB)

//     set.headers['content-type'] = imgFile.type
//     set.headers['content-disposition'] = 'attachment; filename="free-fire"'
//     return buffer
// }, {
//     detail: { summary: "Upload photo" },
//     body: t.Object({
//         imgFile: t.File()
//     })
// })