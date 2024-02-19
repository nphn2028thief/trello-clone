import { Suspense } from "react";

import LazyLoading from "@/components/LazyLoading";

const BoardDetailPage = () => {
  return (
    <Suspense fallback={<LazyLoading />}>
      <div>BoardDetailPage</div>
    </Suspense>
  );
};

export default BoardDetailPage;
