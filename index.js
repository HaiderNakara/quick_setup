#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import { promises as fs } from 'fs';
import { createSpinner } from 'nanospinner';
import child_process from 'child_process';
import util from 'util'
let projectName = "projectTry";
const exec = util.promisify(child_process.exec);
// function run(cmd) {
//   return new Promise((resolve, reject) => {
//     exec(cmd, (error, stdout, stderr) => {
//       if (error) return reject(error)
//       if (stderr) return reject(stderr)
//       resolve(stdout)
//     })
//   })
// }
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
      "Nestjs + MongoDb", "Express(Typescript)", "Express"],

  });
  console.log(chalk.green(`You have selected ${answer.stackName}`));
  return createProject(projectName, answer.stackName);
}

async function createProject(name, stackName) {
  console.clear();
  console.log(chalk.green(`Creating project ${name}`));
  switch (stackName) {
    case "Mern":
      await createMern(name);
      break;
    case "Mern + Typescript":
      await createMernTypescript(name)
      break;
    case "React(Typescript) + Nestjs + MongoDb":
      await createReactNestJsMongo(name);
      break;
    case "React":
      await createReact(name);
      break;
    case "React(Typescript)":
      await createRectTypescript(name);
      break;
    case "Nestjs":
      await createNestJs(name);
      break;
    case "Nestjs + MongoDb":
      await createNestJs(name);
      break;
    case "Express(Typescript)":
      await createExpressTypescript(name);
      break;
    case "Express":
      await createExpressJavascript(name);
      break;
  }
}
await main();
async function createDict(name) {
  try {

    await exec(`mkdir ${name}`);
  } catch (error) {
    console.log(error);
  }
}

async function createMern(name) {
  try {
    await createDict(name);
    await createExpress_Js(name);
    await createReact_Js(name);
  } catch (error) {
    console.log(error);
  }
}

async function createMernTypescript(name) {
  try {
    await createDict(name);
    await createExpress_Ts(name);
    await createReact_Ts(name);
  } catch (error) {
    console.log(error);
  }
}


async function createReactNestJsMongo(name) {
  try {
    await createDict(name);
    await createReact_Ts(name);
    await create_nestjs(name);
  } catch (error) {
    console.log(error);
  }
}
async function createReact(name) {
  try {
    await createDict(name);
    await createReact_Js(name);
  } catch (error) {
    console.log(error);
  }
}
async function createRectTypescript(name) {
  try {

    await createDict(name);
    await createReact_Ts(name);
  } catch (error) {
    console.log(error);
  }
}
async function createNestJs(name) {
  try {
    await createDict(name);
    await create_nestjs(name);
  } catch (error) {
    console.log(error);
  }
}


async function createExpressTypescript(name) {
  try {
    await createDict(name);
    await createExpress_Ts(name);

  } catch (error) {
    console.log(error);
  }
}
async function createExpressJavascript(name) {
  try {
    await createDict(name);
    await createExpress_Js(name);

  } catch (error) {
    console.log(error);
  }
}
async function create_nestjs(name) {
  await exec(`cd ${name} && npx nest new ${name}_backend --package-manager npm && cd ${name}_backend && npm install @nestjs/mongoose mongoose @nestjs/swagger swagger-ui-express`);
  await fs.writeFile(`${name}/${name}_backend/src/main.ts`,
    `import { NestFactory } from '@nestjs/core';
   import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
   import { AppModule } from './app.module';

   async function bootstrap() {
     const app = await NestFactory.create(AppModule);
     const config = new DocumentBuilder()
       .setTitle('Cats example')
       .setDescription('The cats API description')
       .setVersion('1.0')
       .addTag('cats')
       .build();
     const document = SwaggerModule.createDocument(app, config);
     SwaggerModule.setup('api', app, document);
     await app.listen(3000);
   }
   bootstrap();
   `,
  );
}




async function createExpress_Ts(name) {
  await exec(`cd ${name} &&  mkdir ${name}_backend && cd ${name}_backend && mkdir src && cd ..`);
  await fs.writeFile(`${name}/${name}_backend/src/index.ts`, `import express from "express";
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
      });`);

  await fs.writeFile(`${name}/${name}_backend/tsconfig.json`, `{
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
      }`

  );
  await fs.writeFile(`${name}/${name}_backend/package.json`, `
          {
            "name": "${name}_backend",
            "version": "1.0.0",
            "description": "",
            "main": "index.js",
            "scripts": {
              "start": "nodemon src/index.js"
            },
            "keywords": [],
            "author": "",
            "license": "ISC",
            "dependencies": {
            },
            "devDependencies": {
            }
          }
          `
  );
  await exec(`cd ${name}/${name}_backend && npm install express mongoose dotenv nodemon body-parser cors && npm i -D typescript @types/express @types/node @types/cors && cd ..`
  );

}


async function createExpress_Js(name) {
  await exec(`cd ${name} && mkdir ${name}_backend && cd ${name}_backend`);
  await fs.writeFile(`${name}/${name}_backend/index.js`, `
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
});`);
  await fs.writeFile(`${name}/${name}_backend/package.json`, `
  {
    "name": "${name}_backend",
    "version": "1.0.0",
    "description": "",
    "type": "module",
    "main": "index.js",
    "scripts": {
      "start": "nodemon index.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
    },
    "devDependencies": {
    }
  }
  `
  );
  await exec(`cd ${name}/${name}_backend && npm install express mongoose dotenv nodemon body-parser cors`,
  );
}


async function createReact_Js(name) {
  await exec(`cd ${name} && npx create-react-app ${name}_frontend && cd ${name}_frontend && npm install axios @reduxjs/toolkit react-redux redux react-router-dom react-router`,);
}
async function createReact_Ts(name) {
  await exec(`cd ${name} && npx create-react-app ${name}_frontend --template typescript && cd ${name}_frontend && npm install axios @reduxjs/toolkit react-redux redux react-router-dom react-router`,);
}