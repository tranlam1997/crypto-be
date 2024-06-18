import Elysia from "elysia";

export const airDrops = new Elysia({ prefix: '/airdrops' })
    .get('/', () => 'Sign in')