DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE  employeeDB;


CREATE TABLE department (
    id INT(20) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT(20) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30)  NULL,
    salary DECIMAL(10,2)  NULL,
    department_id INT(10) NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT(20) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(20) NOT NULL,
    manager_id INT(20) NOT NULL,
    PRIMARY KEY(id)

);