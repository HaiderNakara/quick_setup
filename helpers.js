import { exec } from 'child_process';

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
function  createMernTypescript(name) {
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

module.exports = { createMern ,createMernTypescript };