import mongoose from "mongoose"

const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"kelimeoyunu"

    })
    .then(()=>{
        console.log("Database succeded connect.")
    })
    .catch(err=>{
        console.log(err)
    })
}

export {dbConnection}