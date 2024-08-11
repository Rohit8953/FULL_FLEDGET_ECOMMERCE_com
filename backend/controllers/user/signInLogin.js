const User = require('../../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require("dotenv").config();

exports.signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, profilePic} = req.body;
        if (!name || !email || !password || !confirmPassword) {
            return res.status(401).json({
                success: false,
                message: 'Please fill all details'
            })
        }
        const existingEmail = await User.findOne({ email });
        console.log("exist user", existingEmail);
        if (existingEmail) {
            return res.status(401).json({
                success: false,
                message: 'This email already exist'
            })
        }
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: 'password and conformPassword are not same'
            })
        }
        //secure password----
        let hashedpassword;
        try {
            hashedpassword = await bcrypt.hash(password, 10); //jisko hash karna chahte ho uska name,10 number of rounds me
            //hash ka matlb password ko encrypt karna in other symbols//
        } catch (err) {
            return res.status(500).json({
                success: false,
                massege: "Error in hashing password",
            });
        }
        //create entry in db for user
        const user = await User.create({
            name,
            email,
            password:hashedpassword,
            userImage:profilePic,
            role: "general"
        });

        return res.status(200).json({
            success: true,
            user,
            massege: "signup successfully completed",
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            massege: "signup failed--->>>",
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: 'Please fill complete details ok'
            })
        }
        const exist_user = await User.findOne({ email });

        if (!exist_user) {
            return res.status(404).json({
                success: false,
                message: 'email is not exist in database'
            })
        }
        const ismatch = await bcrypt.compare(password, exist_user.password);
        if (!ismatch) {
            return res.status(404).json({
                success: false,
                message: 'password matching problem--->'
            })
        }
        try {
            const data = {
                userId: exist_user._id,
                name: exist_user.name,
                email: exist_user.email,
                password: exist_user.password
            }

            const Token=await jwt.sign(data, process.env.JWT_TOKEN_SECRET, { expiresIn: "1d" });
            console.log("token from signin", Token);
            res.status(201).cookie("Token", Token,{
                httpOnly: true,
                expiresIn: "2d",
                success: true
            });
        } catch (error) {
            console.log(error);
        }
        return res.status(201).json({
            success: true,
            user: exist_user,
            message: ' login successful -->'
        })
    }
    catch (err) {
        console.log(err)
        return res.status(501).json({
            success: false,
            message: 'Something went wrong--->'
        })
    }
}

exports.logout = async (req, res) => {
    try {
        return res.cookie("token","", { expiresIn: new Date(Date.now()) }).json({
            message: "User logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log("error occur during the logedOut", error)
        return res.status(401).json({
            success: true,
            message: 'User logged out unsuccessful'
        })

    }
}