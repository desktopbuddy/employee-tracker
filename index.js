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
            } else if (response.action === 'View all employees') {
                viewEmployees();
            } else if (response.action === 'Add a department') {
                addDepartment();
            } else if (response.action === 'Add a role') {
                addRole();
            } else if (response.action === 'Add an employee') {
                addEmployee();
            } else if (response.action === 'Update an employee role') {
                updateEmployeeRole();
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

// Add a department
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'text',
                name: 'name',
                message: 'What is the name of the department?'
            },
        ])
        .then(function (response) {
            connection.query(
                'INSERT INTO department (name) values(?)',
                [response.name],
                function (error, data) {
                    console.table(data);
                    initializePrompt();
                }
            )
        })
}

// View all roles
function viewRoles() {
    connection.query('SELECT * FROM role', function (error, data) {
        console.table(data);
        initializePrompt();
    });
}

// Add a role
function addRole() {
    connection.query('SELECT * FROM department', function (error, departments) {
        inquirer
            .prompt([
                {
                    type: 'text',
                    name: 'title',
                    message: 'What is the name of the role?',
                },
                {
                    type: 'text',
                    name: 'salary',
                    message: 'What is the salary of the role?',
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'What is the department of the role?',
                    choices: departments.map((department) => department.name),
                    filter: function (choice) {
                        return departments.find((department) => department.name === choice).id;
                    },
                },
            ])
            .then(function (response) {
                const newRole = {
                    title: response.title,
                    salary: response.salary,
                    department_id: response.department,
                };
                connection.query(
                    'INSERT INTO role SET ?',
                    newRole,
                    function (error, data) {
                        console.table(data);
                        initializePrompt();
                    }
                );
            });
    });
}

// View all employees
function viewEmployees() {
    connection.query('SELECT * FROM employee', function (error, data) {
        console.table(data);
        initializePrompt();
    });
}

// Add an employee
function addEmployee() {
    connection.query('SELECT * FROM role', function (error, roles) {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "What is the employee's first name?",
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "What is the employee's last name?",
                },
                {
                    type: 'list',
                    name: 'role_id',
                    choices: roles.map((role) => role.title),
                    message: "What is the employee's role?",
                    filter: function (choice) {
                        return roles.find((role) => role.title === choice).id;
                    },
                },
                {
                    type: 'input',
                    name: 'manager_id',
                    message: "Who is the employee's manager? Enter manager ID or 'none'",
                    filter: function (choice) {
                        if (choice.toLowerCase() === 'none') {
                            return null;
                        } else return choice;
                    },
                },
            ])
            .then(function (response) {
                const employee = {
                    manager_id: response.manager_id,
                    first_name: response.first_name,
                    last_name: response.last_name,
                    role_id: response.role_id,
                };
                connection.query(
                    'INSERT INTO employee SET ?',
                    employee,
                    function (error, data) {
                        console.table(data);
                        initializePrompt();
                    }
                );
            });
    });
}

// Update an employee's role
function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'text',
                name: 'employee_id',
                message: 'What is the employee ID?',
            },
            {
                type: 'text',
                name: 'role_id',
                message: 'What is the role ID?',
            },
        ])
        .then(function (response) {
            connection.query(
                'UPDATE employee SET role_id = ? WHERE id = ?',
                [response.role_id, response.employee_id],
                function (error, data) {
                    console.table(data);
                    initializePrompt();
                }
            );
        });
}

initializePrompt();