import { exec } from "child_process";
import { promisify } from "util";
import { createDict } from "./util_fn";
const exec_run = promisify(exec);

export async function createReact(name: string) {
  try {
    await createDict(name);
    await createReact_Js(name);
  } catch (error) {
    console.log(error);
  }
}
export async function createRectTypescript(name: string) {
  try {
    await createDict(name);
    await createReact_Ts(name);
  } catch (error) {
    console.log(error);
  }
}
export async function createReact_Js(name: string) {
  await exec_run(
    `cd ${name} && npx create-react-app ${name}_frontend && cd ${name}_frontend && npm install axios @reduxjs/toolkit react-redux redux react-router-dom react-router`
  );
}
export async function createReact_Ts(name: string) {
  await exec_run(
    `cd ${name} && npx create-react-app ${name}_frontend --template typescript && cd ${name}_frontend && npm install axios @reduxjs/toolkit react-redux redux react-router-dom react-router`
  );
}
