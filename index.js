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
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
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
                viewEmployees();
            }
        })
}

// View all departments
function viewDepartments() {
    connection.query('SELECT * FROM department', function (error, data) {
        console.table(data);
    })
}