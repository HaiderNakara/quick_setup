import { exec } from "child_process";
import { promisify } from "util";
import { createDict } from "./util_fn";
const exec_run = promisify(exec);

export async function createViteReact(name: string) {
  try {
    await createDict(name);
    await createReact_Vite(name);
  } catch (error) {
    console.log(error);
  }
}

export async function createViteReactTypescript(name: string) {
  try {
    await createDict(name);
    await createReact_Vite_Ts(name);
  } catch (error) {
    console.log(error);
  }
}
// react, react-ts
export async function createReact_Vite(name: string) {
  await exec_run(
    `cd ${name} && npm create vite@latest ${name}_frontend -- --template react && cd ${name}_frontend && npm install axios @reduxjs/toolkit react-redux redux react-router-dom react-router`
  );
}

export async function createReact_Vite_Ts(name: string) {
  await exec_run(
    `cd ${name} && npm create vite@latest ${name}_frontend -- --template react-ts && cd ${name}_frontend && npm install axios @reduxjs/toolkit react-redux redux react-router-dom react-router`
  );
}
