import { app, dbPool } from './server';
import { SyncThirdParty } from './thirdPartyApi/sync';

const 
    port = parseInt(process.env.MINNOW_PORT || '8080'),
    sync = new SyncThirdParty();

// Synchronize in background
sync.syncData(dbPool);

// Serve the application at the given port
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});