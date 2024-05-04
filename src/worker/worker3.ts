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
  static task = "summarization";



  // static model = "'Xenova/distilbart-cnn-6-6'";

  static model = "distilbart-cnn-6-6";

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
  let summarizer = await PipelineSingleton.getInstance((x) => {
    // We also add a progress callback to the pipeline so that we can
    // track model loading.
    console.log(x);
    self.postMessage(x);
  });

  // Actually perform the classification
  let output = await summarizer(event.data.text, {
    max_new_tokens: 500,
    do_sample: false,
  });

  // Send the output back to the main thread
  self.postMessage({
    status: "complete",
    output: output,
  });
});
