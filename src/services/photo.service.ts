import mongoose from "mongoose"
import { Cloudinary } from "../configs/cloudinary.config"
import { ImageHelper } from "../helpers/image.helper"
import { Photo } from "../models/photo.model"
import { photo } from "../types/photo.type"
import { User } from "../models/user.model"

export const PhotoService = {
    //todo: implement this
    upload: async function (file: File, user_id: string): Promise<photo> {
        const buffer = await file.arrayBuffer()
        const isFileValid = ImageHelper.isImage(buffer)
        if (!isFileValid) {
            throw new Error('Image must be a jpeg or png')
        }
        const base64 = Buffer.from(buffer).toString('base64')
        const dataURI = `data:${file.type};base64,${base64}`
        const cloudPhoto = await Cloudinary.uploader.upload(dataURI, {
            folder: 'user-images',
            resource_type: 'auto',
            transformation: [{
                width: 500,
                height: 500,
                crop: 'fill', // crop the image to fit the dimensions exactly
                gravity: 'face' // focus on the face when cropping
            }]
        })

        if (!cloudPhoto.public_id || !cloudPhoto.secure_url) {
            throw new Error('Failed to upload image try again')
        }
        const uploadPhoto = new Photo({
            user: new mongoose.Types.ObjectId(user_id),
            url: cloudPhoto.secure_url,
            public_id: cloudPhoto.public_id
        })

        await uploadPhoto.save()
        await User.findByIdAndUpdate(
            user_id,
            { $push: { photos: uploadPhoto._id } }
        )
        return uploadPhoto.toPhoto()
    },

    getPhotos: async function (user_id: string): Promise<photo[]> {
        const photoDocs = await Photo.find({ user: user_id }).exec() //ตัด query ด้วย exec()/ promise ออก
        const photos = photoDocs.map(doc => doc.toPhoto())
        return photos
    },

    delete: async function (photo_id: string): Promise<boolean> {
        const doc = await Photo.findById(photo_id).exec()
        if (!doc) {
            throw new Error(`photo ${photo_id} not existing!`)

        }
        await User.findByIdAndUpdate(doc.user, {
            $pull: { photos: photo_id }
        })
        await Photo.findByIdAndDelete(photo_id)
        await Cloudinary.uploader.destroy(doc.public_id)
        return true
    },

    setAvatar: async function (photo_id: string, user_id: string): Promise<boolean> {
        await Photo.updateMany(
            { user: new mongoose.Types.ObjectId(user_id) }, //เอาทุกภาพของ user นี้เท่านั้น
            { $set: { isAvatar: false } }
        ) //เปลี่ยนทุกภาพของ user นี้เป็น false

        const result = await Photo.findByIdAndUpdate(photo_id,
            { $set: { isAvatar: true } },
            // { new: true } //return ค่าที่เปลี่ยนแล้ว ปล.ไม่ใส่ก็ได้
        )
        return !!result //ถ้า result มีค่าจะ return true ถ้าไม่มีค่าจะ return false
    }

}