#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { exec } from "child_process";
import { promisify } from "util";
import { createReact, createRectTypescript } from "./react_fn";
import { createExpressJavascript, createExpressTypescript } from "./express_fn";
import { createNestJs } from "./nest_fn";
import {
  createMern,
  createMernTypescript,
  createMernVite,
  createMernViteTypescript,
  createReactNestJsMongo,
  createReactNestJsMongoVite,
} from "./mern_fn";
import { test_all } from "./test";
import { createReact_Vite_Ts, createViteReact } from "./vite_fn";
let projectName = "projectTry";
const exec_run = promisify(exec);

async function main() {
  const answer1 = await inquirer.prompt({
    name: "projectName",
    type: "input",
    message: "What is the name of your project?",
    default() {
      return "my-project";
    },
    validate: (name: string) => {
      const regex = /^[a-z0-9]+(_[a-z0-9]+)*$/;
      if (name.length < 4) {
        return "Project name must be at least 3 characters long";
      }
      if (!regex.test(name)) {
        return "Project name must be snake_case";
      }
      return true;
    },
  });
  projectName = answer1.projectName;

  const answer = await inquirer.prompt({
    name: "stackName",
    type: "list",
    message: "What stack do you want to use?",
    choices: [
      "Mern",
      "Mern + Typescript",
      "Mern(Vite)",
      "Mern(Vite) + Typescript",
      "React(Typescript) + Nestjs + MongoDb",
      "React",
      "React(Typescript)",
      "React(Vite-ts) + Nestjs + MongoDb",
      "React(Vite)",
      "React(Vite-ts)",
      "Nestjs",
      "Nestjs + MongoDb",
      "Express(Typescript)",
      "Express",
    ],
  });
  console.log(chalk.green(`You have selected ${answer.stackName}`));
  const spinner = createSpinner();
  spinner.start({ text: "Creating project" });
  return createProject(projectName, answer.stackName).then(() => {
    spinner.success({ text: "Project created" });
    console.log(chalk.green("cd " + projectName));
  });
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
    case "Mern(Vite)":
      await createMernVite(name);
      break;
    case "Mern(Vite) + Typescript":
      await createMernViteTypescript(name);
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
    case "React(Vite-ts) + Nestjs + MongoDb":
      await createReactNestJsMongoVite(name);
      break;
    case "React(Vite)":
      await createViteReact(name);
      break;
    case "React(Vite-ts)":
      await createReact_Vite_Ts(name);
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
