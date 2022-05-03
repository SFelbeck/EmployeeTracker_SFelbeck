-- inserts some example departments
INSERT INTO department (name)
VALUES ("Accounting"),
       ("Programming"),
       ("Legal"),
       ("Velociraptor Handling");

--inserts some example roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 4556, 1),
       ("Lead Programmer", 10087, 2),
       ("Programmer", 10085, 2),
       ("Lawyer", 7832, 3),
       ("Jury", 6042, 3),
       ("victem", 579, 4);

--inserts some example employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Noombah", "Krancher", 1, NULL),
       ("Steve", "Just Steve", 1, NULL),
       ("Stefan", "Felbeck", 2, NULL),
       ("Greg", "Seymor", 3, 2),
       ("Jonmathy", "Jackson", 3, 2),
       ("Madison", "Lacke", 4, NULL),
       ("Nota", "Bribe", 5, 4),
       ("Who", "Cares", 6, NULL);