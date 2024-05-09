import { Progress as ProgressNextui } from "@nextui-org/progress";
export default function Progress({ text, percentage }) {
  percentage = percentage ?? 0;
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mb-4 mt-4 border p-4">
      <div 
    //   style={{ width: `${percentage}%` }}
      >
        {text} ({`${percentage.toFixed(2)}%`})
      </div>
      <ProgressNextui
        color="success"
        aria-label={text}
        value={percentage.toFixed(2)}
        // showValueLabel={true}
      ></ProgressNextui>
    </div>
  );
}
