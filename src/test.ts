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
      await createMern(name + "_one");
    case "Mern + Typescript":
      await createMernTypescript(name + "_two");
    case "React(Typescript) + Nestjs + MongoDb":
      await createReactNestJsMongo(name + "_three");
    case "React":
      await createReact(name + "_four");
    case "React(Typescript)":
      await createRectTypescript(name + "_five");
    case "Nestjs":
      await createNestJs(name + "_six");
    case "Nestjs + MongoDb":
      await createNestJs(name + "_seven");
    case "Express(Typescript)":
      await createExpressTypescript(name + "_eight");
    case "Express":
      await createExpressJavascript(name + "_nine");
      break;
  }
}

test_all("test", "Mern");