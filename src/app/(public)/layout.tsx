import Breadcrumb from "@/components/page-sections/breadcrumbs";
import Navbar from "@/components/page-sections/navbar";
import { getUserRole } from "@/lib/logic";
import { SessionProvider } from "next-auth/react";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const userRole = await getUserRole();
  console.log(userRole);

  return (
    <div>
      <SessionProvider>
        <Navbar userRole={userRole} />
      </SessionProvider>
      {/* <Navbar2 /> */}

      <Breadcrumb />

      {children}
    </div>
  );
};

export default PublicLayout;
