import express from 'express';
import { PiService } from '@pomgui/rest';
import { PiFirebirdPool } from '@pomgui/database/dist/firebird';
import { services } from './openapi/services';
import { descriptors } from './openapi/params';

const options = {
    host: 'localhost',
    port: 3050,
    user: 'minnow',
    password: 'minnow',
    database: '/firebird/data/minnow.fdb'
};

export const dbPool = new PiFirebirdPool(options, 10);

// Create a new express application instance
export const app = express();

// Define endpoints
app.use(express.json());
app.use('/v1', PiService({
    services,
    descriptors,
    dbPool
}));
