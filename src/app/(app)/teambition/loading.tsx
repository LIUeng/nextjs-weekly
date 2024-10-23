import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col space-y-3">
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <Skeleton className="h-12 w-full" key={index} />
        ))}
    </div>
  );
}
