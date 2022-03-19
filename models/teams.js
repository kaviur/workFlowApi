const {mongoose} = require('../config/db')

const {Schema} = mongoose

const teamSchema = new Schema({
    idLeader:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    name:String,
    img:String,
    description:String,
    members:[
        {
            _id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"users"
            },
            role:{
                type:String,
                enum:["editor","validator","normal","leader"],
                default:"normal"
            }
        }
    ]
})

const TeamModel = mongoose.model("teams",teamSchema)

module.exports = TeamModel