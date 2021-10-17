const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.get('/',(req,res) => {
    Exercise.find().then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json('Error : ' + err));
})

router.post('/add', (req,res) => {
    const username = req.body.username;
    const description = req.body.description;
    const date = req.body.date;
    const duration = req.body.duration;

    const newExercise = new Exercise({
        username : username,
        duration : duration,
        description : description,
        date : date,
    });

    newExercise.save().then(() => {res.send('Exercise added success')})
    .catch((err) => res.status(400).json('Error : ' + err));

})


router.delete('/:id', (req,res) => {
    Exercise.findByIdAndDelete(req.params.id).then(() => res.send('Delete Success'))
    .catch((err) => res.status(400).json('Error : ' + err));
})

router.get('/:id',(req,res) => {
    Exercise.findById(req.params.id)
    .then((ex) => res.json(ex))
    .catch((err) => res.status(400).json('Error : '+ err));
})

router.patch('/update/:id', (req,res) => {
   const newEx = {
       username : req.body.username,
       description : req.body.description,
       duration : req.body.duration,
       date : req.body.date,
   }
    Exercise.findByIdAndUpdate(req.params.id,newEx)
    .then(() => res.send('Updated success'))
    .catch((err) => res.status(400).json('Error : ' + err));
});

module.exports = router;