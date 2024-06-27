import request from "supertest";
import {app, server} from "../index";
import { prismaClient } from "..";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

jest.setTimeout(5000);

describe("Auth Endpoints", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prismaClient.user.delete({
      where: {
        email: "new_test@example.com",
      },
    });
    await prisma.$disconnect();

    // Close the server
    server.close();
  });

  describe("POST /api/auth/signup", () => {
    it("should create a new user", async () => {
      const response = await request(app).post("/api/auth/signup").send({
        email: "new_test@example.com",
        password: "password123",
        name: "Test User",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body.email).toBe("new_test@example.com");
    });

    it("should not allow duplicate emails", async () => {
      await request(app).post("/api/auth/signup").send({
        email: "duplicate@example.com",
        password: "password123",
        name: "Test User",
      });

      const response = await request(app).post("/api/auth/signup").send({
        email: "duplicate@example.com",
        password: "password123",
        name: "Test User",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User already exists");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login the user and return a token", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "abc123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("should not login with incorrect password", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Incorrect password");
    });

    it("should not login non-existent user", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "nonexistent@example.com",
        password: "password123",
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });
  });

  describe("GET /api/auth/me", () => {
    let token: string;

    beforeAll(async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "abc123",
      });

      token = response.body.token;
    });

    it("should return user data for authenticated user", async () => {
      const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", token);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("email", "test@example.com");
    });

    it("should return 401 for unauthenticated user", async () => {
      const response = await request(app).get("/api/auth/me");

      expect(response.status).toBe(401);
    });
  });
});
