CREATE TABLE IF NOT EXISTS Jambo;

CREATE TABLE Users(name VARCHAR(64) NOT NULL, pin VARCHAR(4) NOT NULL, admin BOOLEAN NOT NULL, status BOOLEAN NOT NULL, userID INT PRIMARY KEY NOT NULL)
