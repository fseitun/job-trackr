import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from './setup.js';

describe('Jobs (e2e)', () => {
    let authToken: string;
    let jobId: string;

    const testUser = {
        email: 'jobtest@example.com',
        password: 'Test123!',
    };

    const testJob = {
        hiringCompany: 'Test Company',
        recruitingCompany: 'Test Recruiter',
        position: 'Software Engineer',
        recruiterName: 'John Doe',
        recruitmentChannel: 'LinkedIn',
        monthlySalary: 5000,
        vacationDays: 20,
        holidayDays: 10,
        jobDescription: 'Test job description',
        directHire: true,
        timeZone: 'UTC',
    };

    beforeAll(async () => {
        // Register and login test user
        await request(app.getHttpServer())
            .post('/api/users/register')
            .send(testUser);

        const loginResponse = await request(app.getHttpServer())
            .post('/api/users/login')
            .send(testUser);

        authToken = loginResponse.body.token;
    });

    describe('POST /api/job', () => {
        it('should create a new job', async () => {
            const response = await request(app.getHttpServer())
                .post('/api/job')
                .set('Authorization', `Bearer ${authToken}`)
                .send(testJob)
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.hiringCompany).toBe(testJob.hiringCompany);
            expect(response.body.position).toBe(testJob.position);

            jobId = response.body.id;
        });

        it('should not create a job without authentication', async () => {
            await request(app.getHttpServer())
                .post('/api/job')
                .send(testJob)
                .expect(401);
        });
    });

    describe('GET /api/job', () => {
        it('should get all jobs for the authenticated user', async () => {
            const response = await request(app.getHttpServer())
                .get('/api/job')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0].hiringCompany).toBe(testJob.hiringCompany);
        });

        it('should not get jobs without authentication', async () => {
            await request(app.getHttpServer()).get('/api/job').expect(401);
        });
    });

    describe('GET /api/job/:id', () => {
        it('should get a specific job by ID', async () => {
            const response = await request(app.getHttpServer())
                .get(`/api/job/${jobId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('id', jobId);
            expect(response.body.hiringCompany).toBe(testJob.hiringCompany);
        });

        it('should not get a job with invalid ID', async () => {
            await request(app.getHttpServer())
                .get('/api/job/invalid-id')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });
    });

    describe('PATCH /api/job/:id', () => {
        const updateData = {
            hiringCompany: 'Updated Company',
            position: 'Senior Software Engineer',
        };

        it('should update a job', async () => {
            const response = await request(app.getHttpServer())
                .patch(`/api/job/${jobId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(updateData)
                .expect(200);

            expect(response.body.hiringCompany).toBe(updateData.hiringCompany);
            expect(response.body.position).toBe(updateData.position);
        });

        it('should not update a job without authentication', async () => {
            await request(app.getHttpServer())
                .patch(`/api/job/${jobId}`)
                .send(updateData)
                .expect(401);
        });
    });

    describe('DELETE /api/job/:id', () => {
        it('should delete a job', async () => {
            await request(app.getHttpServer())
                .delete(`/api/job/${jobId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            // Verify job is deleted
            await request(app.getHttpServer())
                .get(`/api/job/${jobId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);
        });

        it('should not delete a job without authentication', async () => {
            await request(app.getHttpServer())
                .delete(`/api/job/${jobId}`)
                .expect(401);
        });
    });
});
