import { app } from '../app/server';
import supertest from 'supertest';
import { Response } from 'superagent';

describe('Endpoints Test', () => {
    let request: any;
    beforeAll(() => {
        request = supertest(app);
    });

    describe('/cities', () => {
        it('should return a list of the cities in the database', async () => {
            const response: Response = await request.get('/v1/cities');
            expect(response.ok)
            expect(response.body).not.toHaveSize(0);
        });
    });

    describe('/stations', () => {
        it('should return an error 400 - address', async () => {
            const URL = '/v1/stations';
            const response: Response = await request.get(URL);
            expect(response.status).toEqual(400);
            expect(response.body).toEqual({ message: 'Missing required parameter "address" or ("latitude" and "longitude")' });
        });

        it('should return an error 400 - latitude', async () => {
            const URL = '/v1/stations?longitude=1';
            const response: Response = await request.get(URL);
            expect(response.status).toEqual(400);
            expect(response.body).toEqual({ message: 'Missing required parameter "latitude"' });
        });

        it('should return an error 400 - longitude', async () => {
            const URL = '/v1/stations?latitude=1';
            const response: Response = await request.get(URL);
            expect(response.status).toEqual(400);
            expect(response.body).toEqual({ message: 'Missing required parameter "longitude"' });
        });

        it('should return an empty list for coordenates in the middle Atlantic Ocean', async () => {
            const URL = '/v1/stations?latitude=-6&longitude=-26';
            const response: Response = await request.get(URL);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual([]);
        });

        it('should return the 50 stations closest to Paris', async () => {
            const URL = '/v1/stations?latitude=48.8788744&longitude=2.3502198';
            const response: Response = await request.get(URL);
            expect(response.status).toEqual(200);
            expect(response.body).toHaveSize(50);
        });

        it('should return the 10 stations closest to Paris', async () => {
            const URL = '/v1/stations?latitude=48.8788744&longitude=2.3502198&resultSize=10';
            const response: Response = await request.get(URL);
            expect(response.status).toEqual(200);
            expect(response.body).toHaveSize(10);
        });

        it('should return the 10 stations with address containing "hotel" no matter where', async () => {
            const URL = '/v1/stations?address=hotel&resultSize=10';
            const response: Response = await request.get(URL);
            expect(response.status).toEqual(200);
            expect(response.body).toHaveSize(10);
        });

        it('should return the 10 closest stations with address containing "hotel" only in Paris', async () => {
            const URL = '/v1/stations?address=hotel&latitude=48.8788744&longitude=2.3502198&resultSize=10';
            const response: Response = await request.get(URL);
            expect(response.status).toEqual(200);
            expect(response.body).toHaveSize(10);
        });
    });
});