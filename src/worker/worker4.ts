import { pipeline, env, PipelineType } from "@xenova/transformers";

// Skip local model check
// env.allowLocalModels = false;
env.allowLocalModels = true;

// // Specify a custom location for models (defaults to '/models/').
// env.localModelPath = '/models/';
env.localModelPath = "/models/new/";
// env.cacheDir = "/tmp/.cache"

// // Disable the loading of remote models from the Hugging Face Hub:
// env.allowRemoteModels = false;

// // Set location of .wasm files. Defaults to use a CDN.
// env.backends.onnx.wasm.wasmPaths = '/path/to/files/';

env.backends.onnx.wasm.wasmPaths = "/transformers-dist/";

// Use the Singleton pattern to enable lazy construction of the pipeline.
class PipelineSingleton {
  static task = "text-generation";

  // static model = "Xenova/Qwen1.5-0.5B-Chat";

  static model = "Qwen1.5-0.5B-Chat";

  // static model = "Qwen1.5-1.8B-Chat";

  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task as PipelineType, this.model, { progress_callback });
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

  // Define the prompt and list of messages
  // const prompt = 'Give me a short introduction to large language model.'
  const prompt = event.data.text;
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: prompt },
  ];

  console.log(prompt,"prompt")
  console.log(messages,"messages")

  // Apply chat template
  const text = generator.tokenizer.apply_chat_template(messages, {
    tokenize: false,
    add_generation_prompt: true,
  });

  console.log(text,"text")

  // Actually perform the classification
  let output = await generator(text, {
    max_new_tokens: 1000,
    do_sample: false,
    return_full_text: false,
  });

  // Send the output back to the main thread
  self.postMessage({
    status: "complete",
    output: output,
  });
});
