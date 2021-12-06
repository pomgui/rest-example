/**
 * Parameters for operation 'getStationBooks' (GET /stations/{stationId}/books)
 * Gets the bike reserves made to that station.
 */

/** Parameters sent in the path */
export interface GetStationBooksPathParam {
    
    stationId: string;
}

/** Structure with ALL the operation parameters */
export interface GetStationBooksParam extends GetStationBooksPathParam {
}