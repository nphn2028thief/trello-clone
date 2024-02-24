import LazyLoading from "../LazyLoading";

const OverlayLoading = () => {
  return (
    <div className="fixed inset-0 bg-black/15 z-[99999999999999999]">
      <LazyLoading className="!bg-transparent" />
    </div>
  );
};

export default OverlayLoading;
