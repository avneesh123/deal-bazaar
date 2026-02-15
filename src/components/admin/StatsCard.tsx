interface StatsCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  color?: "gold" | "green" | "red" | "blue";
}

const colorMap = {
  gold: "text-gold",
  green: "text-emerald-400",
  red: "text-red-400",
  blue: "text-blue-400",
};

export default function StatsCard({ label, value, subtext, color = "gold" }: StatsCardProps) {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${colorMap[color]}`}>{value}</p>
      {subtext && <p className="text-xs text-gray-500 mt-2">{subtext}</p>}
    </div>
  );
}
