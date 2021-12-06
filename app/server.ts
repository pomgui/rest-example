import express from 'express';
import { PiService } from '@pomgui/rest';
import { PiFirebirdPool } from '@pomgui/database';
import { services } from './openapi/services';
import { descriptors } from './openapi/params';

// Create a new express application instance
const app = express();
const port = parseInt(process.env.PORT || '8080');
const options = {
  host: 'localhost',
  port: 3050,
  user: 'minnow',
  password: 'minnow',
  database: '/firebird/data/minnow.fdb'
};

main();

function main() {
    app.use(express.json());
    app.use('/v1', PiService({ 
        services, 
        descriptors,
        dbPool: new PiFirebirdPool(options, 10) 
    }));

    // Serve the application at the given port
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}/`);
    });
}