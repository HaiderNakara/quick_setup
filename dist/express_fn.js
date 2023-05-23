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
const postman_1 = require("./postman");
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
        yield exec_run(`cd ${name} &&  mkdir ${name}_backend && cd ${name}_backend && mkdir src && cd src && mkdir controllers && mkdir models && mkdir routes && cd ../..`);
        yield fs.writeFile(`${name}/${name}_backend/src/index.ts`, `import express from "express";
    import mongoose from "mongoose";
    import dotenv from "dotenv";
    import cors from "cors";
    import bodyParser from "body-parser";
    import { Request, Response } from "express";
    import cat from "./routes/cat";
    const app = express();
    dotenv.config();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });
    app.use("/cat", cat);
    mongoose.connect(process.env.DB_CONNECTION!, {}).then(() => {
      app.listen(process.env.PORT || 5000, () => {
        console.log("Server started at port " + process.env.PORT || 5000);
      });
    });    
    `);
        yield fs.writeFile(`${name}/${name}_backend/src/controllers/cat.ts`, `import cat from "../models/cat";
    import { Request, Response } from "express";
    
    export const getAllCats = async (req: Request, res: Response) => {
      const cats = await cat.find();
      res.json(cats);
    };
    
    export const getCat = async (req: Request, res: Response) => {
      const newCat = await cat.findById(req.params.id);
      res.json(newCat);
    };
    
    export const createCat = async (req: Request, res: Response) => {
      const newCat = new cat(req.body);
      await newCat.save();
      res.json(newCat);
    };
    export const updateCat = async (req: Request, res: Response) => {
      const updatedCat = await cat.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(updatedCat);
    };
    export const deleteCat = async (req: Request, res: Response) => {
      await cat.findByIdAndDelete(req.params.id);
      res.json({ message: "Cat deleted" });
    };
    export const getCatByName = async (req: Request, res: Response) => {
      const newCat = await cat.find({ name: req.params.name });
      res.json(newCat);
    };
    `);
        yield fs.writeFile(`${name}/${name}_backend/src/models/cat.ts`, `// mongoose cat model
    import mongoose, { Schema, Document } from "mongoose";
    
    export interface ICat extends Document {
      name: string;
      age: number;
      breed: string;
      color: string;
      weight: number;
    }
    
    const catSchema = new Schema({
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      breed: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
    });
    
    export default mongoose.model<ICat>("Cat", catSchema);
    `);
        yield fs.writeFile(`${name}/${name}_backend/src/routes/cat.ts`, `import { Router } from "express";
      import {
        createCat,
        getAllCats,
        getCat,
        updateCat,
        deleteCat,
        getCatByName,
      } from "../controllers/cat";
      
      const router = Router();
      router.get("/", getAllCats);
      router.get("/:id", getCat);
      router.post("/", createCat);
      router.put("/:id", updateCat);
      router.delete("/:id", deleteCat);
      router.get("/name/:name", getCatByName);
      
      export default router;
      `);
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
              "start": "nodemon src/index.ts",
              "build": "tsc"
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
        yield fs.writeFile(`${name}/${name}_backend/.env`, `PORT=5000
     DB_CONNECTION=your_mongo_connection_string`);
        yield fs.writeFile(`${name}/${name}_backend/.gitignore`, `node_modules
     .env`);
        yield (0, postman_1.createPostmanFile)(`${name}/${name}_backend`);
        yield exec_run(`cd ${name}/${name}_backend && npm install express mongoose dotenv body-parser cors && npm i -D typescript @types/express @types/node @types/cors nodemon ts-node && cd ..`);
    });
}
exports.createExpress_Ts = createExpress_Ts;
function createExpress_Js(name) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec_run(`cd ${name} && mkdir ${name}_backend && cd ${name}_backend && mkdir controllers && mkdir models && mkdir routes && cd ..`);
        yield fs.writeFile(`${name}/${name}_backend/index.js`, `
    import express from "express";
    import mongoose from "mongoose";
    import dotenv from "dotenv";
    import cors from "cors";
    import bodyParser from "body-parser";
    import cat from "./routes/cat";
    const app = express();
    dotenv.config();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get("/", (req, res) => {
      res.send("Hello World");
    });
    app.use("/cat", cat);
    mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }).then(() => {
      app.listen(process.env.PORT || 5000, () => {
        console.log("Server started at port 5000");
      });
    });`);
        yield fs.writeFile(`${name}/${name}_backend/routes/cat.js`, `import { Router } from "express";
    import {
      createCat,
      getAllCats,
      getCat,
      updateCat,
      deleteCat,
      getCatByName,
    } from "../controllers/cat";
    
    const router = Router();
    router.get("/", getAllCats);
    router.get("/:id", getCat);
    router.post("/", createCat);
    router.put("/:id", updateCat);
    router.delete("/:id", deleteCat);
    router.get("/name/:name", getCatByName);
    
    export default router;`);
        yield fs.writeFile(`${name}/${name}_backend/controllers/cat.js`, `import Cat from "../models/cat";

    export const getAllCats = async (req, res) => {
      const cats = await Cat.find();
      res.json(cats);
    }
    export const getCat = async (req, res) => {
      const cat = await Cat.findById(req.params.id);
      res.json(cat);
    }
    export const createCat = async (req, res) => {
      const newCat = new Cat(req.body);
      await newCat.save();
      res.json(newCat);
    }
    export const updateCat = async (req, res) => {
      const cat = await Cat.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(cat);
    }
    export const deleteCat = async (req, res) => {
      await Cat.findByIdAndDelete(req.params.id);
      res.json({ message: "Cat deleted" });
    }
    export const getCatByName = async (req, res) => {
      const cat = await Cat.find({ name: req.params.name });
      res.json(cat);
    }
    `);
        yield fs.writeFile(`${name}/${name}_backend/models/cat.js`, `import mongoose from "mongoose";
  const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    color: String,
    breed: String,
    weight: Number,
  });
  const Cat = mongoose.model("Cat", catSchema);
  export default Cat;`);
        yield fs.writeFile(`${name}/${name}_backend/package.json`, `
  {
    "name": "${name}_backend",
    "version": "1.0.0",
    "description": "",
    "type": "module",
    "main": "index.js",
    "scripts": {
    "start": "nodemon --es-module-specifier-resolution=node index.js"
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
        // add .env
        yield fs.writeFile(`${name}/${name}_backend/.env`, `PORT=5000
  DB_CONNECTION=your_mongo_connection_string`);
        // add .gitignore
        yield fs.writeFile(`${name}/${name}_backend/.gitignore`, `node_modules
    .env
`);
        yield (0, postman_1.createPostmanFile)(`${name}/${name}_backend`);
        yield exec_run(`cd ${name}/${name}_backend && npm install express mongoose dotenv nodemon body-parser cors`);
    });
}
exports.createExpress_Js = createExpress_Js;
