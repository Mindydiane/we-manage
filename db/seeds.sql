
INSERT INTO department (name)
VALUES ('Management'),
   ('Marketing'),
   ('Engineer'),
   ('Sales');
   
INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Manager', 67000, 1),
   ('Marketing Manager', 75000, 1),
   ('Engineer Manager', 80000, 1),
   ('Market Research Analyst', 55000, 2),
   ('Industrial Engineer', 65000, 3),
   ('Civil Engineer', 68000, 3),
   ('Design Engineer', 58000, 3),
   ('Sales Consultant', 50000, 4),
   ('Sales Representative', 47000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Beverley', 'Lovitt', 1, NULL),
   ('Jane', 'Doe', 2, NULL),
   ('Faber', 'Caunter', 3, NULL),
   ('Owen', 'Roxby', 4, 2),
   ('Tom', 'Jones', 4, 2),
   ('Niki', 'Stailey', 5, 3),
   ('Brandi', 'Grog', 5, 3),
   ('Niki', 'Stailey', 6, 3),
   ('Angeli', 'Kille', 6, 3),
   ('Devy', 'Bland', 7, 3),
   ('Monty', 'Dyke', 8, 1),
   ('Rozelle', 'Downing', 9, 1),
   ('Niki', 'Roxby', 9, 1);
