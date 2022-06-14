import { exec } from "child_process";
import { promisify } from "util";
import { createDict } from "./util_fn";
import * as fs from "fs/promises";
const exec_run = promisify(exec);
export async function createExpressTypescript(name: string) {
  try {
    await createDict(name);
    await createExpress_Ts(name);
  } catch (error) {
    console.log(error);
  }
}
export async function createExpressJavascript(name: string) {
  try {
    await createDict(name);
    await createExpress_Js(name);
  } catch (error) {
    console.log(error);
  }
}
export async function createExpress_Ts(name: string) {
  await exec_run(
    `cd ${name} &&  mkdir ${name}_backend && cd ${name}_backend && mkdir src && cd ..`
  );
  await fs.writeFile(
    `${name}/${name}_backend/src/index.ts`,
    `import express from "express";
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
      });`
  );

  await fs.writeFile(
    `${name}/${name}_backend/tsconfig.json`,
    `{
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
  await fs.writeFile(
    `${name}/${name}_backend/package.json`,
    `
          {
            "name": "${name}_backend",
            "version": "1.0.0",
            "description": "",
            "main": "index.js",
            "scripts": {
              "start": "nodemon src/index.ts"
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

  await fs.writeFile(`${name}/${name}_backend/.env`, `PORT=5000`);

  await fs.writeFile(
    `${name}/${name}_backend/.gitignore`,
    `node_modules
    .env
          `
  );

  await exec_run(
    `cd ${name}/${name}_backend && npm install express mongoose dotenv body-parser cors && npm i -D typescript @types/express @types/node @types/cors nodemon ts-node && cd ..`
  );
}
export async function createExpress_Js(name: string) {
  await exec_run(`cd ${name} && mkdir ${name}_backend && cd ${name}_backend`);
  await fs.writeFile(
    `${name}/${name}_backend/index.js`,
    `
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
});`
  );
  await fs.writeFile(
    `${name}/${name}_backend/package.json`,
    `
  {
    "name": "${name}_backend",
    "version": "1.0.0",
    "description": "",
    "type": "module",
    "main": "index.js",
    "scripts": {
    "start": "nodemon dist/index.js",
    "dev": "nodemon src/index.ts",
    "build": "tsc -p ."
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
  // add .env
  await fs.writeFile(`${name}/${name}_backend/.env`, "PORT=5000");
  // add .gitignore
  await fs.writeFile(
    `${name}/${name}_backend/.gitignore`,
    `node_modules
    .env
`
  );

  await exec_run(
    `cd ${name}/${name}_backend && npm install express mongoose dotenv nodemon body-parser cors`
  );
}
