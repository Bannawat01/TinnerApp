import Elysia, { t } from "elysia"
import { ImageHelper } from "../helpers/image.helper"

const _imageDB: { id: string, data: string, type: string }[] = []

export const PhotoController = new Elysia({
    prefix: "api/photo",
    tags: ["Photo"]
})

    .post('/', async ({ body: { imgFile }, set }) => {
        const filename = `${Date.now()}-${imgFile.name}`
        const filepath = `public/uploads${filename}`
        const buffer = await imgFile.arrayBuffer() // Convert file to buffer
        const isImage = await ImageHelper.isImage(buffer) // Check if file is an image
        if (!isImage) {
            set.status = 406
            throw new Error("Image file must be either a jpeg or png")
        }
        await Bun.write(filepath, buffer)

        return `https://localhost:8000/img/${filename}`
    }, {
        detail: { summary: "Upload photo" },
        body: t.Object({
            imgFile: t.File()
        })
    })