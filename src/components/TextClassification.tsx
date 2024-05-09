import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@nextui-org/input";
import Progress from "./Progress";

export default function TextClassification() {
  // Keep track of the classification result and the model loading status.
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(null);
  const [progressItems, setProgressItems] = useState([]);

  // Create a reference to the worker object.
  const worker = useRef(null);

  // We use the `useEffect` hook to set up the worker as soon as the `App` component is mounted.
  useEffect(() => {
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(
        new URL("../worker/worker", import.meta.url),
        {
          type: "module",
        }
      );
    }

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e) => {
      console.log(e.data, "onMessageReceived");
      switch (e.data.status) {
        case "initiate":
          // Model file start load: add a new progress item to the list.
          setReady(false);
          setProgressItems((prev) => [...prev, e.data]);
          break;
        case "progress":
          // Model file progress: update one of the progress items.
          setProgressItems((prev) =>
            prev.map((item) => {
              if (item.file === e.data.file) {
                return { ...item, progress: e.data.progress };
              }
              return item;
            })
          );
          break;
        case "done":
          // Model file loaded: remove the progress item from the list.
          // setProgressItems((prev) =>
          //   prev.filter((item) => item.file !== e.data.file)
          // );
          break;
        case "ready":
          // Pipeline ready: the worker is ready to accept messages.
          setReady(true);
          break;
        case "complete":
          setResult(e.data.output[0]);
          break;
      }
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener("message", onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  const classify = useCallback((text) => {
    if (worker.current) {
      worker.current.postMessage({ text });
    }
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-2 text-center">
        Text Classification
      </h1>
      <h2 className="text-2xl mb-4 text-center">
        Classify text as positive or negative
      </h2>
      <Input
        placeholder="enter text here"
        className="w-full max-w-xs p-2  mb-4"
        onInput={(e) => {
          classify(e.target.value);
        }}
      />

      {ready !== null && (
        <pre className="bg-primary-100 p-2 rounded">
          {!ready || !result ? "Loading..." : JSON.stringify(result, null, 2)}
        </pre>
      )}

      <div>
        {ready === false && <label>Loading models... (only run once)</label>}
        {ready === false && progressItems.map((data) => (
          <div key={data.file}>
            <Progress text={data.file} percentage={data.progress} />
          </div>
        ))}
      </div>
    </main>
  );
}
