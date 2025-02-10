import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/env.js";
import User from "../models/user.model.js";

// someonne is making a request get user details -> authorize middle -> verify -> if valid

const authorize = async (req, res, next) => {
    try{
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) return res.status(401).json({message: 'Unauthorized'});

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if (!user) return res.status(401).json({message: 'Unauthorized'});

        req.user = user;

        next();
    }catch(err){
        res.status(400).json({ message: 'Unauthorized', error: err.message });
    }
}

export default authorize;