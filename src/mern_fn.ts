import { createExpress_Js, createExpress_Ts } from "./express_fn";
import { create_nestjs } from "./nest_fn";
import { createReact_Js, createReact_Ts } from "./react_fn";
import { createDict } from "./util_fn";
import { createReact_Vite, createReact_Vite_Ts, createViteReact } from "./vite_fn";

export async function createMern(name: string) {
  try {
    await createDict(name);
    await createExpress_Js(name);
    await createReact_Js(name);
  } catch (error) {
    console.log(error);
  }
}

export async function createMernTypescript(name: string) {
  try {
    await createDict(name);
    await createExpress_Ts(name);
    await createReact_Ts(name);
  } catch (error) {
    console.log(error);
  }
}

export async function createReactNestJsMongo(name: string) {
  try {
    await createDict(name);
    await createReact_Ts(name);
    await create_nestjs(name);
  } catch (error) {
    console.log(error);
  }
}


// "Mern(Vite)",
//       "Mern(Vite) + Typescript",
//       "React(Vite-ts) + Nestjs + MongoDb",

export async function createMernVite(name: string) {
  try {
    await createDict(name);
    await createExpress_Js(name);
    await createReact_Vite(name);
  } catch (error) {
    console.log(error);
  }
}

export async function createMernViteTypescript(name: string) {
  try {
    await createDict(name);
    await createExpress_Ts(name);
    await createReact_Vite_Ts(name);
  } catch (error) {
    console.log(error);
  }
}

export async function createReactNestJsMongoVite(name: string) {
  try {
    await createDict(name);
    await createReact_Vite_Ts(name);
    await create_nestjs(name);
  } catch (error) {
    console.log(error);
  }
}




