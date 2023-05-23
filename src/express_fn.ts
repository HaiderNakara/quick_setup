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
    `cd ${name} &&  mkdir ${name}_backend && cd ${name}_backend && mkdir src && cd src && mkdir controllers && mkdir models && mkdir routes && cd ../..`
  );
  await fs.writeFile(
    `${name}/${name}_backend/src/index.ts`,
    `import express from "express";
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
    mongoose.connect(process.env.DB_CONNECTION!, {}, () => {
      app.listen(process.env.PORT || 5000, () => {
        console.log("Server started at port ${process.env.PORT || 5000}");
      });
    });
    `
  );
  await fs.writeFile(
    `${name}/${name}_backend/src/controllers/cat.ts`,
    `import cat from "../models/cat";
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
    `
  );
  await fs.writeFile(
    `${name}/${name}_backend/src/models/cat.ts`,
    `// mongoose cat model
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
    `
  );
  await fs.writeFile(
    `${name}/${name}_backend/src/routes/cat.ts`,
    `import { Router } from "express";
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
      `
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
          `
  );

  await fs.writeFile(
    `${name}/${name}_backend/.env`,
    `PORT=5000
     DB_CONNECTION=your_mongo_connection_string`
  );

  await fs.writeFile(
    `${name}/${name}_backend/.gitignore`,
    `node_modules
     .env`
  );

  await exec_run(
    `cd ${name}/${name}_backend && npm install express mongoose dotenv body-parser cors && npm i -D typescript @types/express @types/node @types/cors nodemon ts-node && cd ..`
  );
}
export async function createExpress_Js(name: string) {
  await exec_run(
    `cd ${name} && mkdir ${name}_backend && cd ${name}_backend && mkdir controllers && mkdir models && mkdir routes && cd ..`
  );
  await fs.writeFile(
    `${name}/${name}_backend/index.js`,
    `
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
    mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
      app.listen(process.env.PORT || 5000, () => {
        console.log("Server started at port 5000");
      });
    });`
  );
  await fs.writeFile(
    `${name}/${name}_backend/routes/cat.js`,
    `import { Router } from "express";
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
    
    export default router;`
  );
  await fs.writeFile(
    `${name}/${name}_backend/controllers/cat.js`,
    `import Cat from "../models/cat";

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
    `
  );
  await fs.writeFile(
    `${name}/${name}_backend/models/cat.js`,
    `import mongoose from "mongoose";
  const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    color: String,
    breed: String,
    weight: Number,
  });
  const Cat = mongoose.model("Cat", catSchema);
  export default Cat;`
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
  `
  );
  // add .env
  await fs.writeFile(
    `${name}/${name}_backend/.env`,
    `PORT=5000
  DB_CONNECTION=your_mongo_connection_string`
  );
  // add .gitignore
  await fs.writeFile(
    `${name}/${name}_backend/.gitignore`,
    `node_modules
    .env
`
  );
  await fs.writeFile(
    `${name}/${name}_backend/insonmnia.json`,
    `{
      "_type": "export",
      "__export_format": 4,
      "__export_date": "2022-09-29T13:51:21.634Z",
      "__export_source": "insomnia.desktop.app:v2022.5.0",
      "resources": [
        {
          "_id": "req_03f33229b6d342909c0c14c80e133c8d",
          "parentId": "wrk_db3ad3b37c724e268bf5edf04d22669d",
          "modified": 1664459378642,
          "created": 1656917487445,
          "url": "http://localhost:3000/cat/62b40e7d409c13b3c971623a",
          "name": "New Request",
          "description": "",
          "method": "PUT",
          "body": {
            "mimeType": "application/json",
            "text": {
              "name": "bob",
              "age": 10,
              "breed": "lol",
              "color": "white",
              "weight": 225
            }
          },
          "parameters": [],
          "headers": [
            {
              "name": "Content-Type",
              "value": "application/json",
              "id": "pair_2f8917d6cd9d491c8a95e18531de09b9"
            }
          ],
          "authentication": {},
          "metaSortKey": -1656917487445,
          "isPrivate": false,
          "settingStoreCookies": true,
          "settingSendCookies": true,
          "settingDisableRenderRequestBody": false,
          "settingEncodeUrl": true,
          "settingRebuildPath": true,
          "settingFollowRedirects": "global",
          "_type": "request"
        },
        {
          "_id": "wrk_db3ad3b37c724e268bf5edf04d22669d",
          "parentId": null,
          "modified": 1656917423100,
          "created": 1656917423100,
          "name": "cat",
          "description": "",
          "scope": "collection",
          "_type": "workspace"
        },
        {
          "_id": "req_a97d0ba2eec24f51a1d70df12480c994",
          "parentId": "wrk_db3ad3b37c724e268bf5edf04d22669d",
          "modified": 1664459377882,
          "created": 1656917464576,
          "url": "http://localhost:3000/cat",
          "name": "New Request",
          "description": "",
          "method": "POST",
          "body": {
            "mimeType": "application/json",
            "text": {
              "name": "bob12",
              "age": 10,
              "breed": "lol12",
              "color": "white12",
              "weight": 15
            }
          },
          "parameters": [],
          "headers": [
            {
              "name": "Content-Type",
              "value": "application/json",
              "id": "pair_15ecb2e08fda4a67b5c42b45b19e46b9"
            }
          ],
          "authentication": {},
          "metaSortKey": -1656917464576,
          "isPrivate": false,
          "settingStoreCookies": true,
          "settingSendCookies": true,
          "settingDisableRenderRequestBody": false,
          "settingEncodeUrl": true,
          "settingRebuildPath": true,
          "settingFollowRedirects": "global",
          "_type": "request"
        },
        {
          "_id": "req_f66912ff85924d1ba83b4ed2e9d994a5",
          "parentId": "wrk_db3ad3b37c724e268bf5edf04d22669d",
          "modified": 1656917458803,
          "created": 1656917453807,
          "url": "http://localhost:3000/cat",
          "name": "New Request",
          "description": "",
          "method": "GET",
          "body": {},
          "parameters": [],
          "headers": [],
          "authentication": {},
          "metaSortKey": -1656917453807,
          "isPrivate": false,
          "settingStoreCookies": true,
          "settingSendCookies": true,
          "settingDisableRenderRequestBody": false,
          "settingEncodeUrl": true,
          "settingRebuildPath": true,
          "settingFollowRedirects": "global",
          "_type": "request"
        },
        {
          "_id": "req_443a29fc5eb24a298eb7b1dacec405b7",
          "parentId": "wrk_db3ad3b37c724e268bf5edf04d22669d",
          "modified": 1664459382760,
          "created": 1664459375321,
          "url": "http://localhost:3000/cat/62b40e7d409c13b3c971623a",
          "name": "get by id",
          "description": "",
          "method": "GET",
          "body": {},
          "parameters": [],
          "headers": [],
          "authentication": {},
          "metaSortKey": -1656660818294,
          "isPrivate": false,
          "settingStoreCookies": true,
          "settingSendCookies": true,
          "settingDisableRenderRequestBody": false,
          "settingEncodeUrl": true,
          "settingRebuildPath": true,
          "settingFollowRedirects": "global",
          "_type": "request"
        },
        {
          "_id": "env_e115228036d708fb149d9481df245a80e055a2e7",
          "parentId": "wrk_db3ad3b37c724e268bf5edf04d22669d",
          "modified": 1656917423135,
          "created": 1656917423135,
          "name": "Base Environment",
          "data": {},
          "dataPropertyOrder": null,
          "color": null,
          "isPrivate": false,
          "metaSortKey": 1656917423135,
          "_type": "environment"
        },
        {
          "_id": "jar_e115228036d708fb149d9481df245a80e055a2e7",
          "parentId": "wrk_db3ad3b37c724e268bf5edf04d22669d",
          "modified": 1656917423139,
          "created": 1656917423139,
          "name": "Default Jar",
          "cookies": [],
          "_type": "cookie_jar"
        },
        {
          "_id": "spc_130396feec81412a8da39efb75ed61eb",
          "parentId": "wrk_db3ad3b37c724e268bf5edf04d22669d",
          "modified": 1656917423125,
          "created": 1656917423125,
          "fileName": "cat",
          "contents": "",
          "contentType": "yaml",
          "_type": "api_spec"
        }
      ]
    }`,
  );


  await exec_run(
    `cd ${name}/${name}_backend && npm install express mongoose dotenv nodemon body-parser cors`
  );
}