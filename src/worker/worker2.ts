import { pipeline, env } from "@xenova/transformers";

// Skip local model check
// env.allowLocalModels = false;
env.allowLocalModels = true;

// // Specify a custom location for models (defaults to '/models/').
// env.localModelPath = '/models/';
env.localModelPath = '/models/new/';
// env.cacheDir = "/tmp/.cache"

// // Disable the loading of remote models from the Hugging Face Hub:
// env.allowRemoteModels = false;

// // Set location of .wasm files. Defaults to use a CDN.
// env.backends.onnx.wasm.wasmPaths = '/path/to/files/';

env.backends.onnx.wasm.wasmPaths = "/transformers-dist/";

// Use the Singleton pattern to enable lazy construction of the pipeline.
class PipelineSingleton {
  static task = "text2text-generation";

  // static model = "Xenova/LaMini-Flan-T5-77M";
  // static model = "Local/LaMini-Flan-T5-77M";

  // static model = "LaMini-Flan-T5-77M";
  // static model = "Xenova/stablelm-2-1_6b";
  static model = "LaMini-Flan-T5-783M";
  // static model = "Xenova/LaMini-Flan-T5-783M";
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

// Listen for messages from the main thread
self.addEventListener("message", async (event) => {
  // Retrieve the classification pipeline. When called for the first time,
  // this will load the pipeline and save it for future use.
  let generator = await PipelineSingleton.getInstance((x) => {
    // We also add a progress callback to the pipeline so that we can
    // track model loading.
    console.log(x);
    self.postMessage(x);
  });

  // Actually perform the classification
  let output = await generator(event.data.text, {
    max_new_tokens: 500,
    do_sample: false,
  });

  // Send the output back to the main thread
  self.postMessage({
    status: "complete",
    output: output,
  });
});
