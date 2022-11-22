
const mongoose = require("mongoose");   
const bcrypt = require("bcrypt");
const User =  mongoose.model(process.env.USER_MODEL);
 

register = function (req, res) {
    console.log("User Register");
//genSalty
    bcrypt.genSalt(parseInt(process.env.NUMBER_OF_ROUNDS), function (err, saltValue) {
        if (err) {
            res.status(process.env.INTERNAL_SERVER_ERROR_STATUS_CODE);
            res.message = "Error";
        } else {
            bcrypt.hash(req.body.password, saltValue, function (err, password) {
                const newUser = {
                    name: req.body.name,
                    username: req.body.username,
                    password: passwordHash
                };
                User.create(newUser, function (err, result) {
                    const response = { 
                        status: parseInt(process.env.OK_STATUS_CODE), 
                        message: result };
                    if (err) {
                        console.log(process.env.ADD_ONE_ERROR_MESSAGE);
                        response.status = parseInt(process.env.SYSTEM_ERROR_STATUS_CODE);
                        response.message = err;
                    }
                    else{
                        response.message = "Login Successful, create JWT and send";
                        const token = jwt.sign({username: newUser.username}, process.env.JWT_PASSWORD, {expiresIn: 3600});
                        response.message = {success:true, token:token};
                    }
                    res.status(response.status).json(response.message);
                })
            });
            //const passwordHash = bcrypt.hashSync(req.body.password, salt);           
        }

    });
    //const salt = bcrypt.genSaltSync(10);//10 is Number of Rounds

}

loginSync = function (req, res) {

    console.log("login");
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username: username }).exec(function (err, result) {
        const response = { status: parseInt(process.env.OK_STATUS_CODE), message: result };

        if (err) {
            console.log("Error: " + err);
            response.status = process.env.NTERNAL_SERVER_ERROR_STATUS_CODE;
            response.message = "Error";//don't give exact information
        } else {
            if (!user) {
                console.log("Error finding user" + err);
                response.status = process.env.INPUT_ERROR_STATUS_CODE;
                response.message = "Incorrect user or password.";//don't give exact information
            } else {
                console.log("User found check password");
                bcrypt.compareSync(password, user.password, function (error, passwordMatch) {
                    if (err) {
                        console.log("Error bcrypt compare" + err);
                    } else {
                        if (!passwordMatch) {
                            console.error("Password incorrect for user" + username);
                            response.status = process.env.INPUT_ERROR_STATUS_CODE;
                            response.message = "Incorrect username or password."
                        } else {
                            response.status = process.env.OK_STATUS_CODE;
                            response.message = "Login successful"
                            //After login, create JasonWebToken and send
                        }
                    }
                    res.status(response.status).json(response.message);
                });

                //const passwordMatch = bcrypt.compareSync(password, user.password);
               
            }

        }
        if(response.status!== process.env.OK_STATUS_CODE){
        res.status(response.status).json(response.message);
    }
    });
}

login = function (req, res) {

    console.log("login");
    const username = req.body.username;
    const password = req.body.password;
    Users.findOne({ username: username }).exec(function (err, result) {
        const response = { status: parseInt(process.env.SUCCESS_STATUS_CODE), message: result };

        if (err) {
            console.log("Error: " + err);
            response.status = process.env.NTERNAL_SERVER_ERROR_STATUS_CODE;
            response.message = "Error";//don't give exact information
        } else {
            if (!User) {
                console.log("Error finding user" + err);
                response.status = process.env.INPUT_ERROR_STATUS_CODE;
                response.message = "Incorrect user or password.";//don't give exact information
            } else {
                console.log("User found check password");
                bcrypt.compareSync(password, user.password, function (error, passwordMatch) {
                    if (err) {

                    } else {

                    }
                });

                //const passwordMatch = bcrypt.compareSync(password, user.password);
                if (!passwordMatch) {
                    console.error("Password incorrect for user" + username);
                    response.status = process.env.INPUT_ERROR_STATUS_CODE;
                    response.message = "Incorrect username or password."
                } else {
                    response.status = process.env.OK_STATUS_CODE;
                    response.message = "Login successful"
                }
            }

        }
        res.status(response.status).json(response.message);
    });
}


/****************************************PROMISES**********************************/

_checkUserExists = function (req, res) {
    console.log("Check User Exists");
    const username = req.body.username;
    User.findOne
}


_checkPassword = function (req, res) {
    console.log("check password");
    const username = req.body.username;
    const password = req.body.password;
    Users.findOne
}

_generatetoken = function (req, res) { 
    const token = jwt.sign({username: newUser.username}, process.env.JWT_PASSWORD, {expiresIn: 3600});
    response.message = {success:true, token:token};
}

_debugLog=function(message){
    if(JSON.parse(process.env.DEBUG_FLAG)){
        console.log(message);
    }
}


login = function(req,res){

    _debogLog("login called");

    const response = _createDefaultResponse();

 User.findOne({ username: username})
     .then((user) => _checkUserExists(user,response))
     .then((user) => _checkPassword(req.body.password,response))
     .then((user) => _generatetoken(user,response))
     .catch((error) => _handleError(error,response))
     .finally(() => _sendResponse(res,response));
}

/****************************************PROMISES**********************************/


module.exports = {
    addOne: register,
    login: login
}


