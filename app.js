import path from "path";

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

//all routes imported here


//multer file storage
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
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


app.use(helmet());
app.use(compression());

//central error handler here
app.use(centralError);

//sync with database
app.listen(port);
