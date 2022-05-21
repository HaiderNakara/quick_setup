import { createExpress_Js, createExpress_Ts } from "./express_fn";
import { create_nestjs } from "./nest_fn";
import { createReact_Js, createReact_Ts } from "./react_fn";
import { createDict } from "./util_fn";

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
