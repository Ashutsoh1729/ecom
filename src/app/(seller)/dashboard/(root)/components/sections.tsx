"use client";

import SectionHeader from "@/components/page-sections/section-header";
import DashboardCard from "./dashboard-card";

const DashboardSections = () => {
  return (
    <div className="px-16 py-4">
      <SectionHeader name={"Dashboard"} hasCTA={false} />
      <div id="dashboard-container">
        <div></div>
      </div>
      <div>
        <DashboardCard name="Ashutosh" />
      </div>
    </div>
  );
};

export default DashboardSections;
