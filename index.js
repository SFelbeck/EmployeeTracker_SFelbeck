const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employees_db'
    },
    console.log('Connected to employees_db database')
);

mainMenu();
function mainMenu(){
    inquirer.prompt ([
        {
            type: 'list',
            name: 'menu',
            choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit']
        }
    ]).then(res => {
        if (res.menu === 'View Departments'){
            viewDepartments();
        } else if (res.menu === 'View Roles'){
            viewRoles();
        } else if (res.menu === 'View Employees'){
            viewEmployees();
        } else if (res.menu === 'Add Department'){
            addDepartment();
        } else if (res.menu === 'Add Role'){
            addRole();
        }else if (res.menu === 'Add Employee'){
            addEmployee();
        }else if (res.menu === 'Update Employee Role'){
            updateEmployee();
        } else {
            process.exit();
        }
    })
}

const viewDepartments = () => {
    db.query('SELECT * FROM department', function (err, results){
        console.log(results);
        mainMenu();
    })
}

const viewRoles = () => {
    db.query('SELECT * FROM roles', function (err, results){
        console.log(results);
        mainMenu();
    })
}

const viewEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results){
        console.log(results);
        mainMenu();
    })
}

const addDepartment = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the new department?'
        }
    ])
    db.query('INSERT INTO department (name) VALUES (?)', [res.name], (err, data) => {
        console.log('Added new department!');
        mainMenu();
    })
}

const addRole = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the new role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'In decimal form, what is the average salary of the new role?'
        },
        {
            type: 'input',
            name: 'department',
            message: 'What department will this role be under?'
        }
    ])
    db.query('INSERT INTO roles (name, salary, department_id) VALUES (?, ?, ?)', [res.name, res.salary, res.department], (err, data) => {
        console.log('Added new role!');
        mainMenu();
    })
}

const addEmployee = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the new employee?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the new employee?'
        },
        {
            type: 'input',
            name: 'role',
            message: 'What is the role of the new employee?'
        },
        {
            type: 'input',
            name: 'manager',
            message: 'What is the employee id of the manager for this employee?'
        }
    ])
    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.role, res.manager], (err, data) => {
        console.log('Added new employee!');
        mainMenu();
    })
}

function updateEmployee(){

}