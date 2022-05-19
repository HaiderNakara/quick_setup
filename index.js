#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import { exec } from 'child_process';
import fs from 'fs';
import { createSpinner } from 'nanospinner';
let projectName = "projectTry";
async function main() {
  const answer1 = await inquirer.prompt({
    name: 'projectName',
    type: 'input',
    message: 'What is the name of your project?',
    default() {
      return 'my-project';
    },
  });
  projectName = answer1.projectName;


  const answer = await inquirer.prompt({
    name: 'stackName',
    type: 'list',
    message: 'What stack do you want to use?',
    choices: ["Mern", "Mern + Typescript", "React(Typescript) + Nestjs + MongoDb", "React", "React(Typescript)", "Nestjs",
    "Nestjs + MongoDb", "Express(Typescript)"
    ],

  });
  console.log(chalk.green(`You have selected ${answer.stackName}`));
  return createProject(projectName, answer.stackName);
}

async function createProject(name, stackName) {
  console.clear();
  console.log(chalk.green(`Creating project ${name}`));
  switch (stackName) {
    case "Mern":
      createMern(name);
      break;
    case "Mern + Typescript":
      createMernTypescript(name)
      break;
    case "React(Typescript) + Nestjs + MongoDb":
      createReactNestJsMongo(name);
      break;
     case "React":
      createReact(name);
        break;
      case "React(Typescript)":
        createRectTypescript(name);
        break;        
      case "Nestjs":
        createNestJs(name);
        break;
      case "Nestjs + MongoDb":
          createNestJsMonogo(name);
          break;
      case "Express(Typescript)":
        createExpressTypescript(name);
        break;
        case "Express":
          createExpress(name);
            break;                         
  
}
}
await main();

function createMern(name) {
  exec(`mkdir ${name} && cd ${name} && npx create-react-app ${name}_frontend && cd ${name}_frontend && npm install axios @reduxjs/toolkit react-redux redux react-router-dom react-router && cd .. && mkdir ${name}_backend && cd ${name}_backend && npm init -y && npm install express mongoose dotenv nodemon body-parser cors && cd ..`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    fs.writeFile(`${name}/${name}_backend/index.js`, `
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(process.env.PORT || 5000, () => {
  console.log('Server started on port ${process.env.PORT || 5000}');
});`, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  });
}

function createMernTypescript(name) {
  exec(`mkdir ${name} && cd ${name} && npx create-react-app ${name}_frontend --template typescript && cd ${name}_frontend && npm install axios @reduxjs/toolkit react-redux redux react-router-dom react-router && cd .. && mkdir ${name}_backend && cd ${name}_backend && npm init -y && npm install express mongoose dotenv nodemon body-parser cors && npm i -D typescript ts-node && mkdir src &&cd ..`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    fs.writeFile(`${name}/${name}_backend/src/index.ts`, `import express from "express";
  import dotenv from "dotenv";
  import cors from "cors";
  import bodyParser from "body-parser";
  import {Request,  Response} from 'express';
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
  });
  app.listen(process.env.PORT || 5000, () => {
      console.log('Server started on port ${process.env.PORT || 5000}');
  });`, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });

    fs.writeFile(`${name}/${name}_backend/tsconfig.json`, `{
    "compilerOptions": {
      "target": "es2016",                                  
      "module": "commonjs",                                
      "rootDir": "./src",                                  
      "moduleResolution": "node",                       
      "outDir": "./dist",                                  
      "esModuleInterop": true,                          
      "forceConsistentCasingInFileNames": true,            
      "strict": true,                                      
      "skipLibCheck": true                                
    }
  }`,
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
  });
}

function createReactNestJsMongo(name) {
  exec(`mkdir ${name} && cd ${name} && npx create-react-app ${name}_frontend --template typescript && cd ${name}_frontend && npm install axios @reduxjs/toolkit react-redux redux react-router-dom react-router && cd .. && nest new ${name}_backend --package-manager npm && cd  ${name}_backend && npm install --save @nestjs/mongoose mongoose @nestjs/swagger swagger-ui-express`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }

  });
}

function createReact(name) {
  exec(`mkdir ${name} && cd ${name} && npx create-react-app ${name}_frontend && cd ${name}_frontend && npm install axios @reduxjs/toolkit react-redux redux react-router-dom react-router && cd ..`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

function createRectTypescript(name) {
  exec(`mkdir ${name} && cd ${name} && npx create-react-app ${name}_frontend --template typescript && cd ${name}_frontend && npm install axios @reduxjs/toolkit react-redux redux react-router-dom react-router && cd ..`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

function createNestJs(name) {
  exec(`mkdir ${name} && cd ${name} && npx nest new ${name}_backend --package-manager npm`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}
function createNestJsMonogo(name) {
  exec(`mkdir ${name} && cd ${name} && npx nest new ${name}_backend --package-manager npm && cd ${name}_backend && npm install --save @nestjs/mongoose mongoose @nestjs/swagger swagger-ui-express`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

 function  createExpressTypescript(name)  {
  exec(`mkdir ${name} && cd ${name} &&  mkdir ${name}_backend && cd ${name}_backend && npm init -y && npm install express mongoose dotenv nodemon body-parser cors && npm i -D typescript ts-node && mkdir src &&cd ..`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    fs.writeFile(`${name}/${name}_backend/src/index.ts`, `import express from "express";
    import dotenv from "dotenv";
    import cors from "cors";
    import bodyParser from "body-parser";
    import {Request,  Response} from 'express';
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get("/", (req: Request, res: Response) => {
        res.send("Hello World!");
    });
    app.listen(process.env.PORT || 5000, () => {
        console.log('Server started on port ${process.env.PORT || 5000}');
    });`, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });

      fs.writeFile(`${name}/${name}_backend/tsconfig.json`, `{
      "compilerOptions": {
        "target": "es2016",                                  
        "module": "commonjs",                                
        "rootDir": "./src",                                  
        "moduleResolution": "node",                       
        "outDir": "./dist",                                  
        "esModuleInterop": true,                          
        "forceConsistentCasingInFileNames": true,            
        "strict": true,                                      
        "skipLibCheck": true                                
      }
    }`,
        function (err) {
          if (err) {
            return console.log(err);
          }
          console.log("The file was saved!");
        });
  });
}

function createExpress(name) {
  exec(`mkdir ${name} && cd ${name} &&   mkdir ${name}_backend && cd ${name}_backend && npm init -y && npm install express mongoose dotenv nodemon body-parser cors`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    fs.writeFile(`${name}/${name}_backend/index.js`, `
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(process.env.PORT || 5000, () => {
  console.log('Server started on port ${process.env.PORT || 5000}');
});`, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  });

}