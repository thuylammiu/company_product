const fs = require("fs");
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'cs568-2023-09'

const COLLECTIONS = {
  USERS: "users",
  PRODUCTS: "products"
}
let dbMap = null;

function loadData(){
  for(let key in dbMap){
    try {
      let data = fs.readFileSync(`${key}.data`);
      dbMap[key] = JSON.parse(data);
    } catch (error) {
      console.log(error)
      console.log('Error: Reading file ')
    }
  }
}

function saveData(key){
  console.log(dbMap);
  fs.writeFile(`${key}.data`, JSON.stringify(dbMap[key]), err => {
    console.log(err);
  });
}


function init(){
  dbMap = {};
  for(let item of Object.values(COLLECTIONS)){
    dbMap[item] = [];
  }
  loadData();
  console.log('Data loaded')
}


function getDB(collectionName){
  if(!dbMap){
    init();
  }
  return dbMap[collectionName];
}

function auth(req, res, next){
  try {
    if(!req.headers.authorization){
      return res.send({success: false, error: "Please add the header's authorization to the request"});
    }
    const arr = req.headers.authorization.split(" ");
    if(arr.length !== 2){
      return res.send({success: false, error: "Please use the Bearer scheme"})
    }
    const token = arr[1];
    let decoded = jwt.verify(token, PRIVATE_KEY);
    req.email = decoded.email;
    next();
  } catch (error) {
    res.send({success: false, error: "Wrong token"});
  }
}

function createToken(user){
  const token = jwt.sign({email: user.email}, PRIVATE_KEY);
  return token;
}

module.exports = {
  getDB,
  saveData,
  COLLECTIONS,
  auth,
  createToken
}