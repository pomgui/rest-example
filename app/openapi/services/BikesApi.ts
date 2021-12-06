import { PiGET, PiRestError, PiPOST, PiPUT } from '@pomgui/rest';
import { CityDto, StationDto, StationBookDto } from '../model';
import { GetCitiesParam, GetStationsParam, GetStationBooksParam, NewStationBookParam, UpdateStationBookParam } from '../params';
import { PiDatabase } from '@pomgui/database';
import * as dao from '../../dao/dao';

export class BikesApi {
    @PiGET('/cities')
    async getCities(params: GetCitiesParam, db: PiDatabase): Promise<CityDto[]> {
        return dao.getCities(db);
    }

    @PiGET('/stations')
    async getStations(params: GetStationsParam, db: PiDatabase): Promise<StationDto[]> {
        if (!params.latitude && !params.address)
            throw new PiRestError('Missing required parameter "latitude"', 400);
        if (!params.longitude && !params.address)
            throw new PiRestError('Missing required parameter "longitude"', 400);
        if (!params.longitude && !params.longitude && !params.address)
            throw new PiRestError('Missing required parameter "address"', 400);
        return dao.getStations(params, db);
    }

    @PiGET('/stations/:stationId/books')
    async getStationBooks(params: GetStationBooksParam, db: PiDatabase): Promise<StationBookDto[]> {
        if (/* condition */false)
            throw new PiRestError('stationId not found', 404);
        let value: StationBookDto[] = [] as StationBookDto[];
        /* fill 'value' here */
        return value;
    }

    @PiPOST('/stations/:stationId/books')
    async newStationBook(params: NewStationBookParam, db: PiDatabase): Promise<StationBookDto> {
        if (/* condition */false)
            throw new PiRestError('stationId not found', 404);
        if (/* condition */false)
            throw new PiRestError('There\'s no enough available bikes', 409);
        let value: StationBookDto = {} as StationBookDto;
        /* fill 'value' here */
        return value;
    }

    @PiPUT('/stations/:stationId/books/:bookId')
    async updateStationBook(params: UpdateStationBookParam, db: PiDatabase): Promise<StationBookDto> {
        if (/* condition */false)
            throw new PiRestError('stationId or bookId not found', 404);
        if (/* condition */false)
            throw new PiRestError('There\'s no enough available bikes', 409);
        let value: StationBookDto = {} as StationBookDto;
        /* fill 'value' here */
        return value;
    }

}