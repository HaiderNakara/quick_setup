import chalk from "chalk";
import { createExpressJavascript, createExpressTypescript } from "./express_fn";
import {
  createMern,
  createMernTypescript,
  createMernVite,
  createMernViteTypescript,
  createReactNestJsMongo,
  createReactNestJsMongoVite,
} from "./mern_fn";
import { createNestJs } from "./nest_fn";
import { createReact, createRectTypescript } from "./react_fn";
import { createReact_Vite_Ts, createViteReact, createViteReactTypescript } from "./vite_fn";

export async function test_all(name: string, stackName: string) {
  console.clear();
  console.log(chalk.green(`Creating project ${name}`));
  switch (stackName) {
    case "Mern":
      await createMern(name + "_one");
    case "Mern + Typescript":
      await createMernTypescript(name + "_two");
    case "Mern(Vite)":
      await createMernVite(name + "_three");
    case "Mern(Vite) + Typescript":
      await createMernViteTypescript(name + "_four");
    case "React(Typescript) + Nestjs + MongoDb":
      await createReactNestJsMongo(name + "_five");
    case "React":
      await createReact(name + "_six");
    case "React(Typescript)":
      await createRectTypescript(name + "_seven");
    case "React(Vite-ts) + Nestjs + MongoDb":
      await createReactNestJsMongoVite(name + "_eight");
    case "React(Vite)":
      await createViteReact(name + "_nine");
    case "React(Vite-ts)":
      await createViteReactTypescript(name + "_ten");
    case "Nestjs":
      await createNestJs(name + "_eleven");
    case "Nestjs + MongoDb":
      await createNestJs(name + "_twelve");
    case "Express(Typescript)":
      await createExpressTypescript(name + "_thirteen");
    case "Express":
      await createExpressJavascript(name + "_fourteen");
      break;
  }
}

test_all("test", "Mern");