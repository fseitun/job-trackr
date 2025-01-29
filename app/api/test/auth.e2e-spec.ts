import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from './setup.js';

describe('Authentication (e2e)', () => {
    const testUser = {
        email: 'test@example.com',
        password: 'Test123!',
    };

    describe('POST /api/users/register', () => {
        it('should register a new user', async () => {
            const response = await request(app.getHttpServer())
                .post('/api/users/register')
                .send(testUser)
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.email).toBe(testUser.email);
            expect(response.body).not.toHaveProperty('password');
            expect(response.body).not.toHaveProperty('passwordHash');
        });

        it('should not register a user with an existing email', async () => {
            await request(app.getHttpServer())
                .post('/api/users/register')
                .send(testUser)
                .expect(409);
        });
    });

    describe('POST /api/users/login', () => {
        it('should login with valid credentials', async () => {
            const response = await request(app.getHttpServer())
                .post('/api/users/login')
                .send(testUser)
                .expect(200);

            expect(response.body).toHaveProperty('token');
        });

        it('should not login with invalid credentials', async () => {
            await request(app.getHttpServer())
                .post('/api/users/login')
                .send({
                    email: testUser.email,
                    password: 'wrongpassword',
                })
                .expect(401);
        });
    });

    describe('GET /api/auth/validate-token', () => {
        let authToken: string;

        beforeAll(async () => {
            const response = await request(app.getHttpServer())
                .post('/api/users/login')
                .send(testUser);
            authToken = response.body.token;
        });

        it('should validate a valid token', async () => {
            await request(app.getHttpServer())
                .get('/api/auth/validate-token')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);
        });

        it('should not validate an invalid token', async () => {
            await request(app.getHttpServer())
                .get('/api/auth/validate-token')
                .set('Authorization', 'Bearer invalid-token')
                .expect(401);
        });
    });
});
