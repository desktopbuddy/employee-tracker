DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department {
    id NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
};

CREATE TABLE role {
    id NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE ON UPDATE CASCADE
};