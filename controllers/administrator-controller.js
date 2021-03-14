//packages
import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';

//models
import Administrator from "../models/administrator.js";

import User from "../models/user.js";


//CONTROLLERS

//change administrator details
export const changeAdministratorDetails = async (req, res, next) => {
  const {name, email, password} = req.body;
  try{
  
  }catch (err) {
  
  }
};
