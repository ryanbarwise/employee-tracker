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
        'View All Departments', //
        'View All Roles', //
        'Add Employee', //
        'Add Department',//
        'Add Role',//
        'Update Employee Role',
        'Remove Employee',
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

        case 'View All Departments':
          viewDepartments();
          break;

        case 'View All Roles':
          viewRoles();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Add Department':
          addDepartment();
          break;

        case 'Add Role':
          addRole();
          break;

        case 'Update Employee Role':
          updateEmployeeManager();

        case 'Remove Employee':
          removeEmployee();
      }
    });
}

function allEmployees() {
  connection.query('SELECT * FROM employee', function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewDepartments() {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewRoles() {
  connection.query('SELECT * FROM role', function (err, res) {
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
        message: 'What is employee role? id',
      },
      {
        name: 'manager_id',
        type: 'number',
        message: 'What is manager id?',
      },
    ])
    .then((employee) => {
      connection.query('INSERT INTO employee SET ?', employee, function (
        err,
        res
      ) {
        if (err) throw err;
        start();
      });
    });
}

function addDepartment() {
  inquirer.prompt(
    { name: 'name', type: 'text', message: 'Please add a department' },
  )

  .then((department) => {
      connection.query('INSERT INTO department SET ?', department, function ( 
          err,
          res
      ) {
          if (err) throw err;
      start();
      });
  });
}


function addRole() {
    inquirer.prompt([
        {
            name: "title",
            type: "text",
            message: "Please create a role"
        },
        {
            name: "salary",
            type: "number",
            message: "What is the salary of this role"
        },
        {
            name: "department_id",
            type: "number",
            message: "What is the department id?"
        }
    ]).then((role) => {
        connection.query('INSERT INTO role SET ?' , role, function(err, res){
            if (err) throw err;
            start();
        });
    });
}

// function removeEmployee() {
//   inquirer
//     .prompt([
//       {
//         name: 'first_name',
//         type: 'input',
//         message: 'What is employee\'s first name?',
//       },
//       {
//         name: 'last_name',
//         type: 'input',
//         message: 'What is employee\'s last name?',
//       },
//       {
//         name: 'role_id',
//         type: 'number',
//         message: 'What is employee\'s role_id?',
//       },
//       {
//         name: 'manager_id',
//         type: 'number',
//         message: 'What is manager id?',
//       },
//     ])
//     .then((employee) => {
//       connection.query('DELETE FROM employee WHERE ? ', employee, function (
//         err,
//         res
//       ) {
//         if (err) throw err;
//         start();
//       });
//     });
// }

// function updateEmployeeRole() {
//   inquirer.prompt([
//     {
//       name: 'title',
//       type: 'text',
//       message: 'What is employees Role?',
//     },
//     { name: 'salary', type: 'number', message: 'What is employees salary?' },
//     {
//       name: 'department_id',
//       type: 'number',
//       message: 'What is the employees id?',
//     },
//   ]).then((role) => {
//       conncection.query("INSERT INTO role SET ?", role, function (
//         err,
//         res
//       ) {
//           if (err) throw err;

//           start();
//       });
//     });
// }
