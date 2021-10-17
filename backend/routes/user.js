const router = require('express').Router();

let User = require('../models/user.model');

router.get('/', (req,res) => {
    User.find().
    then(users => res.json(users)).
    catch(err => res.status(400).json('error : ' + err));
})

router.post('/add', (req,res) => {
    const userName = req.body.username;
    const newUser = User({username : userName});
    newUser.save().then(() => res.send('User added'))
    .catch(err => res.status(400).json('Error : ' + err));
});

module.exports = router;