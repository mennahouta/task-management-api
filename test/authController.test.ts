import request from "supertest";
import app from "../src/app";
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "../src/utils/statusCodes";

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Auth Controller", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/auth/register").send({ username: "testuser", password: "password123" });

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("username", "testuser");
  });

  it("should log in a user and return a token", async () => {
    await request(app).post("/auth/register").send({ username: "testuser2", password: "password123" });

    const response = await request(app).post("/auth/login").send({ username: "testuser2", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
