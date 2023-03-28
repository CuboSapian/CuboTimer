const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Session = require("../models/Session");
const { body, validationResult } = require('express-validator');

// ROUTE 1 : Fetch User Solves : GET : "/api/sesn/fetchSolveInfo"
router.get('/fetchSolveInfo', fetchuser, async (req, res) => {
    const sessions=await Session.find({ user: req.user.id});
    res.json(sessions);
})


// ROUTE 2 : Add a Solve : POST : "/api/sesn/addTime"
router.post('/addTime', fetchuser, async (req, res) => {
    try {
        const { tos, scramble } = req.body;
        const time = new Session({
            scramble, tos, user: req.user.id
        })
        const savedTime = await time.save()
        res.json(savedTime);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 3 : Delete a Solve : DELETE : "/api/sesn/delTime"
router.delete('/delTime/:id', fetchuser, async (req, res) => {
    try {
        // Find the Time to be delete and delete it
        let time = await Session.findById(req.params.id);
        if (!time) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Session
        if (time.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        time = await Session.findByIdAndDelete(req.params.id)
        res.json({ time });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// // Route 4 : Delete a Session : DELETE : "/api/sesn/delSesn"
// router.delete('/delSesn', fetchuser, async (req, res) => {
//     try {
//         // Find the Times to be delete and delete it
//         const { session } = req.body;
//         let time = await Session.find({ user: req.user.id, session: session });
//         if (!time) { return res.status(404).send("Not Found") }
//         // res.json({ time });

//         // Allow deletion only if user owns this Session
//         for (let i = 0; i < time.size; i++) {
//             if (time[i].user.toString() !== req.user.id) {
//                 return res.status(401).send("Not Allowed");
//             }
//         }

//         time = await Session.deleteMany({ user: req.user.id, session: session })
//         res.json({ time });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// })


module.exports = router
