CREATE DATABASE cribb;

CREATE TABLE listing(
    address_id SERIAL PRIMARY KEY,
    addedby VARCHAR(50),
    address VARCHAR(100),
    avgAmenities float,
    avgManage float,
    avgLocation float,
    avgOverallRating float,
    lat DECIMAL(10,7),
    long DECIMAL(10,7),
    landlord VARCHAR(50),
    phoneNumber VARCHAR(16),
    rent VARCHAR(20)
);