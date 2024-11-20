import jwt from "@elysiajs/jwt"

const jwtConfig = jwt({
    name: 'jwt',
    secret: Bun.env.JWT_SECRET || 'Murasaki',
})