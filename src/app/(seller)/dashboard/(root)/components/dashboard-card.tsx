"use client";

interface DashboardCardProps {
  name: string;
}

const DashboardCard = ({ name }: DashboardCardProps) => {
  return <div>{name}</div>;
};

export default DashboardCard;
