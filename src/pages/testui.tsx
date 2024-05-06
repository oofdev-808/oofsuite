import { Button, Input } from "@nextui-org/react";

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
