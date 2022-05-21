import { exec } from "child_process";
import { promisify } from "util";
const exec_run = promisify(exec);
export async function createDict(name: string) {
  try {
    await exec_run(`mkdir ${name}`);
  } catch (error) {
    console.log(error);
  }
}
