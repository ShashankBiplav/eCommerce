import path from "path";
import fs from "fs";

import express from "express";
import multer from "multer";
import sequelize from "./utilities/database.js";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== 'production') {
dotenv.config();
}

const port = process.env.PORT || 3300;

const app = express();

//all error controllers imported here
import {corsError} from "./middleware/error-handlers/cors-error.js";
import {centralError} from "./middleware/error-handlers/central-error.js";

//all models imported here
import Administrator from "./models/administrator.js";
import User from "./models/user.js";
import Product from "./models/product.js";
import UserDetail from "./models/user-detail.js";
import AdminProduct from "./models/admin-product.js";

//all routes imported here
import authenticationRoutes from "./routes/authentication-routes.js";


//multer file storage
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = "./images";
    //this will create the folder if not exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname.toString().replace(/\s/g, '-'));
  },
});

//multer file filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
//defining absolute path of current WORKDIR
const __dirname = path.resolve();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

// multer configuration
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single('image')
);

app.use('/images', express.static(path.join(__dirname, 'images')));

//handle cors error
app.use(corsError);

//all routes entrypoint here
app.use('/auth',authenticationRoutes);


app.use(helmet());
app.use(compression());

//central error handler here
app.use(centralError);

//sync with database
// sync with database
sequelize
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
