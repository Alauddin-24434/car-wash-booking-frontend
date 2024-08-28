

interface SectionTitleProps {
    title: string;
    className?: string;
  }
  
  const SectionTitle: React.FC<SectionTitleProps> = ({ title,  className = "" }) => {
    return (
      <div className={`text-center mb-8 ${className}`}>
        <h2 className="text-center mb-16 text-xl md:text-2xl text-[#6265da] font-bold">{title}</h2>
  
      </div>
    );
  };
  
  export default SectionTitle;
  
  
  