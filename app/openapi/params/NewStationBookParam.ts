/**
 * Parameters for operation 'newStationBook' (POST /stations/{stationId}/books)
 * Creates a bike reservation in a Station
 */

/** Parameters sent in the query */
export interface NewStationBookQueryParam {
    /** Number of bikes to reserve */
    qty?: any;
}

/** Parameters sent in the path */
export interface NewStationBookPathParam {
    
    stationId: string;
}

/** Structure with ALL the operation parameters */
export interface NewStationBookParam extends NewStationBookQueryParam, NewStationBookPathParam {
}