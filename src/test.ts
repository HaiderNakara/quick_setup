import chalk from "chalk";
import { createExpressJavascript, createExpressTypescript } from "./express_fn";
import {
  createMern,
  createMernTypescript,
  createReactNestJsMongo,
} from "./mern_fn";
import { createNestJs } from "./nest_fn";
import { createReact, createRectTypescript } from "./react_fn";

export async function test_all(name: string, stackName: string) {
  console.clear();
  console.log(chalk.green(`Creating project ${name}`));
  switch (stackName) {
    case "Mern":
      createMern(name + "_one");
    case "Mern + Typescript":
      createMernTypescript(name + "_two");
    case "React(Typescript) + Nestjs + MongoDb":
      createReactNestJsMongo(name + "_three");
    case "React":
      createReact(name + "_four");
    case "React(Typescript)":
      createRectTypescript(name + "_five");
      break;
    case "Nestjs":
      createNestJs(name + "_six");
      break;
    case "Nestjs + MongoDb":
      createNestJs(name + "_seven");
      break;
    case "Express(Typescript)":
      createExpressTypescript(name + "_eight");
      break;
    case "Express":
      createExpressJavascript(name + "_nine");
      break;
  }
}
