CREATE TABLE animals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    species VARCHAR(50),
    latitude FLOAT,
    longitude FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO animals (name, species, latitude, longitude)
VALUES
    ('Elephant', 'African Elephant', -1.2921, 36.8219),
    ('Lion', 'African Lion', -1.2922, 36.8220),
    ('Giraffe', 'Reticulated Giraffe', -1.2923, 36.8221);
