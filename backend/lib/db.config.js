import mongoose from 'mongoose'

const Connect= ()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('mongoose is connected')
})
}

export default Connect