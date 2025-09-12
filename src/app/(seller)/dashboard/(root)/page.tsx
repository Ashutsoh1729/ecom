import { getUserRole } from "@/lib/logic";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const userRole = await getUserRole();

  if (userRole == "Buyer") {
    redirect("/");
  }

  return <div>This is DashboardPage</div>;
};

export default DashboardPage;
