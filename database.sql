CREATE DATABASE cribb;

CREATE TABLE listing(
    address_id BIGSERIAL PRIMARY KEY,
    addedby VARCHAR(50),
    streetAddress VARCHAR(100),
    city VARCHAR(25),
    state_id VARCHAR(48),
    zipcode VARCHAR(12),
    avgAmenities float,
    avgManage float,
    avgLocation float,
    avgOverallRating float,
    lat DECIMAL(10,7),
    long DECIMAL(10,7),
    landlord VARCHAR(50),
    phoneNumber VARCHAR(16),
    rent VARCHAR(20),
    description VARCHAR(500),
    numOfReviews BIGINT,
    geolocation geography;
);

create index on listing USING gist(geolocation);

CREATE TABLE users(
    user_id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    email VARCHAR(35),
    password VARCHAR(256),
    admin bool
);

CREATE TABLE review_fact_table(
    review_id BIGSERIAL PRIMARY KEY,
    address_user hstore UNIQUE,
    address_id BIGINT,
    user_id BIGINT,
    zipcode VARCHAR(12),
    review TEXT,
    review_overall_rating real,
    review_amenities_rating real,
    review_management_rating real,
    review_location_rating real,
    liveAgain bool,
    postAnonymously bool,
    r_date DATE
);

CREATE INDEX on 

select * from listing where ST_DWithin(listing.geolocation, ST_MakePoint(74, 40)::geography, 100000) order by listing.geolocation <> ST_MakePoint(74, 40)::geography;
select * from listing order by ST_MakePoint(74,40) <-> listing.geolocation:: geography DESC;


