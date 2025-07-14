import { httpServer } from "./App/app.ts";

const PORT = 3000;
const HOST = 'localhost'

httpServer.listen(
    PORT,
    ()=> console.log(`server running on http://${HOST}:${PORT}`)
)