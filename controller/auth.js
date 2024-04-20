const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = {
    register: async (req, res, next) => {
        try {
            let { name, email, password, identity_type, identity_number, address } = req.body;
            if (!name || !email || !password || !identity_type || !identity_number || !address) {
                return res.status(400).json({
                    status: false,
                    message: `all data are required`,
                    data: null,
                });
            }

            let exist = await prisma.user.findFirst({ where: { email } })
            if (exist) {
                return res.status(400).json({
                    status: false,
                    message: 'email already used',
                    data: null
                })
            }

            let encryptedPassword = await bcrypt.hash(password, 10)
            let user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: encryptedPassword,
                    profile: {
                        create: {
                            identity_type,
                            identity_number,
                            address,
                        },
                    },
                },
                include: {
                    profile: true,
                },
            })
            delete user.password

            return res.status(201).json({
                status: true,
                message: 'success',
                data: { user }
            })

        } catch (err) {
            next(err)
        }
    },

    login: async (req, res, next) => {
        try {
            let { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    status: false,
                    message: 'invalid email or password',
                    data: null
                });
            }

            let user = await prisma.user.findFirst({ where: { email } });
            console.log(user);
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'invalid email or password!',
                    data: null
                });
            }

            let isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({
                    status: false,
                    message: 'invalid email or password!',
                    data: null
                });
            }

            delete user.password;
            let token = jwt.sign(user, JWT_SECRET);

            res.json({
                status: true,
                message: 'OK',
                data: { ...user, token }
            });
        } catch (error) {
            next(error);
        }
    },
};