export * from './GetCitiesParam';
export * from './GetStationsParam';
export * from './GetStationBooksParam';
export * from './NewStationBookParam';
export * from './UpdateStationBookParam';

export const descriptors = {
    getCities: {n:'dummy',d:[1]},
    getStations: {n:'latitude|longitude|distance',d:[3171]},
    getStationBooks: {n:'stationId',d:[9]},
    newStationBook: {n:'qty|stationId',d:[294]},
    updateStationBook: {n:'status|stationId|bookId',d:[9511],v:{0:['cancel','taken','returned']}},
}