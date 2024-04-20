const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = {
    // create 
    create: async (req, res, next) => {
        try {
            let { source_account_id, destination_account_id, amount } = req.body
            // cek account
            let source = await prisma.bankaccount.findUnique({
                where: {
                    id: source_account_id
                }
            })

            if (!source) {
                res.status(404).json({
                    status: false,
                    message: 'not found',
                    data: null
                })
            }

            // create transaction
            let transaction = await prisma.transaction.create({
                data: {
                    source_account_id,
                    destination_account_id,
                    amount
                }
            })

            res.status(201).json({
                status: true,
                message: 'successs',
                data: transaction
            })

        } catch (err) {
            next(err)
        }
    },

    // getall transaction
    getall: async (req, res, next) => {
        try {
            let transaksi = await prisma.transaction.findMany()

            if (!transaksi) {
                res.status(404).json({
                    status: false,
                    message: 'not found',
                    data: null
                })
            }

            res.status(200).json({
                status: true,
                message: 'success',
                data: transaksi
            })

        } catch (err) {
            next(err)
        }
    },

    // detail transaction
    detail: async (req, res, next) => {
        try {
            const { transaction } = req.params
            let details = await prisma.transaction.findUnique({
                where: {
                    id: parseInt(transaction)
                },
                include: {
                    source_account_id: {
                        include: {
                            users: true
                        }
                    },
                    destination_account_id: {
                        include: {
                            users: true
                        }
                    }
                }
            })

            if (!details) {
                return res.status(404).json({
                    status: false,
                    message: 'not found',
                    data: null
                })
            }

            res.status(200).json({
                status: true,
                message: 'success',
                data: details
            })
        } catch (err) {
            next(err)
        }
    }
}