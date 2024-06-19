import { Elysia } from "elysia";
import { airDrops } from "./controllers/airdrops";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
import serverTiming from "@elysiajs/server-timing";

const app = new Elysia().use(swagger({
    documentation: {
        info: {
            title: 'Airdrop Documentation',
            version: '1.0.0',
            description: 'API for managing airdrop campaigns and distributions',
            contact: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                url: 'https://example.com',
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT',
            },
            termsOfService: "No Copyright"
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },

}))
.use(cors())
.use(serverTiming())
.use(airDrops)
.get("/", () => "Hello Elysia").listen(3000);
console.log(`Server running at http://${app.server?.hostname}:${app.server?.port}`)