import express from "express"
import cookieParser from "cookie-parser"
import path from "path"
import {fileURLToPath} from "url"

const app = express()



const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)





app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")


app.get("/", (req, res) => {
    res.send("hello world")
})

app.listen(3000, () => {
    console.log("Server running")
})

