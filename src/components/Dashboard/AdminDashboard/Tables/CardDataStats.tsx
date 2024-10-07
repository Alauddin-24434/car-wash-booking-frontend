

interface CardDataStatsProps {
  title: string;
  total: string;
  textColor: string;  // Dynamic text color prop
  bgColor: string;    // Dynamic background color prop


}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  textColor,
  bgColor,

}) => {
  return (
    <div
      className={`rounded-lg p-6 shadow-lg ${bgColor} text-${textColor} transform transition duration-500 hover:scale-105`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >


      <div className="mt-5">
        <h4 className={`text-2xl font-bold leading-tight mb-1 ${textColor}`}>
          {total}
        </h4>
        <span className="text-sm font-medium">{title}</span>
      </div>
    </div>
  );
};

export default CardDataStats;
