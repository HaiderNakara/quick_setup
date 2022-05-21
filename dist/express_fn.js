"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpress_Js = exports.createExpress_Ts = exports.createExpressJavascript = exports.createExpressTypescript = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const util_fn_1 = require("./util_fn");
const fs = __importStar(require("fs/promises"));
const exec_run = (0, util_1.promisify)(child_process_1.exec);
function createExpressTypescript(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, util_fn_1.createDict)(name);
            yield createExpress_Ts(name);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createExpressTypescript = createExpressTypescript;
function createExpressJavascript(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, util_fn_1.createDict)(name);
            yield createExpress_Js(name);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createExpressJavascript = createExpressJavascript;
function createExpress_Ts(name) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec_run(`cd ${name} &&  mkdir ${name}_backend && cd ${name}_backend && mkdir src && cd ..`);
        yield fs.writeFile(`${name}/${name}_backend/src/index.ts`, `import express from "express";
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
        yield fs.writeFile(`${name}/${name}_backend/tsconfig.json`, `{
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
      }`);
        yield fs.writeFile(`${name}/${name}_backend/package.json`, `
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
          `);
        yield exec_run(`cd ${name}/${name}_backend && npm install express mongoose dotenv body-parser cors && npm i -D typescript @types/express @types/node @types/cors nodemon ts-node && cd ..`);
    });
}
exports.createExpress_Ts = createExpress_Ts;
function createExpress_Js(name) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec_run(`cd ${name} && mkdir ${name}_backend && cd ${name}_backend`);
        yield fs.writeFile(`${name}/${name}_backend/index.js`, `
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
        yield fs.writeFile(`${name}/${name}_backend/package.json`, `
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
  `);
        yield exec_run(`cd ${name}/${name}_backend && npm install express mongoose dotenv nodemon body-parser cors`);
    });
}
exports.createExpress_Js = createExpress_Js;
