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

function mainMenu(){
    inquirer.prompt ([
        {
            type: 'list',
            name: 'menu',
            choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
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
            console.log('Error: This message shouldnt be displaying here');
        }
    })
}

function viewDepartments(){

}

function viewRoles(){

}

function viewEmployees(){

}

function addDepartment(){

}

function addRole(){

}

function addEmployee(){

}

function updateEmployee(){
    
}