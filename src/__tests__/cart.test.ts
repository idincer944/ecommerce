import request from 'supertest';
import {app, server} from "../index";
import { prismaClient } from '..';
import { Prisma } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { string } from 'zod';

jest.setTimeout(5000);

describe('Cart Endpoints', () => {
    beforeAll(async () => {
        await prismaClient.$connect();
    });

    afterAll(async () => {

    await prismaClient.$disconnect();

    // Close the server
    server.close();
    });
  afterEach(async () => {
    // Clean up after each test: delete any created cart items
    await prismaClient.cartItem.deleteMany({});
  });

  describe('POST /api/carts', () => {
    let token: string;
    beforeAll(async () => {
        const response = await request(app).post("/api/auth/login").send({
            email: "test@example.com",
            password: "abc123",
          });
    
         token = response.body.token;
    });
    it('should add a new item to the cart', async () => {

        const mockRequestBody = {
          productId: 2,
          quantity: 5,
        };
    
        // Send HTTP request to add item to cart
        const response = await request(app)
          .post('/api/carts')
          .set("Authorization", token)
          .send(mockRequestBody);
    
        // Assertions
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.productId).toBe(mockRequestBody.productId);
        expect(response.body.quantity).toBe(mockRequestBody.quantity);
    
        // Verify if the cart item is created in the database
        const createdCartItem = await prismaClient.cartItem.findFirst({
          where: {
            id: response.body.id, // Assuming the response includes the ID of the created item
          },
        });
        expect(createdCartItem).toBeTruthy();
        expect(createdCartItem?.productId).toBe(mockRequestBody.productId);
        expect(createdCartItem?.quantity).toBe(mockRequestBody.quantity);
      });
  });

  
 
});
