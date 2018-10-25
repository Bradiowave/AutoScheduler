const router = require('express').Router();

const Hobbies = require('./hobbyModel.js');

//base route == '/api/hobbies'
router.route('/')
    .post((req, res) => {
        const newHobby = (new Hobbies(
            { name, progress, targetTime, resetEvery, onDays, addsToBreak, isActive, autoCompletes }
            = req.body ));

        newHobby.save()
            .then(hobby => {
                res.status(201).json(hobby)
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "There was an error saving the hobby to the database." })
            })
    })
    .get((req, res) => {
        Hobbies.find()
            .then(hobbies => {
                res.json(hobbies)
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The hobbies could not be retrieved." })
            })
    })

router.route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Hobbies.findById(id)
            .then(hobby => {
                if (hobby === null) {
                    res.status(404).json({ errorMessage: `The hobby with id ${id} does not exist.` })
                    return;
                }
                res.json(hobby)
            })
            .catch(err => {
                if (err.name === "CastError") {
                    res.status(404).json({ errorMessage: `The hobby with id ${id} does not exist.` })
                    return;
                }
                res.status(500).json({ errorMessage: "The hobby could not be retrieved." })
            })
    })
    .delete((req, res) => {
        const { id } = req.params;
        Hobbies.findByIdAndRemove(id)
            .then(hobby => {
                if (hobby === null) {
                    res.status(404).json({ errorMessage: `The hobby with id ${id} does not exist to delete.` })
                    return;
                }
                res.json(hobby)
            })
            .catch(err => {
                if (err.name === "CastError") {
                    res.status(404).json({ errorMessage: `The hobby with id ${id} does not exist to delete.` })
                    return;
                }
                res.status(500).json({ errorMessage: "The hobby could not be deleted." })
            })
    })
    .put((req, res) => {
        const { id } = req.params;
        const newHobby = (new Hobbies(
            { name, progress, targetTime, resetEvery, onDays, addsToBreak, isActive, autoCompletes }
            = req.body ));
        Hobbies.findByIdAndUpdate(id, newHobby, {new: true})
            .then(hobby => {
                if (hobby === null) {
                    res.status(404).json({ errorMessage: `The hobby with id ${id} does not exist to update.` })
                    return;
                }
                res.json(hobby)
            })
            .catch(err => {
                if (err.name === "CastError") {
                    res.status(404).json({ errorMessage: `The hobby with id ${id} does not exist to update.` })
                    return;
                }
                res.status(500).json({ errorMessage: "The hobby could not be updated." })
            })
    })

module.exports = router;