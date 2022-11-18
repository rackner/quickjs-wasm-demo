import { getQuickJS } from "quickjs-emscripten";
import { Arena } from "quickjs-emscripten-sync";

const runSqlQuery = (query: string) => {
  console.log("HELLO FROM OUTSIDE OF WASM");
  // only do select queries
};

const doBadThings = (query: string) => {
  // Delete everything!
  console.log("Doing bad things");
};

const USER_CODE = `
    console.log("HELLO FROM WASM");
    queryDB();
    data.output=[1,2,3];
    // Try to do something bad
    // console.log(process.env);
    // doBadThings();
`;

export const executePluginInSandbox = async (userDefinedCode: string) => {
  const ctx = (await getQuickJS()).newContext();

  // init WASM sandbox
  const arena = new Arena(ctx, {
    isMarshalable: true,
  });

  // Provide a plugin ABI to the WASM Module
  const abi = {
    console: {
      log: console.log,
    },
    queryDB: runSqlQuery,
  };
  arena.expose(abi);

  // Provide a shared Datatype to the WASM Module
  const data = arena.sync({ output: [] });
  arena.expose({ data });

  // Evaluate the user's javascript within the WASM sandbox
  arena.evalCode(userDefinedCode);

  console.log("OUTSIDE OF WASM RESULTS: ", data.output);

  // Don't forget calling arena.dispose() before disposing QuickJS context!
  // Dispose of the module
  try {
    arena.endSync(data);
    arena.dispose();
    ctx.dispose();
  } catch (err) {
    console.log("dispose err", err);
  }
};

executePluginInSandbox(USER_CODE);

// console.log(process.env as any);
