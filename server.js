const inquirer = require("inquirer");
const db = require("./config/connection");

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

function questions() {
  inquirer
    .prompt({
      type: "list",
      name: "questions",
      message: "What would like to do?",
      choices: [
        "View All Departments",
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Department",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Exit Here",
      ],
    })
    .then(function (answers) {
      if (answers.questions === "View All Employees") {
        getEmps();
      } else if (answers.questions === "View All Employees By Department") {
        //call employee by department
      } else if (answers.questions === "View All Departments") {
        getDept();
      } else if (answers.questions === "Add Department") {
        addDept();
      } else if (answers.questions === "Add Employee") {
        // post/call add employee
      } else if (answers.questions === "Remove Employee") {
        // call remove employee
      } else if (answers.questions === "Update Employee Role") {
        // call update employee role
      } else if (answers.questions === "") {
        // call Update Employee Manager
      } else if (answers.questions === "View All Roles") {
        getRoles();
      } else if (answers.questions === "Exit Here") {
        // exit
      }
    });
}

function getRoles() {
  const sql = `SELECT * FROM roles;`;
  db.query(sql, function (err, res) {
    if (err) throw err;
    console.table(res);
  });
}

function getEmps() {
  const sql = ` SELECT employee.first_name, employee.last_name,  roles.title,
    roles.salary, department.name, CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee LEFT JOIN roles on employee.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id;`;
  db.query(sql, function (err, res) {
    if (err) throw err;
    console.table(res);
  });
}

function getDept() {
  const sql = `SELECT * FROM department;`;
  db.query(sql, function (err, res) {
    if (err) throw err;
    console.table(res);
  }).then(() => questions());
}

function addDept() {
  const sql = `INSERT INTO department (name) 
  VALUES (?)`;
  const params = [body.name];
  db.query(sql, function (err, res) {
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  });
}
// function fltbymgr() {
//   const mgrArr = [];
//   db.query(`SELECT * FROM managers;`, (err, res) => {
//     if (err) throw err;
//     res.forEach((manager) =>
//       mgrArr.push(`${manager.first_name} ${manager.last_name}`)
//     );
//     inquirer
//       .prompt([
//         {
//           name: "action",
//           type: "list",
//           message: "Select a Manager?",
//           choices: mgrArr,
//         },
//       ])
//       .then((answer) => {
//         const sql = `SELECT
//                 employee.id,
//                 employee.first_name,
//                 employee.last_name,
//                 roles.title AS title,
//                 departments.title AS department,
//                 roles.salary
//             FROM
//                 employee
//             LEFT JOIN
//                 roles ON employee.role_id = roles.id
//             LEFT JOIN
//                 department ON department.id = roles.department_id
//             LEFT JOIN
//                 managers ON employee.manager_id = managers.id
//             WHERE CONCAT(managers.first_name, ' ',managers.last_name) = ?;`;
//         const manager = answer.action;
//         db.query(sql, manager, (err, res) => {
//           if (err) throw err;
//           console.log(`
//                     Here are the employees managed by ${manager}
//                     `);
//           console.table(res);
//           employeeFilter();
//         });
//       });
//   });
// }

questions();
