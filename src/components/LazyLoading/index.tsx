import { Loader2 } from "lucide-react";

const LazyLoading = ({ className }: { className?: string }) => {
  return (
    <div
      className={`absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-white ${className}`}
    >
      <Loader2 className="w-8 h-8 text-sky-700 animate-spin" />
    </div>
  );
};

export default LazyLoading;
