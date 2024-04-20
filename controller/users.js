const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = {
    // create data users
    create: async (req, res, next) => {
        try {
            let { name, email, password, address, identity_type, identity_number } = req.body

            //cek email
            let exist = await prisma.users.findFirst({
                where: {
                    email
                }
            })
            if (exist) {
                return res.status(400).json({
                    status: false,
                    message: 'email already used',
                })
            }

            // membuat users dan profiles
            let user = await prisma.users.create({
                data: {
                    name,
                    email,
                    password,
                    profiles: {
                        create: {
                            address,
                            identity_type,
                            identity_number
                        }
                    }
                },
                include: {
                    profiles: true,
                }
            })

            res.status(201).json({
                status: true,
                message: 'success',
                data: user
            })
        } catch (err) {
            next(err)
        }
    },

    // getall data users
    getall: async (req, res, next) => {
        try {
            let user = await prisma.users.findMany()

            // cek users
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: 'not found',
                    data: []
                });
            }

            res.status(200).json({
                status: true,
                message: 'success',
                data: user
            })
        } catch (err) {
            next(err);
        }
    },

    // detail users
    detail: async (req, res, next) => {
        try {

            let id = req.params.id

            // cek id users 
            let exist = await prisma.users.findUnique({
                where: {
                    id: parseInt(id)
                },
            });

            if (!exist) {
                return res.status(404).json({
                    status: false,
                    message: "not found",
                    data: null
                });
            }

            let user = await prisma.users.findUnique({
                where: {
                    id: parseInt(id)
                },
                include: {
                    profiles: true
                }
            });

            res.status(200).json({
                status: true,
                message: 'success',
                data: user,
            })

        } catch (err) {
            next(err)
        }
    },
}