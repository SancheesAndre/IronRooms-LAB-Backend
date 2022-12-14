import { Router } from 'express'
import Room from '../models/Room.model.js'
import Review from '../models/Review.model.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import attachCurrentUser from '../middlewares/attachCurrentUser.js';

const roomRouter = Router()

reviewRouter.post('/rooms/:roomId/reviews', isAuthenticated, attachCurrentUser, async (req, res) => {
    try {
        const { roomId } = req.params 

        const room = await Room.findOne({_id: roomId})

        if(room.userId.toString() === req.currentUser._id.toString()) {
            return res.status(401).json({message: 'You are not authorized to post a review'})
        }

        const review = {
            userId: req.currentUser._id,
            roomId,
            ...req.body
        }

        const newReview = await Review.create(review)
        return res.status(201).json(newReview)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error.' })
    }
})

// reviewRouter.get('/rooms', async (req, res) => {
//     try {
//         const rooms = await Room.find({})
//         return res.status(200).json(rooms)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({ error: 'Internal server error.' })
//     }
// })

// reviewRouter.get('/rooms/:id', async (req, res) => {
//     try {
//         const { id } = req.params

//         const room = await Room.findOne({_id: id})

//         return res.status(200).json(room)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({ error: 'Internal server error.' })
//     }
// })



// reviewRouter.put('/rooms/:id', isAuthenticated, attachCurrentUser, async (req, res) => {
//     try {
//         const { id } = req.params
//         const room = await Room.findOne({_id: id})

        

//         if (room.userId.toString() !== req.currentUser._id.toString()) {
//             return res.status(401).json({ error: 'You are not authorized to edit this room.' })
//         }

//         const roomData = req.body
//         const updatedRoom = await Room.findByIdAndUpdate(id, roomData, { new: true })
//         return res.status(200).json(updatedRoom)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({ error: 'Internal server error.' })
//     }
// })

// reviewRouter.delete('/rooms/:id', isAuthenticated, attachCurrentUser, async (req, res) => {
//     try {
//         const { id } = req.params
//         const room = await Room.findOne({_id: id})


//         if (room.userId.toString() !== req.currentUser._id.toString()) {
//             return res.status(401).json({ error: 'You are not authorized to delete this room.' })
//         }

//         await Room.findByIdAndDelete(id)
//         return res.status(204).json()
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({ error: 'Internal server error.' })
//     }
// })


export default reviewRouter