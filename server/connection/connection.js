const mongoose = require('mongoose')
const uri = process.env.URI
const connect = async()=>{
try{
    let res = await mongoose.connect(uri)
    console.log('MongoDb connected')
}
catch(error){
  console.log('Something error occured')
}
}

connect()