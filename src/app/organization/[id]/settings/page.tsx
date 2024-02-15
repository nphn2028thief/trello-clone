import { Suspense } from "react";
import { OrganizationProfile } from "@clerk/nextjs";

import LazyLoading from "@/components/LazyLoading";

const SettingsPage = () => {
  return (
    <Suspense fallback={<LazyLoading />}>
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              width: "96%",
              boxShadow: "none",
            },
            card: {
              width: "96%",
              border: "1px solid #e5e5e5",
              boxShadow: "none",
            },
          },
        }}
      />
    </Suspense>
  );
};

export default SettingsPage;
