// ySQL Homework: Employee Tracker

// Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. In this homework assignment, your challenge is to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

// ## Instructions

// Design the following database schema containing three tables:

// ![Database Schema](Assets/schema.png)

// * **department**:

//   * **id** - INT PRIMARY KEY
//   * **name** - VARCHAR(30) to hold department name

// * **role**:

//   * **id** - INT PRIMARY KEY
//   * **title** -  VARCHAR(30) to hold role title
//   * **salary** -  DECIMAL to hold role salary
//   * **department_id** -  INT to hold reference to department role belongs to

// * **employee**:

//   * **id** - INT PRIMARY KEY
//   * **first_name** - VARCHAR(30) to hold employee first name
//   * **last_name** - VARCHAR(30) to hold employee last name
//   * **role_id** - INT to hold reference to role employee has
//   * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

// Build a command-line application that at a minimum allows the user to:

//   * Add departments, roles, employees

//   * View departments, roles, employees

//   * Update employee roles

// Bonus points if you're able to:

//   * Update employee managers

//   * View employees by manager

//   * Delete departments, roles, and employees

//   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

// We can frame this challenge as follows:

// ```
// As a business owner
// I want to be able to view and manage the departments, roles, and employees in my company
// So that I can organize and plan my business

// // ### Hints

// // * You may wish to include a `seed.sql` file to pre-populate your database. This will make development of individual features much easier.

// Make some tables
// Employees
// first_name
// last_name
// join_role which gets your title, department, salary
// manager column will be an id that joins to the employee table, not inner join
// Roles
// titles
// salary
// id to match up to department (foreign key)
// Departments
// Name
// Utilized Budget (adding up all the employees salaries in the employees table per department)
// Views
// View All
// has
// first_name
// last_name
// join_role which gets your title, department, salary
// manager column will be an id that joins to the employee table, not inner join
// By department
// has
// first_name
// last_name
// title
// Manager
// pick an employee and see their direct reports
// matching the selected employee's id to all the employees where the manager id
// matches the selected id
// Inserts
// Department
// Just a name
// Role
// Name
// Salary
// Pick a department (related by id to departments table)
// Employee
// first_name
// last_name
// pick a role (related by id to the roles table)
// pick a manager (related by id to the employees table, can be NULL)
// Updates
// Employee role
// change their role_id
// Employee Manager
// change their manager_id
// WHERE TO START!??!?!
// DEPARTMENTS!
// just have a name
// ROLES!
// just have a name, salary, and a foreign key relating it to departments
// EMPLOYEES!
// first/last name, role, manager_id

var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Omeffingg9!',
  database: 'employeeDB',
});

connection.connect(function (err) {
  if (err) throw err;

  start();
});

// function which prompts the user for what action they should take
function start() {
  //   * Add departments, roles, employees
  //   * View departments, roles, employees
  //   * Update employee roles
  //   Bonus points if you're able to:
  //   * Update employee managers
  //   * View employees by manager
  //   * Delete departments, roles, and employees
  //   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View All Employees', //
        'View All Departments',
        'View All Roles',
        'Add Employee', //
        'Add Department',
        'Add Role',
        'Update Employee Role',
        // "View All By Department",
        // "View All Employees By Manager",
        // "Remove Employee",
        // "Update Employee Manager"
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case 'View All Employees':
          allEmployees();
          break;

        case 'View All Employees By Department':
          employeeByDepartment();
          break;

        case 'View All Employees By Manager':
          employeeByManager();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Remove Employee':
          removeEmployee();
          break;

        case 'Update Employee Role':
          updateEmployeeRole();
          break;

        case 'Update Employee Manager':
          updateEmployeeManager();
      }
    });
}

function allEmployees() {
  connection.query('SELECT * From employee', function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'What is your first name?',
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'What is your last name?',
      },
      {
        name: 'role_id',
        type: 'number',
        message: 'What is employee role?',
      },
      {
        name: 'manager_id',
        type: 'number',
        message: 'What is manager id?',
      },
    ])
    .then((employee) => {
      connection.query(
        'INSERT INTO employee SET ?',
        employee,
        function (err, res) {
          if (err) throw err;
          start();
        }
      );
    });
}

function updateEmployeeRole() {
    
}