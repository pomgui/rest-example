export interface StationBookDto {
    
    id?: number;
    /** Number of reserved bikes */
    quantity?: number;
    
    status?: ('pending'|'taken'|'returned');
}