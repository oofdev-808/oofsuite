import React, { useEffect } from "react";
import { env } from '@xenova/transformers';

env.allowLocalModels = true
// // Specify a custom location for models (defaults to '/models/').
// env.localModelPath = '/path/to/models/';
env.localModelPath = '/models/';


// // Disable the loading of remote models from the Hugging Face Hub:
env.allowRemoteModels = false;

// // Set location of .wasm files. Defaults to use a CDN.
// env.backends.onnx.wasm.wasmPaths = '/path/to/files/';

env.backends.onnx.wasm.wasmPaths = '/transformers-dist/';


const TransformerWraper = ({children}) => {


  return <div>{children}</div>;
};

export default TransformerWraper;
