import React, { useEffect } from "react";

import { pipeline } from "@xenova/transformers";
import TransformerWraper from "./TransformerWrapper";

const Transformer = () => {
  useEffect(() => {
    (async () => {
      let classifier = await pipeline("sentiment-analysis","Xenova/oof-distilbert-base-uncased-finetuned-sst-2-english");
      let result = await classifier("I love transformers!");
      // [{'label': 'POSITIVE', 'score': 0.9998}]
      console.log(result);
    })();
  }, []);

  return (
    <TransformerWraper>
      <div>Transformer</div>
    </TransformerWraper>
  );
};

export default Transformer;
