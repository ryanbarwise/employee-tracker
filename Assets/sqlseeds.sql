
INSERT INTO role (title, salary, department_id)
VALUES ("musician", 90.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("teacher", 100.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("doctor", 500.00, 3);

INSERT INTO role(title, salary, department_id)
VALUES ("cook", 60.00, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Smith", 3, 9), ("Beth", "Baldwin", 1, 7), ("Peter", "Parker", 2, 8), ("Wendy", "Rodriguez", 4, 2);

INSERT INTO department (name)
VALUES ("Waste Management"), ("Culture"), ("Tech"), ("Health")
