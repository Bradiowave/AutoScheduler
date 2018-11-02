const router = require('express').Router();

const Users = require('./userModel.js');

//base route == '/api/users'
router.route('/')
    .post((req, res) => {
        const newUser = (new Users(
            { offline, online }
            = req.body ));

        newUser.save()
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "There was an error saving the user to the database." })
            })
    })
    .get((req, res) => {
        Users.find()
            .then(users => {
                res.json(users)
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The users could not be retrieved." })
            })
    })

router.route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Users.findById(id)
            .then(user => {
                if (user === null) {
                    res.status(404).json({ errorMessage: `The user with id ${id} does not exist.` })
                    return;
                }
                res.json(user)
            })
            .catch(err => {
                if (err.name === "CastError") {
                    res.status(404).json({ errorMessage: `The user with id ${id} does not exist.` })
                    return;
                }
                res.status(500).json({ errorMessage: "The user could not be retrieved." })
            })
    })
    .delete((req, res) => {
        const { id } = req.params;
        Users.findByIdAndDelete(id)
            .then(user => {
                if (user === null) {
                    res.status(404).json({ errorMessage: `The user with id ${id} does not exist to delete.` })
                    return;
                }
                res.json(user)
            })
            .catch(err => {
                if (err.name === "CastError") {
                    res.status(404).json({ errorMessage: `The user with id ${id} does not exist to delete.` })
                    return;
                }
                res.status(500).json({ errorMessage: "The user could not be deleted." })
            })
    })
    .put((req, res) => {
        const { id } = req.params;
        const newUser = ( 
            { offline, online }
            = req.body );
        Users.findByIdAndUpdate(id, newUser, {new: true})
            .then(user => {
                if (user === null) {
                    res.status(404).json({ errorMessage: `The user with id ${id} does not exist to update.` })
                    return;
                }
                res.json(user)
            })
            .catch(err => {
                if (err.name === "CastError") {
                    res.status(404).json({ errorMessage: `The user with id ${id} does not exist to update.` })
                    return;
                }
                res.status(500).json({ errorMessage: "The user could not be updated." })
            })
    })

module.exports = router;