const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'F00l3yco0l3!',
    database: 'employee_db',
})

const questions = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'Add a department',
            'View all roles',
            'Add a role',
            'View all employees',
            'Add an employee',
            'Update an employee role',
        ],
    },
];

// Run inquirer with questions
function initializePrompt() {
    inquirer
        .prompt(questions)
        .then((response) => {
            if (response.action === 'View all departments') {
                viewDepartments();
            } else if (response.action === 'View all roles') {
                viewRoles();
            }
        })
}

// View all departments
function viewDepartments() {
    connection.query('SELECT * FROM department', function (error, data) {
        console.table(data);
        initializePrompt();
    })
}

// View all roles
function viewRoles() {
    connection.query('SELECT * FROM role', function (error, data) {
        console.table(data);
        initializePrompt();
    });
}

initializePrompt();