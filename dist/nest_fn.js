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
exports.create_nestjs = exports.createNestJs = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const util_fn_1 = require("./util_fn");
const fs = __importStar(require("fs/promises"));
const exec_run = (0, util_1.promisify)(child_process_1.exec);
function createNestJs(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, util_fn_1.createDict)(name);
            yield create_nestjs(name);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createNestJs = createNestJs;
function create_nestjs(name) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec_run(`cd ${name} && npx @nestjs/cli new ${name}_backend --package-manager npm && cd ${name}_backend && npm install @nestjs/mongoose mongoose @nestjs/swagger swagger-ui-express`);
        yield fs.writeFile(`${name}/${name}_backend/src/main.ts`, `import { NestFactory } from '@nestjs/core';
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
     await app.listen(5000);
   }
   bootstrap();
   `);
    });
}
exports.create_nestjs = create_nestjs;
