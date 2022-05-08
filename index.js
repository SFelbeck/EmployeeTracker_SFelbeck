const mysql = require('mysql2');
const inquirer = require('inquirer');

//creates a mysql connection to the employee database
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
    //iquirer list that desplays user options
    inquirer.prompt (
        {
            type: 'list',
            name: 'menu',
            choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit']
        }
        //.then followed by if statements that call appropriate functions based on menu choice
    ).then(res => {
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

// function that returns the department table, console logs the results and returns to main menu
const viewDepartments = () => {
    db.query('SELECT * FROM department', function (err, results){
        console.log(results);
        mainMenu();
    })
}

// function that returns the roles table, console logs the results and returns to main menu (side note: should probably join with departments before grading)
const viewRoles = () => {
    db.query('SELECT * FROM roles', function (err, results){
        console.log(results);
        mainMenu();
    })
}

// function that returns the employee table, console logs the results and returns to main menu (side note: should probably join with roles, departments, and self for manager id before grading)
const viewEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results){
        console.log(results);
        mainMenu();
    })
}

//adds a new department to the departments table based purely on inquirer inputs
const addDepartment = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the new department?'
        }
        // a .then statement that uses our added values and inserts them into the department table, console logs on success and then returns to the main menu
    ]).then(res => {
        db.query('INSERT INTO department (name) VALUES (?)', [res.name], (err, data) => {
            console.log('Added new department!');
            mainMenu();
        })
    })
}
//adds a new role to the roles table based purely on inquirer inputs (side note: this doesnt work yet and i have no idea why)
const addRole = () => {
    const sql = 'SELECT * FROM department';
    db.query(sql, (err, res) => {
        if (err){
            throw err;
        }
        const departments = res;
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
            type: 'list',
            name: 'departmentName',
            message: "what department is this role in?",
            choices: res.map(department => department.name)
        }
        // a .then statement that uses our added values and inserts them into the roles table, console logs on success and then returns to the main menu
    ]).then(results => {
        const selectedDepartment = res.find(department => department.name === results.departmentName)
        db.query(
            'INSERT INTO roles SET ?', {
                title: results.title,
                salary: results.salary,
                department_id: selectedDepartment.id
            }, (err, data) => {
            if(err)
                throw err,
            console.log('Added new role!');
            mainMenu();
        })
    })
})
}

//adds a new employee to the employee table based purely on inquirer inputs (side note: I would like to clean this up to prevent errors before this is graded)
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
        // a .then statement that uses our added values and inserts them into the employee table, console logs on success and then returns to the main menu
    ]).then(res => {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.role, res.manager], (err, data) => {
            console.log('Added new employee!');
            mainMenu();
        })
    })
}

// In theory this function updates the employee's role value (or others possibly), but it currently does not work
const updateEmployee = () => {
    inquirer.prompt(
        
        {
            type: 'list',
            name: 'selection',
            choices: [employee => employee.first_name]
        }
    ).then(res =>{
        let updateEmployee = (res.selection);
        db.query('SELECT * FROM roles', res.first_name, (err, data) =>{
            // if(res.selection === 'First name'){
                inquirer.prompt(
                    {
                        type: 'list',
                        name: 'newrole',
                        message: 'What is the new role?',
                        choices: res.map(roles => roles.title)
                    }
                ).then(results => {
                    const chosenRole = results.find(roles => roles.title === answer.newRole)
                    db.query('UPDATE employee SET ? WHERE first_name = ' + "'" + updateEmployee + "'", {newRole: "" + chosenRole + "",});
                    mainMenu();
                })
                
            
        })
    })
}