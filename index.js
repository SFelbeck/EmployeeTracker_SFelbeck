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

function addDepartment(){

}

function addRole(){

}

function addEmployee(){

}

function updateEmployee(){

}