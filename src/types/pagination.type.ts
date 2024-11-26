
import { Static, t, TSchema } from "elysia"

export const _pagination = t.Object({
    pageSize: t.Number(),
    current: t.Number(),
    length: t.Optional(t.Number()),
})

export type pagination = Static<typeof _pagination>

export function CreatePagteination<T extends TSchema, U extends TSchema>(itemType: T, paginatorType: U) {
    return t.Object({
        items: t.Array(itemType),
        pagination: paginatorType
    })
}