export interface CityDto {
    /** Unique ID for a city */
    id?: number;
    /** Name of the city */
    name?: string;
    
    latitude: number;
    
    longitude: number;
    
    country?: string;
}