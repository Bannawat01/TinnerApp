import Elysia, { t } from "elysia"

export const example = new Elysia()
    .get("/", () => "Hello World", {
        detail: {
            tags: ["example"],
            summary: "Get Hello World",
            description: "eieiei"
        }
    })
    .post("/about", ({ body }) => {
        return {
            id: '1',
            msg: 'hello' + body.name
        }
    }, {
        body: t.Object({
            name: t.String()
        }),
        detail: {
            tags: ["example"],
            summary: "About",
            description: "eieiei"
        }
    })