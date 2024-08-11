const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.Auth=async(req, res, next) =>{
    try {
        console.log("req",req)
        const token = req.cookies.Token || req.headers.Token;
        console.log('auth token is there ',token)

        if (!token || token===undefined) {
            return res.status(401).json({
                success: false,
                message: 'tokem missing from there'
            });
        }

        try {
            const decode = await jwt.verify(token, process.env.JWT_TOKEN_SECRET);
            req.User = decode.id;
        } catch (error) {
            console.log("Error during token verification",error);
        }
        console.log("Midelware verified go to next->")
        next();
    } catch (err) {
        console.log("Error occured",err);
        return res.status(401).json({
            success: false,
            message: "Problem decoding the token"
        });
    }
};
    