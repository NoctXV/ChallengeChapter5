const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = require('../../app');
const request = require('supertest');

describe("testing /api/v1/users", () => {
    beforeAll(async () => {

    });

    test("email not registered", async () => {
        try {
            let name = "billa";
            let email = "billa@mail.com";
            let password = "04012003";
            let identity_type = 111;
            let identity_number = 111;
            let address = "boja";
            let { statusCode, body } = await request(app)
                .post("/api/v1/users")
                .send({ name, email, password, identity_type, identity_number, address });
            console.log(JSON.stringify(body, null, 2));
            let user = {}
            user = body.data;
            expect(statusCode).toBe(201);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
            expect(body.data).toHaveProperty("id");
            expect(body.data).toHaveProperty("name");
            expect(body.data).toHaveProperty("email");
            expect(body.data).toHaveProperty("password");
            expect(body.data.profile).toHaveProperty("id");
            expect(body.data.profile).toHaveProperty("identity_type");
            expect(body.data.profile).toHaveProperty("identity_number");
            expect(body.data.profile).toHaveProperty("address");
            expect(body.data.name).toBe(name);
            expect(body.data.email).toBe(email);
            expect(body.data.password).toBe(password);
            expect(body.data.profile.identity_type).toBe(identity_type);
            expect(body.data.profile.identity_number).toBe(identity_number);
            expect(body.data.profile.address).toBe(address);
        } catch (err) {
            throw err;
        }
    });
})

//==================================================================================================

describe("testing /api/v1/users", () => {
    test("getall users", async () => {
        try {
            let { statusCode, body } = await request(app).get("/api/v1/users");
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
            expect(body.data[0]).toHaveProperty("id");
            expect(body.data[0]).toHaveProperty("name");
            expect(body.data[0]).toHaveProperty("email");
            expect(body.data[0]).toHaveProperty("password");

        } catch (err) {
            expect(err).toBe('user not found');
        }
    })
});

//============================================================================================

describe("testing /api/v1/users", () => {
    test("detail users", async () => {
        try {
            let { statusCode, body } = await request(app).get(`/api/v1/users/${user.id}`);
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
            expect(body.data).toHaveProperty("id");
            expect(body.data).toHaveProperty("name");
            expect(body.data).toHaveProperty("email");
            expect(body.data).toHaveProperty("password");
            expect(body.data.profile).toHaveProperty("id");
            expect(body.data.profile).toHaveProperty("identity_type");
            expect(body.data.profile).toHaveProperty("identity_number");
            expect(body.data.profile).toHaveProperty("address");
        } catch (err) {
            throw err;
        }
    })
});