import { Elysia } from "elysia";
import { AirDropsController } from "./controllers/airdrops";
import cors from "@elysiajs/cors";
import serverTiming from "@elysiajs/server-timing";
import { setUpSwagger } from "./shared/swagger";

const app = new Elysia()
.use(setUpSwagger())
.use(cors())
.use(serverTiming())
.use(AirDropsController)
.get("/ping", () => "Hello Elysia").listen(3000);

console.log(`Server running at http://${app.server?.hostname}:${app.server?.port}`)