const express = require('express')
const { authMiddleware } = require('../middlewware');
const router = express.Router();
const zod = require('zod');
const { User, Account } = require('../database');
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");


const signUpSchema = zod.object({
    firstName: zod.string(),
    username: zod.string().email(),
    lastName: zod.string(),
    password: zod.string().length(8)
})
const signInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().length(8)
})

const updateInfo = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().length(8).optional()
})

const filterInfo = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})
router.post('/sign-up', async function (req, res) {
    const userDetail = req.body;
    const response = signUpSchema.safeParse(userDetail);
    if (!response.success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existing = await User.findOne({ username: userDetail.username });
    if (existing) {
        return res.status(400).json({
            message: "user exist already!"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userId = user._id;

    await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({ userId }, JWT_SECRET_KEY);

    res.status(200).json({
        message: "User created successfully",
        token: token
    })

})

router.post('/sign-in', async function (req, res) {
    const userDetail = req.body;
    const response = signInSchema.safeParse(userDetail);
    if (!response.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    let existingUser = await User.findOne({ username: userDetail.username});
    if (!existingUser) {
        return res.status(400).json({
            message: "sign-up first!"
        })
    }
     existingUser = await User.findOne({ username: userDetail.username,password : userDetail.password });
     if (!existingUser) {
        return res.status(403).json({
            message: "Incorrect Username/password!"
        })
    }
    const userId = existingUser._id;
    const token = jwt.sign({ userId }, JWT_SECRET_KEY);

    res.status(200).json({
        message: "User signed in successfully",
        token: token
    })


})

router.put('/', authMiddleware, async (req, res) => {

    const body = req.body;

    const response = updateInfo.safeParse(body)
    if (!response.success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })


})

router.get("/bulk",authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    // console.log(filter);
    const users = await User.find({
        _id: { $ne: req.userId },
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router
