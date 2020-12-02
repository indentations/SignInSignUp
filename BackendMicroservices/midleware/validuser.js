module.exports = function (req, res, next) {
    const { email, password } = req.body;

    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,5})+$/.test(userEmail);
    }

    if (req.path === "/register") {

        if (![email].every(Boolean) && ![password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        }
        
        else if (![email].every(Boolean) && [password].every(Boolean)) {
            return res.status(401).json("Missing Email");
        }
        else if ((([password].length === 0) || !([password].every(Boolean))) && !validEmail(email) ) {
            return res.status(401).json("Missing Password and Invalid Email Pattern");
        }
        else if (validEmail(email) && (([password].length == 0) || !([password].every(Boolean)))) {
            return res.status(401).json("Missing Password");
        }

        else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email Pattern");
        }
    }

    else if (req.path === "/login") {

        if (![email].every(Boolean) && ![password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        }
        
        else if (![email].every(Boolean) && [password].every(Boolean)) {
            return res.status(401).json("Missing Email");
        }
        else if ((([password].length === 0) || !([password].every(Boolean))) && !validEmail(email) ) {
            return res.status(401).json("Missing Password and Invalid Email Pattern");
        }
        else if (validEmail(email) && (([password].length == 0) || !([password].every(Boolean)))) {
            return res.status(401).json("Missing Password");
        }

        else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email Pattern");
        }
    }

    next();
};
 