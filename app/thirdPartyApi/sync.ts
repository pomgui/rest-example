import { PiDatabase } from "@pomgui/database";
import { PiFirebirdPool } from "@pomgui/database/dist/firebird";
import { setTimeout } from "timers";
import { BikeNetworkDto } from "./BikeNetworkDto";
import fetch from 'node-fetch-commonjs';

const
    bikeUrl = 'http://api.citybik.es/v2',
    syncTimeout = parseInt(process.env.MINNOW_SYNCTIMEOUT || '3600000');

export class SyncThirdParty {
    async syncData(dbPool: PiFirebirdPool): Promise<void> {
        const db = await dbPool.get();
        console.time('sync');
        await db.beginTransaction();
        try {
            const { networks } = await (await fetch(`${bikeUrl}/networks`)).json() as any;

            await this.syncNetworks(networks, db);
            console.timeLog('sync');
            await this.syncStations(networks, db);
            await db.commit();
            console.timeEnd('sync');

            setTimeout(() => this.syncData(dbPool), syncTimeout); // Sync again after awhile
        } catch (err) {
            console.error(err);
            await db.rollback();
        } finally {
            (db as any)._db.detach();
        }
    }

    async syncNetworks(networks: BikeNetworkDto[], db: PiDatabase): Promise<void> {
        console.log('Synchronizing networks...');
        for (const network of networks) {
            if (Array.isArray(network.company))
                network.company = network.company.join(',');
            network.location.city = network.location.city.substr(0, 50);
            const sql = `
                UPDATE OR INSERT INTO networks
                    (id, name, company, city, latitude, longitude, country)
                VALUES
                    (:id, :name, :company, :location.city, :location.latitude, :location.longitude, :location.country)
                MATCHING (id)
            `;
            try {
                await db.query(sql, network);
            } catch (err) {
                console.error('ERROR updating Networks in: ', network);
                console.error(err); // Just print and ignore record
            }
        }
    }

    async syncStations(networks: BikeNetworkDto[], db: PiDatabase): Promise<void> {
        console.log('Synchronizing stations...');
        for (const n of networks) {
            const { network } = await (await fetch(`${bikeUrl}/networks/${n.id}?fields=stations`)).json() as any;

            for (const station of network.stations) {
                station.name = station.name.substr(0, 50);
                station.extra = station.extra || {};
                station.extra.address = (station.extra.address || '').substr(0, 100);
                if (station.free_bikes === null) station.free_bikes = 0;
                const sql = `
                    UPDATE OR INSERT INTO stations
                        (id, network_id, name, latitude, longitude, free_bikes, address, updated_on)
                    VALUES 
                        (:id, :networkId, :name, :latitude, :longitude, :free_bikes, :extra.address, :timestamp)
                    MATCHING (id)
                `;
                try {
                    await db.query(sql, [station, { networkId: n.id }]);
                } catch (err) {
                    console.error('ERROR updating Stations in: ', station);
                    console.error(err); // Just print and ignore record
                }
            }
        }
    }

}
