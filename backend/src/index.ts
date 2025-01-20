import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import rootRouter from "./api/index"
import cookieSession from "cookie-session";
import passport from "passport";
import "./middlewares/passportSetup"

const app = express();
const PORT = 3000

app.use(bodyParser.json());
app.use(cors());
app.use(
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      keys: ['yourRandomCookieKey'], // Use an environment variable for security
    })
  );

  app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1",rootRouter);

app.get('/',async(req:Request|any,res:Response|any)=>{
    
    return res.json({msg:"I am from Backend!"});
    
})

app.listen(PORT,()=>{
    console.log(`Server Started at PORT :${PORT}`)
})