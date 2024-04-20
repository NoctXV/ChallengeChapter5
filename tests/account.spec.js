const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = require('../../app');
const request = require('supertest');

describe("testing /api/v1/account", () => {
    beforeAll(async () => {
        user = await prisma.user.findMany();
    });

    test("create account", async () => {
        try {
            let bank_name = "Jago";
            let bank_account_number = 302430116;
            let balance = 1000000;
            let users_id = user[10].id;
            let { statusCode, body } = await request(app)
                .post("/api/v1/account1")
                .send({ users_id, bank_name, bank_account_number, balance});
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
            expect(body.data).toHaveProperty("id");
            expect(body.data).toHaveProperty("users_id");
            expect(body.data).toHaveProperty("bank_name");
            expect(body.data).toHaveProperty("bank_account_number");
            expect(body.data).toHaveProperty("balance");
            expect(body.data.users_id).toBe(users_id);
            expect(body.data.bank_name).toBe(bank_name);
            expect(body.data.bank_account_number).toBe(bank_account_number);
            expect(body.data.balance).toBe(balance);
        } catch (err) {
            throw err;
        }
    })
});

//==================================================================================================

describe("testing /api/v1/account", () => {
    test("getall account", async () => {
        try {
            let { statusCode, body } = await request(app).get("/api/v1/account");
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
            expect(body.data[0]).toHaveProperty("id");
            expect(body.data[0]).toHaveProperty("users_id");
            expect(body.data[0]).toHaveProperty("bank_name");
            expect(body.data[0]).toHaveProperty("bank_account_number");
            expect(body.data[0]).toHaveProperty("balance");
        } catch (err) {
            throw err;
        }
    });
});

//==================================================================================================

describe("testing /api/v1/account", () => {
    beforeAll(async () => {
        account = await prisma.account.findMany();
    });
    test("detail account", async () => {
        try {
            let { statusCode, body } = await request(app).get(`/api/v1/account/${account[0].id}`
            );
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
            expect(body.data).toHaveProperty("id");
            expect(body.data).toHaveProperty("users_id");
            expect(body.data).toHaveProperty("bank_name");
            expect(body.data).toHaveProperty("bank_account_number");
            expect(body.data).toHaveProperty("balance");
            expect(body.data.user).toHaveProperty("id");
            expect(body.data.user).toHaveProperty("name");
            expect(body.data.user).toHaveProperty("email");
            expect(body.data.user).toHaveProperty("password");
            expect(body.data.user).toHaveProperty("profiles");
            expect(body.data.user.profiles).toHaveProperty("id");
            expect(body.data.user.profiles).toHaveProperty("identity_type");
            expect(body.data.user.profiles).toHaveProperty("identity_number");
            expect(body.data.user.profiles).toHaveProperty("address");
            expect(body.data.user.profiles).toHaveProperty("users_id");
        } catch (err) {
            throw err;
        }
    });
});