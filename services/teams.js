const TeamModel = require("../models/teams")

class Teams{
    //crear equipo con el id del líder separado y también dentro de los miembros del equipo
    async create(idLeader,data){
        const newTeam = {...data,idLeader,members:[{_id:idLeader,role:"leader"}]}
        const team = await TeamModel.create(newTeam)

        return team
    }

    //si entre los miembros está ese usuario, le devuelve la info del equipo junto con la de los miembros y el líder, pero con populate se le especifíca que de los miembros y el líder traiga sólo el nombre y el correo
    async listByUser(idUser){
        //const teams = await TeamModel.find({members:idUser}).populate("members","name email").populate("idLeader","name email")
        const teams = await TeamModel.find({members:{  $elemMatch:{_id:idUser} }}).populate("members._id","name email").populate("idLeader","name email")

        return teams
    }

    async addMember(idTeam,idNewMember){
        const result = await TeamModel.updateOne({_id:idTeam},{$push:{members:{_id:idNewMember}}})
        return result
    }

    async changeRole(idTeam,idMember,newRole){
        const result = await TeamModel.updateOne({_id:idTeam},{$set:{"members.$[el].role":newRole}},{arrayFilters:[{"el._id":idMember}]})
        return result
    }
    async deleteMember(idTeam,idMember){
        const result = await TeamModel.updateOne({_id:idTeam},{$pull:{"members.$[el].role":newRole}},{arrayFilters:[{"el._id":idMember}]})
        return result
    }
}


module.exports = Teams