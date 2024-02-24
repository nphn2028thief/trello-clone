import LazyLoading from "../LazyLoading";

const OverlayLoading = ({ className }: { className?: string }) => {
  return (
    <div
      className={`fixed inset-0 bg-black/15 z-[99999999999999999] ${className}`}
    >
      <LazyLoading className="!bg-transparent" />
    </div>
  );
};

export default OverlayLoading;
