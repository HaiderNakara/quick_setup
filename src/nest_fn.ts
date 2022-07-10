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
    `cd ${name} && npx @nestjs/cli new ${name}_backend --package-manager npm && cd ${name}_backend && npm install @nestjs/mongoose mongoose @nestjs/swagger swagger-ui-express --legacy-peer-deps && npm i --save @nestjs/config --legacy-peer-deps && cd src && mkdir entities dto`
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
  await fs.writeFile(
   `${name}/${name}_backend/src/app.module.ts`,
   `import { Module } from '@nestjs/common';
   import { AppController } from './app.controller';
   import { AppService } from './app.service';
   import { ConfigModule } from '@nestjs/config';
   import { MongooseModule } from '@nestjs/mongoose';
   import { Cat, CatSchema } from './entities/app.entity';
   
   @Module({
     imports: [
       ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: '.env',
       }),
       MongooseModule.forRoot(process.env.MONGO_URI),
       MongooseModule.forFeature([
         { name: Cat.name, schema: CatSchema },
       ]),
     ],
     controllers: [AppController],
     providers: [AppService],
   })
   export class AppModule {}
   `);
  await fs.writeFile(
    `${name}/${name}_backend/src/app.controller.ts`,
    `import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
    import { AppService } from './app.service';
    import { UpdateCatDto } from './dto/update-cat.dto';
    import { Cat } from './entities/app.entity';
    
    @Controller()
    export class AppController {
      constructor(private readonly appService: AppService) {}
    
      @Get()
      getHello(): string {
        return this.appService.getHello();
      }
      @Post('/cats/')
        createCat( @Body() createCatDto: Cat) {
        return this.appService.createCat(createCatDto);
      }
      @Get('/cats/')
      findAllCats() {
        return this.appService.findAllCats();
      }
      @Get('/cats/:id')
      findCatById(@Param('id') id: string) {
        return this.appService.findCatById(id);
      }
      @Patch('/cats/:id')
      updateCat(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return this.appService.updateCat(id, updateCatDto);
      }
      @Delete('/cats/:id')
      deleteCat(@Param('id') id: string) {
        return this.appService.deleteCat(id);
      }
    }`);
  await fs.writeFile(
    `${name}/${name}_backend/src/app.service.ts`,
    `import { Injectable } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { Model } from 'mongoose';
    import { UpdateCatDto } from './dto/update-cat.dto';
    import { Cat } from './entities/app.entity';
    
    @Injectable()
    export class AppService {
      constructor(
      @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
      ) {} 
      getHello(): string {
        return 'Hello World!';
      }
      async createCat(cat: Cat): Promise<Cat> {
        const createdCat = new this.catModel(cat);
        return await createdCat.save();
      }
      async findAllCats(): Promise<Cat[]> {
        return await this.catModel.find().exec();
      }
    async findCatById(id: string): Promise<Cat> {
      return await this.catModel.findById(id).exec();
    }
    async updateCat(id: string, cat: UpdateCatDto): Promise<Cat> {
      return await this.catModel.findByIdAndUpdate(id, cat, { new: true }).exec();
    } 
    async deleteCat(id: string): Promise<Cat> {
      return await this.catModel.findByIdAndDelete(id).exec();
    }
    }
    `);
    await fs.writeFile(
      `${name}/${name}_backend/src/entities/app.entity.ts`,
      `import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
      import { ApiProperty } from "@nestjs/swagger";
      import { Document } from 'mongoose';
      
      @Schema()
      export class Cat extends Document {
        @ApiProperty()
        @Prop()
        name: string;
        @ApiProperty()
        @Prop()
        age: number;
        @ApiProperty()
        @Prop()
        breed: string;
        @ApiProperty()
        @Prop()
        color: string;
        @ApiProperty()
        @Prop()
        weight: number;
      }
      
      export const CatSchema = SchemaFactory.createForClass(Cat);`);
      await fs.writeFile(
        `${name}/${name}_backend/src/dto/update-cat.dto.ts`,
        `import { PartialType } from "@nestjs/swagger";
        import { Cat } from "src/entities/app.entity";
        
        export class UpdateCatDto extends PartialType(Cat) {}     
        `);
      await fs.writeFile(
        `${name}/${name}_backend/.env`,
        `MONGO_URI=Your_Mongo_URI`);
      await fs.writeFile(
        `${name}/${name}_backend/src/.gitignore`,
        `.env
        # compiled output
        /dist
        /node_modules
        
        # Logs
        logs
        *.log
        npm-debug.log*
        pnpm-debug.log*
        yarn-debug.log*
        yarn-error.log*
        lerna-debug.log*
        
        # OS
        .DS_Store
        
        # Tests
        /coverage
        /.nyc_output
        
        # IDEs and editors
        /.idea
        .project
        .classpath
        .c9/
        *.launch
        .settings/
        *.sublime-workspace
        
        # IDE - VSCode
        .vscode/*
        !.vscode/settings.json
        !.vscode/tasks.json
        !.vscode/launch.json
        !.vscode/extensions.json`);

}
