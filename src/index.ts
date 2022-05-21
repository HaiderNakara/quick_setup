#!/usr/bin/env node
import chalk from "chalk";
import { prompt } from "inquirer";
import * as fs from "fs/promises";
import { createSpinner } from "nanospinner";
import { exec } from "child_process";
import { promisify } from "util";
import { createReact, createRectTypescript } from "./react_fn";
import { createExpressJavascript, createExpressTypescript } from "./express_fn";
import { createNestJs } from "./nest_fn";
import {
  createMern,
  createMernTypescript,
  createReactNestJsMongo,
} from "./mern_fn";
import { test_all } from "./test";
let projectName = "projectTry";
const exec_run = promisify(exec);

async function main() {
  const answer1 = await prompt({
    name: "projectName",
    type: "input",
    message: "What is the name of your project?",
    default() {
      return "my-project";
    },
  });
  projectName = answer1.projectName;

  const answer = await prompt({
    name: "stackName",
    type: "list",
    message: "What stack do you want to use?",
    choices: [
      "Mern",
      "Mern + Typescript",
      "React(Typescript) + Nestjs + MongoDb",
      "React",
      "React(Typescript)",
      "Nestjs",
      "Nestjs + MongoDb",
      "Express(Typescript)",
      "Express",
    ],
  });
  console.log(chalk.green(`You have selected ${answer.stackName}`));
  return createProject(projectName, answer.stackName);
  // return test_all(projectName, answer.stackName);
}

async function createProject(name: string, stackName: string) {
  console.clear();
  console.log(chalk.green(`Creating project ${name}`));
  switch (stackName) {
    case "Mern":
      await createMern(name);
      break;
    case "Mern + Typescript":
      await createMernTypescript(name);
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
main();
