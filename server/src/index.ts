import server from "./app"
import { connectToDatabase } from "./utils/dbAuth"
const PORT = process.env.PORT || 3030

server.listen(PORT, () => {
    connectToDatabase();
    console.log(`Server active on port ${PORT}`)
} )