"use client";

import SectionHeader from "@/components/page-sections/section-header";
import {
  RevenueCard,
  TopProductsTable,
  RecentOrdersList,
} from "@/components/seller";

const DashboardSections = () => {
  return (
    <div className="px-16 py-4">
      <SectionHeader name={"Dashboard"} hasCTA={false} />

      {/* Revenue Summary - "How much money am I making?" */}
      <div className="mt-6">
        <RevenueCard />
      </div>

      {/* Top Products & Recent Orders */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* "What's selling well?" */}
        <TopProductsTable limit={5} />

        {/* "What orders need attention?" */}
        <RecentOrdersList limit={10} />
      </div>
    </div>
  );
};

export default DashboardSections;
