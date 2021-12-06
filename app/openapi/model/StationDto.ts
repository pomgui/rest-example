export interface StationDto {
    
    name: string;
    
    latitude: number;
    
    longitude: number;
    /** Available bikes */
    free_bikes: number;
    
    company?: string;
    
    address?: string;

    /** Distance from the user location in meters */
    distance: number;
}
