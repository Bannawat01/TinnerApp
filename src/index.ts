import { Elysia, t } from "elysia"
import { example } from "./controllers/example.controller"

const app = new Elysia()
  .use(example)
  .listen(8000)

console.log(
  `🦊😉 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
