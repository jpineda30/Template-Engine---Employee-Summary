const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
var employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const options = [
    
    {
        
    type: 'rawlist',
    name: 'type',
    message: 'Select a type of employee',
    choices: [
       new inquirer.Separator(' '),

       {name:"Engineer"},
       {name:"Manager"},
       {name:"Intern"},
      
    ],
  }
];

const optionsEmployee = [
    {
        type: 'input',
        name: 'id',
        message: "What's the id of the employee?",
        /*validate: function (answer) {
            if (typeof answer != "number") {
                return console.log("\n Please register a numeric id");
            }
            return true;
        }*/
    },
    {
        type: 'input',
        name: 'name',
        message: "What's the name of the employee?",
        validate: function (answer) {
            if (answer.length < 3) {
                return console.log("\n The name is too short, add a longer name");
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "What's the e-mail of the employee?",
        validate: (input) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                return true;
            }
            return "Please enter a valid email address.";
        }
        
    }
];

const optionsManager = [
    ...optionsEmployee,
    {
        type: 'input',
        name: 'officeNumber',
        message: "What's the office number of the employee?",
    
    }
]

const optionsEngineer = [
    ...optionsEmployee,
    {
        type: 'input',
        name: 'gitHub',
        message: "What's the employee gitHub user?",
        validate: function (answer) {
            if (answer.length < 3) {
                return console.log("\n Enter a valid user");
            }
            return true;
        }
    
    }
]

const optionsIntern = [
    ...optionsEmployee,
    {
        type: 'input',
        name: 'school',
        message: "What's the employee school?",
        validate: function (answer) {
            if (answer.length < 3) {
                return console.log("\n Enter a valid school");
            }
            return true;
        }
    
    }
]

const initial = [
   
    {
        type: 'rawlist',
        name: 'response',
        message: "Do you want to add a new employee",
        choices: [

            
     
            {name:"Yes"},
            {name:"No"},
            new inquirer.Separator('   '),
           
         ]
    
    }
]


//functions 
async function inputManager(){

    
    let newEmployee = await inquirer.prompt(optionsManager).then((response) => {

        var manager = new Manager();
        manager.officeNumber = response.officeNumber;
        manager.id = response.id;
        manager.name = response.name;
        manager.email = response.email;
        employees.push(manager);
        

        return manager;
        
    });

    console.log("20")
    
}

async function inputEngineer(){

    
    let newEmployee = await inquirer.prompt(optionsEngineer).then((response) => {

        var engineer = new Engineer();
        
        engineer.id = response.id;
        engineer.name = response.name;
        engineer.email = response.email;
        engineer.github = response.gitHub;
       
        employees.push(engineer);

        return engineer;
        
    });

    
    
}

async function inputIntern(){

    
    let newEmployee = await inquirer.prompt(optionsIntern).then((response) => {

        var intern = new Intern(response.name,response.id,response.email,response.school);
   
       
        employees.push(intern);

        return intern;
        
    });

    
    
}

async function menu(){

    let response = await inquirer.prompt(options).then((response)=>{
             return response.type;
     });
     
   return response;
}

 async function init(){

    fs.writeFileSync("./output/Team.html", render(employees), (err) => {
    });
        
    console.log("Wealcome to Template Engine");
    console.log("Lets create your team");
    console.log("");
    console.log("Lets add the manager first");
    console.log("");

    let manager = await inputManager();
    
    var addEmp = "Yes"; 

    while(addEmp == "Yes"){

        let addEmployee = await newEmployee();
        console.log("")
        addEmp = addEmployee;

            if(addEmp == "Yes")
            {
                let option = await menu();
                //
                if(option =="Engineer")
                {
                    let newEmp = await inputEngineer(); 
                }
                else if(option =="Intern")
                {
                    let newEmp = await inputIntern(); 
                }
                else
                {
                    let newEmp = await inputManager(); 
                }
            }else{
            

                fs.writeFile("./output/Team.html", render(employees), (err) => {
                if (err) throw err;
                else console.log("HTML file created successfully");
            });
        }

        
       
    }
    
    

    

    
       

    
    

  
}  

async function newEmployee()
{
    let addEmployee = await inquirer.prompt(initial).then(function(response){
        return response.response;
    });

    return addEmployee;
    
}


init();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
