const Models = require('../models/index');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets');
const User = Models.User;

const authController = {
    login(req, res){
        // Login User

        // get credentials
        const credentials = req.body;

        // find user in db
        if(credentials.username && credentials.password){
            const username = credentials.username;
            const password = credentials.password;

            User.findOne({username: username}).exec((err,user) => {
                console.log(err)
                if(err){
                    res.status(404).json({error:[`User with username ${username} not found`]});
                }
                if(user == null){
                    res.status(404).json({error:[`User with username ${username} not found`]});                    
                }

                if(user.password === credentials.password){
                    var expires = moment().add('days', 7).valueOf();
                    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
                    var payload = {
                        id: user.id,
                        expires: expires
                    };
                    var token = jwt.sign(payload, secrets.PASSPORT_JWT_SECRET);
                    res.json({
                        message: "ok",
                        token: token,
                        expires: expires
                    });
                } else {
                    res.status(401).json({errors:["passwords did not match"]});
                }
            });
        }else{
            res.status(422).json({errors: ["Invalid request"]});
        }
    },
};

module.exports = authController;