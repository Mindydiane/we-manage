// Import inquirer and connection
const inquirer = require("inquirer");
const db = require("./config/connection");

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});
//function to show questions
function questions() {
  inquirer
    .prompt({
      type: "list",
      name: "questions",
      message: "What would like to do?",
      choices: [
        "View All Departments",
        "View All Employees",
        "View All Roles",
        "Add Role",
        "Add Department",
        "Add Employee",
        "Update Employee Role",
        "Exit Here",
      ],
    })
    .then(function (answers) {
      if (answers.questions === "View All Employees") {
        getEmps();
      } else if (answers.questions === "View All Departments") {
        getDept();
      } else if (answers.questions === "View All Roles") {
        getRoles();
      } else if (answers.questions === "Add Employee") {
        addEmp();
      } else if (answers.questions === "Add Department") {
        addDept();
      } else if (answers.questions === "Update Employee Role") {
        // call update employee role
      } else if (answers.questions === "Add Role") {
        addRole()
      } else if (answers.questions === "Exit Here") {
        // exit
      }
    });
}

//shows roles
function getRoles() {
  const sql = `SELECT * FROM roles;`;
  db.query(sql, function (err, res) {
    if (err) throw err;
    console.table(res);
    questions();
  });
}

//shows employees
function getEmps() {
  const sql = ` SELECT employee.first_name, employee.last_name,  roles.title,
    roles.salary, department.name, CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employee LEFT JOIN roles on employee.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id;`;
  db.query(sql, function (err, res) {
    if (err) throw err;
    console.table(res);
    questions();
  });
}

//shows department
function getDept() {
  const sql = `SELECT * FROM department;`;
  db.query(sql, function (err, res) {
    if (err) throw err;
    console.table(res);
    questions();
  });
}


//add department
function addDept() {
    inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "What is the name of the department?",
      }
    ])
    .then(function (inform) {
      const depart = inform.deptName;
      
      
      const sql = `INSERT INTO department (name)
        VALUES ('${depart}')`;
      db.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        questions();
      })
    });
};

//add a role
function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "titleInfo",
          message: "What title does the role have?",
        },
        {
          type: "input",
          name: "income",
          message: "How much is the salary?",
        },
        {
          type: "input",
          name: "dpt",
          message: "What is the departments id?",
        }
      ])
      .then(function (info) {
        const roleTi = info.titleInfo;
        const roleIn = info.income;
        const roleDt = info.dpt;
        
        
        const sql = `INSERT INTO roles (title, salary, department_id)
          VALUES ('${roleTi}', '${roleIn}', '${roleDt}')`;
        db.query(sql, function (err, res) {
          if (err) throw err;
          console.table(res);
          questions();
        })
      });
  };

//add employee
function addEmp() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "empRole",
        message: "What is the employee's role?",
      },
      {
        type: "input",
        name: "mgr",
        message: "Enter the managers id? ",
      },
    ])
    .then(function (info) {
      const infoFirst = info.firstName;
      const infoLast = info.lastName;
      const infoRole = info.empRole;
      const infoMgr = info.mgr;
      
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ('${infoFirst}', '${infoLast}', '${infoRole}', '${infoMgr}')`;
      db.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        questions();
      })
    });
};

//update an employee role

questions();


