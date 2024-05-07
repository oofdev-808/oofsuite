// import { Button, Input } from "@nextui-org/react";
/**
 * Important 🚨: 
 * Note that you need to import the component from the individual package, 
 * not from @nextui-org/react.
 * 
 * from official nextui docs
 */
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function Home() {
  return (
    <main>
      <div className="">OOF</div>
      <Input
        onChange={(e) => console.log("input changed", e.target.value)}
      />
      <Button onClick={() => console.log("oof clicked")}> oof</Button>
    </main>
  );
}
