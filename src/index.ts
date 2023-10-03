// import express, { Application, Request, Response} from 'express';
// const app: Application = express()
// const PORT: number = 5003;

// app.use("/bidbattle/v1/", (req: Request, res: Response) => {
//     res.send("please work karo yaar")
// });


// app.listen(PORT, () => console.log(`Server running in port : ${PORT}`));


// package imports
import express, {Application, Request, Response} from "express";
import mongoose from 'mongoose';
import multer from "multer";

// route imports
import auth_routes from "./routes/auth";
import object_routes from "./routes/objects_route";
import display_routes from "./routes/display_route";

// port details
const app: Application = express();
const port: number = 5005;
const upload = multer();

app.use(express.urlencoded({extended: true}));
app.use(express.json())
// app.use(upload.array(object_routes))


// url routes
app.use('/bidbattle/auth', auth_routes )
app.use('/bidbattle/object', object_routes )
app.use('/bidbattle/display', display_routes )

// to check if server is running
app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
  });

