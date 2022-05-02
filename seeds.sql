INSERT INTO department (name)
VALUES ("Accounting"),
       ("Programming"),
       ("Legal"),
       ("Velociraptor Handling");

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 45.56, 1),
       ("Lead Programmer", 100.87, 2),
       ("Programmer", 100.85, 2),
       ("Lawyer", 78.32, 3),
       ("Jury", 60.42, 3),
       ("victem", 5.79, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Noombah", "Krancher", 1),
       ("Steve", "Just Steve", 1),
       ("Stefan", "Felbeck", 2),
       ("Greg", "Seymor", 3, 2),
       ("Jonmathy", "Jackson", 3, 2),
       ("Madison", "Lacke", 4),
       ("Nota", "Bribe", 5, 4),
       ("Who", "Cares", 6);