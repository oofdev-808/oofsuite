import React, { useEffect } from "react";
import { useReduxMethods } from "../useReduxMethods/useReduxMethods";
import { useRouter } from "next/router";

const textClassificationIntialState = {
  someText: "classfication",
  someArray: ["classfication"],
};

const textSummaryIntialState = {
  someText: "summary",
  someArray: ["summary"],
};

const StateSetterComponent = () => {
  const { asPath } = useRouter();

  const { registerPageState } = useReduxMethods();

  useEffect(() => {
    console.log(asPath, "aspath");
    console.log(asPath.includes("/test"), " /test/ aspath");

    if (asPath.includes("/test")) {
      registerPageState(textClassificationIntialState);
    } else if (asPath.includes("/sum")) {
      registerPageState(textSummaryIntialState);
    }
  }, [asPath, registerPageState]);

  return <></>;
};

export default StateSetterComponent;
