import { getUserRole } from "@/lib/logic";
import { redirect } from "next/navigation";
import DashboardSections from "./components/sections";

const DashboardPage = async () => {
  const userRole = await getUserRole();

  if (userRole == "Buyer") {
    redirect("/");
  }

  return (
    <div>
      <DashboardSections />
    </div>
  );
};

export default DashboardPage;
