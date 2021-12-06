import { mockPool, mockDB } from '../support/piDatabaseMock';
import { SyncThirdParty } from '../../app/thirdPartyApi/sync';
import * as nodefetch from 'node-fetch-commonjs';
import { BikeNetworkDto } from 'app/thirdPartyApi/BikeNetworkDto';

const
    networksData: { networks: BikeNetworkDto[] } = {
        networks: [
            {
                company: ['Velobike'],
                href: '/v2/networks/velobike-moscow',
                id: 'velobike-moscow',
                location: {
                    city: 'Moscow',
                    country: 'RU',
                    latitude: 55.75,
                    longitude: 37.616667
                },
                name: 'Velobike'
            },
            {
                company: ['Gobike A/S'],
                href: '/v2/networks/bycyklen',
                id: 'bycyklen',
                location: {
                    city: 'Copenhagen',
                    country: 'DK',
                    latitude: 55.673582,
                    longitude: 12.564984
                },
                name: 'Bycyklen'
            },
            {
                company: ['Gobike A/S'],
                href: '/v2/networks/nu-connect',
                id: 'nu-connect',
                location: {
                    city: 'Utrecht',
                    country: 'NL',
                    latitude: 52.117,
                    longitude: 5.067
                },
                name: 'Nu-Connect'
            }
        ]
    },
    networksResponse = new nodefetch.Response(JSON.stringify(networksData), { status: 200, statusText: 'OK' }),
    sync = new SyncThirdParty();

describe('syncData()', () => {
    beforeEach(() => {
        spyOn(sync, 'syncNetworks').and.resolveTo();
        spyOn(sync, 'syncStations').and.resolveTo();
        spyOn(nodefetch, 'default').and.resolveTo(networksResponse);
    });
    it('should call syncNetworks and syncStations', done => {
        sync.syncData(mockPool).then(() => {
            expect(sync.syncNetworks).toHaveBeenCalledWith(networksData.networks, mockDB);
            expect(sync.syncStations).toHaveBeenCalledWith(networksData.networks, mockDB);
            done();
        });
    });
});

describe('syncNetworks()', () => {
    beforeEach(() => {
        spyOn(nodefetch, 'default').and.resolveTo(networksResponse);
        spyOn(mockDB, 'query').and.resolveTo();
    });
    it('should call syncNetworks and syncStations', done => {
        sync.syncNetworks(networksData.networks, mockDB).then(() => {
            expect(mockDB.query).toHaveBeenCalledTimes(3);
            done();
        });
    });
});
