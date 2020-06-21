var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
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
      type: 'list',
      message: 'What would you like to do',
      choices: [
        'View All Employees', //
        'View All Departments', //
        'View All Roles', //
        'Add Employee', //
        'Add Department',//
        'Add Role',//
        'Update Employee Role',
        'Remove Employee'
        // "View All By Department",
        // "View All Employees By Manager",
        // "Remove Employee",
        // "Update Employee Manager"
      ]
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
          updateEmployeeRole();
          break;

        case 'Remove Employee':
          removeEmployee();
          break;
      }
    });
}

function allEmployees() {
  connection.query('SELECT first_name, last_name, role_id, title, salary, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id ', function (err, res) {
    // if (err) throw err;
  // connection.query("SELECT * FROM employee" , function(err, res){
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
        message: 'What is employee\'s first name?',
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'What is employee\'s last name?',
      },
      {
        name: 'role_id',
        type: 'number',
        message: 'What is employee\'s role id',
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
  //  const employeelist = connection.query("SELECT id, first_name, last_name FROM employee", function (err, res){
  //    if (err) throw err;
  //   //  console.table(res);
  //  });
function removeEmployee(){
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "text",
        message: "What is employee\'s first name"
        
    },
      {
        name: "last_name",
        type: "text",
        message: "What is employee\'s last name?"
      }
    ])
    .then((answer) => {
      connection.query('DELETE FROM employee WHERE first_name = ? AND last_name = ? ', [answer.first_name, answer.last_name], function (
        err,
        res
      ) {
        if (err) throw err;
        start();
      });
    });
  }


function updateEmployeeRole() {
  inquirer.prompt([
    {
        name: "first_name",
        type: "text",
        message: "What is the employee\'s first name?"
    },

    {
      name: "last_name",
      type: "text",
      message: "What is the employee\'s last name?"

    },
    
    {
      name: "role_id",
      type: "number",
      message: "What is the new role id of this employee? "
    }


]).then((answers) => {
      connection.query("UPDATE employee SET role_id = ?  WHERE first_name = ? AND last_name = ?", [answers.role_id, answers.first_name, answers.last_name] , function (
        err,
        res
      ) {
          if (err) throw err;

          start();
      });
    });
}


