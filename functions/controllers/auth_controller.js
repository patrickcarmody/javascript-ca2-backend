const User = require('../models/user_schema');

const loginRequired = (req, res, next) => {
    if(req.user){
        next()
    }
    else{
        console.log('Unauthorized user.')
        res.status(401).json({
            "error": "Unauthorised user, please log in (Bearer Token)"
        });
    }
};

const adminRequired = (req, res, next) => {
    if(req.user){
        let id = req.user._id;
        User.findById(id)
            .then((data) => {
                if(data.admin) {
                    next()
                }
                else {
                    console.log('User is not admin');
                    res.status(401).json({
                        "error": "Admin privelages required for this action"
                    });
                }
            });
    }
    else{
        res.status(401).json({
            "error": "Unauthorised user, please log in"
        })
    }
    
}

module.exports = {
    loginRequired,
    adminRequired
};