import { exec } from "child_process";
import { promisify } from "util";
import { createDict } from "./util_fn";
import * as fs from "fs/promises";
const exec_run = promisify(exec);

export async function createNestJs(name: string) {
  try {
    await createDict(name);
    await create_nestjs(name);
  } catch (error) {
    console.log(error);
  }
}

export async function create_nestjs(name: string) {
  await exec_run(
    `cd ${name} && npx @nestjs/cli new ${name}_backend --package-manager npm && cd ${name}_backend && npm install @nestjs/mongoose mongoose @nestjs/swagger swagger-ui-express`
  );
  await fs.writeFile(
    `${name}/${name}_backend/src/main.ts`,
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
     await app.listen(5000);
   }
   bootstrap();
   `
  );
}
