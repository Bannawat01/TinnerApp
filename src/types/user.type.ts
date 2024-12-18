import Elysia, { t, Static } from "elysia"
import { _register } from "./regis.type"
import { _pagination, CreatePagteination, pagination } from "./pagination.type"
import { _photo } from "./photo.type"

export const _profile = t.Object({
    ...t.Omit(_register, ['password']).properties,
    id: t.String(),
    introduction: t.Optional(t.String()),
    interest: t.Optional(t.String()),
    location: t.Optional(t.String()),
    age: t.Optional(t.String()),
    last_active: t.Optional(t.Date()),
    created_at: t.Optional(t.Date()),
    updated_at: t.Optional(t.Date()),

    photos: t.Optional(t.Array(_photo)),
})


export const _user = t.Object({
    ..._profile.properties,
    followers: t.Optional(t.Array(t.Union([t.Partial(_profile), t.String()]))), //ทำให้ _profile เป็น optional ได้
    following: t.Optional(t.Array(t.Union([t.Partial(_profile), t.String()])))
})

const _userPagination = t.Object({
    ...pagination.properties,
    username: t.Optional(t.String()),
    min_age: t.Optional(t.Number()),
    max_age: t.Optional(t.Number()),
    looking_for: t.Optional(t.Union([t.Literal('male'), t.Literal('female'), t.Literal('all')])),
    gender: t.Optional(t.Union([t.Literal('male'), t.Literal('female'), t.Literal('all')])),
})

export const _updateProfile = t.Omit(_profile, ['id', 'username', 'updated_at', 'created_at', 'last_active', 'age'])
export const _userPaginator = CreatePagteination(_user, _userPagination)

export const UserDto = new Elysia().model({
    pagination: t.Optional(_userPagination),
    update_profile: _updateProfile,
    users: _userPaginator,
    user: _user,
    target_id: t.Object({ target_id: t.String() })

})

export type updateProfile = Static<typeof _updateProfile>
export type userPagination = Static<typeof _userPagination>
export type userPaginator = Static<typeof _userPaginator>
export type user = Static<typeof _user>
