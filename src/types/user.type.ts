import { t, Static } from "elysia"
import { _register } from "./regis.type"

export const _profile = t.Object({
    ...t.Omit(_register, ['password']).properties,
    id: t.String(),
    introduction: t.Optional(t.String()),
    interest: t.Optional(t.String()),
    location: t.Optional(t.String()),
    age: t.Optional(t.String()),
    last_active: t.Optional(t.Date()),
    created_at: t.Optional(t.String()),
    updated_at: t.Optional(t.Date()),

})


export const _user = t.Object({
    ..._profile.properties,
    //follower: profile[]
    //fpllowing: profile[]
})


export type user = Static<typeof _user>
