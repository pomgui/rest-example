import { LocationDto } from "app/openapi/model/LocationDto";

export interface BikeLocationDto extends LocationDto {
    city: string;
    country: string;
}

export interface BikeNetworkDto {
    company: string|string[];
    href: string;
    location: BikeLocationDto;
    name: string;
    id: string;
}
