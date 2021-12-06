/**
 * Parameters for operation 'updateStationBook' (PUT
 * /stations/{stationId}/books/{bookId})
 * Cancel the reservation
 */

/** Parameters sent in the query */
export interface UpdateStationBookQueryParam {
    /** New status of the reservation */
    status?: ('cancel'|'taken'|'returned');
}

/** Parameters sent in the path */
export interface UpdateStationBookPathParam {
    
    stationId: string;
    
    bookId: string;
}

/** Structure with ALL the operation parameters */
export interface UpdateStationBookParam extends UpdateStationBookQueryParam, UpdateStationBookPathParam {
}