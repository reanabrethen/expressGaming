const express = require('express')
const router = express.Router()
const uuidv4 = require('uuid').v4

let games = [
    {
        id: "adowb1b3bb",
        game: "League of Legends",
        description: "League of Legends is a team-based game with over 140 champions to make epic plays with."
    },
    {
        id: "kd7b9ks2nda",
        game: "PlayerUnknown's Battlegrounds",
        description: "PLAYERUNKNOWN'S BATTLEGROUNDS is a last-man-standing shooter being developed with community feedback."
    }
    ]


router.get('/get-all-games', (req,res)=>{
        res.json(games)
})

router.get('/get-game-by-id/:id', (req, res)=>{
        const {id} = req.params
        const foundGameId = games.find(game => {return game.id === id })
        if(foundGameId){
            res.json(foundGameId)
        }else{
            res.json({message: "The game with the id does not exist, please check id"})
        }
})

router.post('/create-new-game', (req,res)=>{
      const {game, description} = req.body
      const newGame = {
            id: uuidv4(),
            game,
            description
      }
    if(game === undefined || description === undefined){
        res.json({message: "cannot leave text area blank"})
    }if(newGame.game === game.id){
        res.json({message: "Game already exsists, cannot add game"})
    }else{
        games.push(newGame)
        res.json(games)
    }     
        // const {game} = req.body
        // const {description} = req.body
        // const {id} = req.parms
        // const newGameArr = games.filter(game => game.id === id)
        // const newGame = {
        //     game,
        //     id: uuidv4(),
        //     description
        // }
        // if(newGameArr){
        // games.push(newGame)
        // res.json(games)
        // }else{
        //     res.json({message: "Game already exists, cannot add game"})
        // }
})

router.put('/update-game/:id', (req,res)=>{
    const {id} = req.params
    const {game, description} = req.body
    const gameUpdated = games.find(game => game.id === id)
    if(!gameUpdated){
        res.json({message: "game not found, cannot update"})
    }else{
        if(game || description){
            if(game){
                gameUpdated.game = game
            }
            if(description){
                gameUpdated.description = description
            }
            res.json({games})
        }
    }
})

router.delete('/delete-game/:id', (req, res)=>{
    const {id} = req.params
    const gameFound = games.filter(game => game.id !== id)
    if(gameFound.length === games.length){
        res.json({message: 'game not found, cannot delete'})
    }else{
        games = gameFound
        res.json({games})
    }
})



module.exports = router