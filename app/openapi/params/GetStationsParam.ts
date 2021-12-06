/**
 * Parameters for operation 'getStations' (GET /stations)
 * Gets the available bikes and their locations (ordered by distance to the user's
 * location)
 */

/** Parameters sent in the query */
export interface GetStationsQueryParam {
    /** Only returns bikes close to this location */
    latitude?: number;
    /** Only returns bikes close to this location */
    longitude?: number;
    /** Maximum distance (in meters) to be considered. Default 5Km */
    distance?: number;
}

/** Structure with ALL the operation parameters */
export interface GetStationsParam extends GetStationsQueryParam {
}