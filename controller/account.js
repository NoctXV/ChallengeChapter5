const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = {
    // create account
    create: async (req, res, next) => {
        try {
            let { users_id, bank_name, bank_account_number, balance } = req.body

            // cek users
            let user = await prisma.users.findUnique({
                where: {
                    id: users_id,
                }
            })

            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: 'not found',
                    data: null,
                })
            }

            // cek account
            let accounts = await prisma.bank_account_number.findFirst({
                where: {
                    bank_account_number : bank_account_number,
                },
            })

            if (accounts) {
                return res.status(400).json({
                    status: false,
                    message: "success",
                    data: null,
                })
            }

            // create accounts
            let account = await prisma.bank_account_number.create({
                data: {
                    users_id,
                    bank_name,
                    bank_account_number,
                    balance,
                },
                include: {
                    users: true,
                }
            })

            res.status(201).json({
                status: true,
                message: 'success',
                data: account,
            })
        } catch (err) {
            next(err)
        }
    },

    // getall account
    getall: async (req, res, next) => {
        try {

            let account = await prisma.bank_account_number.findMany()

            // cek account
            if (!account) {
                return res.status(404).json({
                    status: false,
                    message: 'not found',
                    data: []
                })
            }

            res.status(200).json({
                status: true,
                message: 'success',
                data: account,
            })

        } catch (err) {
            next(err)
        }
    },

    // detail account
    detail: async (req, res, next) => {
        try {
            let { id } = req.params
            let account = await prisma.bank_account_number.findUnique({
                where: {
                    id: parseInt(id)
                },
                include: {
                    users: {
                        include: {
                            profiles: true
                        }
                    }
                }
            })

            if (!account) {
                return res.status(404).json({
                    status: false,
                    message: 'not found',
                    data: null
                })
            }

            res.status(200).json({
                status: true,
                message: 'success',
                data: account
            })
        } catch (err) {
            next(err)
        }
    },
}