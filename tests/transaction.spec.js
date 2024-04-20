const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = require('../../app');
const request = require('supertest');

describe("testing /api/v1/transaction", () => {
    let account;
    beforeAll(async () => {
        account = await prisma.account.findMany();
    });

    test("create transaction", async () => {
        let source_account_id = account[0].id;
        let destination_account_id = account[1].id;
        let amount = 1000000;
        let { statusCode, body } = await request(app)
            .post("/api/v1/transaction")
            .send({ source_account_id, destination_account_id, amount });
        expect(statusCode).toBe(201);
        expect(body).toHaveProperty("status");
        expect(body).toHaveProperty("message");
        expect(body).toHaveProperty("data");
        expect(body.data).toHaveProperty("id");
        expect(body.data).toHaveProperty("source_account_id");
        expect(body.data).toHaveProperty("destination_account_id");
        expect(body.data).toHaveProperty("amount");
        expect(body.data.source_account_id).toBe(source_account_id);
        expect(body.data.destination_account_id).toBe(destination_account_id);
        expect(body.data.amount).toBe(amount);
    });

    test("create transaction not found", async () => {
        let amount = 1000000;
        let source_account_id = 69696969;
        let destination_account_id = 69696969;
        let { statusCode, body } = await request(app)
            .post("/api/v1/transaction")
            .send({ source_account_id, destination_account_id, amount });
        expect(statusCode).toBe(404);
        expect(body).toHaveProperty("status");
        expect(body).toHaveProperty("message");
        expect(body).toHaveProperty("data");
    });
});