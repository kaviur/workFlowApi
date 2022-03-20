const express = require("express")
const { isRegular } = require("../middleware/auth")

const Teams = require("../services/teams")

function teams(app){
    const router = express.Router()
    app.use("/teams",router)

    const teamsService = new Teams()

    //ruta para listar los equipos a los que pertenece un usuario
    router.get("/",isRegular,async(req,res)=>{
        const teams = await teamsService.listByUser(req.user.id)
        return res.json(teams)
    })

    router.get("/:id",isRegular,async(req,res)=>{
        const team = await teamsService.get(req.params.id)
        return res.json(team)
    })

    //ruta para crear un equipo con el id del líder logueado
    router.post("/",isRegular,async (req,res)=>{
        const team = await teamsService.create(req.user.id,req.body)

        return res.json(team)
    })

    router.post("/addMember",async (req,res)=>{
        const team = await teamsService.addMember(req.body.idTeam,req.body.idNewMember)
        return res.json(team)
    })

    router.post("/changeRole",async (req,res)=>{
        const team = await teamsService.changeRole(req.body.idTeam,req.body.idMember,req.body.newRole)
        return res.json(team)
    })

    router.delete("/removeMember",async (req,res)=>{
        const team = await teamsService.deleteMember(req.body.idTeam,req.body.idMember)
        return res.json(team)
    })
}

module.exports = teams