import { PiDatabase, PiNoopDatabase } from "@pomgui/database";

export const mockDB: PiDatabase = new PiNoopDatabase();

(mockDB as any)._logger = { _level: 4, log() { }, debug() { }, trace() { } };
(mockDB as any)._db = { detach() { } };

export const mockPool: any = {
    async get(): Promise<PiDatabase> {
        return mockDB;
    }
};