const inquirer = require('inquirer');
const db = require('./config/connection')

db.connect((err)=> {
    if (err) throw err;
    console.log('Connected to database');
});

function questions() {
  inquirer
    .prompt({
      type: "list",
      name: "questions",
      message: "What would like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Exit Here"
      ],
    })
    .then(function(answers){
        
      if (answers.questions === "View All Employees") {
        //call employee function here
      } else if (answers.questions === "View All Employees By Department") {
        //call employee by department
      } else if (answers.questions === "View All Employees By Manager") {
        // call employee by manager
      } else if (answers.questions === "Add Employee") {
        // call add employee
      } else if (answers.questions === "Remove Employee") {
        // call remove employee
      } else if (answers.questions === "Update Employee Role") {
        // call update employee role
      } else if (answers.questions === "Update Employee Manager") {
        // call Update Employee Manager
      } else if (answers.questions === "View All Roles") {
        getRoles();
      }else if (answers.questions === "Exit Here") {
        // exit
      }
    })
}

function getRoles(){
const sql = `SELECT * FROM roles;`;
  db.query(sql, function(err, res)  {
   if(err) throw err
    console.table(res);
  })
}


questions();
