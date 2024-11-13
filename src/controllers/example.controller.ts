import Elysia, { t } from "elysia"

export const example = new Elysia()
    .get("/", () => "Hello Elysia")
    .post("/about", ({ body }) => {
        return {
            id: '1',
            msg: 'hello' + body.name
        }
    }, {
        body: t.Object({
            name: t.String()
        })
    })