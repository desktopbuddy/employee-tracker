DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department {
    id NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
};