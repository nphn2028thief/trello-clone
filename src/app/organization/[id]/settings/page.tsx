import { OrganizationProfile } from "@clerk/nextjs";

const SettingsPage = () => {
  return (
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
  );
};

export default SettingsPage;
