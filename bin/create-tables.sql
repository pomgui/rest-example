CONNECT '/firebird/data/minnow.fdb' USER 'minnow' PASSWORD 'minnow';

SET SQL DIALECT 3; 

CREATE TABLE networks (
    id varchar(64) NOT NULL PRIMARY key,
    name varchar(50) NOT NULL COLLATE unicode_ci_ai,
    city varchar(50) NOT NULL COLLATE unicode_ci_ai,
    latitude double precision,
    longitude double precision,
    country varchar(10) NOT NULL,
    company varchar(100) COLLATE unicode_ci_ai    
);

CREATE TABLE stations (
    id varchar(64) NOT NULL PRIMARY KEY,
    network_id varchar(64) NOT NULL,
    name varchar(50) NOT NULL,
    latitude double precision,
    longitude double precision,
    free_bikes integer NOT NULL,
    address varchar(256) COLLATE unicode_ci_ai,
    updated_on timestamp NOT NULL
);

ALTER TABLE stations ADD CONSTRAINT fk_network FOREIGN KEY (network_id) REFERENCES networks(id);

CREATE TABLE station_books (
    id integer NOT NULL PRIMARY KEY,
    station_id varchar(64) NOT NULL,
    quantity integer NOT NULL,
    status char(1)
);

ALTER TABLE station_books ADD CONSTRAINT fk_station FOREIGN KEY (station_id) REFERENCES stations(id);

COMMIT WORK;
