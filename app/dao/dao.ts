import { PiDatabase } from "@pomgui/database";
import { CityDto, StationDto } from "app/openapi/model";
import { GetStationsParam } from "app/openapi/params";

const maxDistance = parseInt(process.env.MINNOW_MAXDISTANCE || '50000');

export function getCities(db: PiDatabase): Promise<CityDto[]> {
    return db.query(`
        SELECT DISTINCT n.city as name, n.country, n.latitude, n.longitude
        FROM networks n
        ORDER BY country, city
    `, []);
}

export function getStations(params: GetStationsParam, db: PiDatabase): Promise<StationDto[]> {
    if (params.address) {
        params.address = '%' + params.address.replace(/\s+/, '%') + '%';
        if (!params.distance)
            params.distance = params.latitude ? maxDistance : 1e9;
    } else
        if (!params.distance) params.distance = maxDistance;
    params.resultSize = params.resultSize || 50;

    return db.query(`
        SELECT a.* FROM (
            SELECT ${params.latitude ? `
                f_geo_distance(:latitude, :longitude, s.latitude, s.longitude)` : '0'} AS distance, 
                s.name, s.latitude, s.longitude, s.free_bikes, n.company, s.address
            FROM stations s 
            JOIN networks n ON n.id = s.network_id
            ${params.address ? `
            WHERE s.address || s.name LIKE :address
            `: ''}
        ) a
        WHERE a.distance <= :distance 
        ORDER BY a.distance, free_bikes desc
        LIMIT 0,${params.resultSize}
    `, params);
}