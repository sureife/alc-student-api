const Models = require('../models/index');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets');
const User = Models.User;
const moment = require('moment');

const usersController = {
    show(req, res){
        // Return current user details
        var token = req.headers['authorization'].substring(7);

        token = jwt.decode(token,secrets.PASSPORT_JWT_SECRET)
        console.log(token);

        // Returns a single user
        // based on the passed in ID parameter
        User
            .findOne({_id: token.uid})
            .exec( (err, user) => {
                if(err){
                    res.status(404).json({error:[`User with username ${username} not found`]});
                }

                if(user == null){
                    res.status(404).json({error:[`User with id ${token.uid} not found`]});                    
                }

                res.json(user)
            } );
        
    },
    create(req, res){
        // Register User

        const requestBody = req.body;
        // Creates a new record from a submitted form
        const newUser = new User(requestBody);
        // and saves the record to
        // the database
        newUser.save((err, saved) => {
            // Returns the saved user
            // after a successful save
            if (err) {
                if(err["name"] && err["name"] === "ValidationError"){
                    res.status(422).json({errors: err});
                }
            }
            
            const expires = moment().add(7,'days').valueOf();

            console.log(saved._id);

            const payload = {
              uid: saved._id,
              exp: expires
            };

            const token = jwt.sign(payload, secrets.PASSPORT_JWT_SECRET);

            User
                .findOne({_id: saved._id})
                .exec((err, user) => {
                    res.json({
                        user: user,
                        token: token,
                        expires: expires
                    });
            });     
        });
    }
};

module.exports = usersController

