type SectionTitleProps = {
  title: string;
  highlight?: string;
  className?: string;
};

const SectionTitle = ({
  title,
  highlight,
  className = "",
}: SectionTitleProps) => {
  return (
    <div className={`flex items-center gap-3 my-8 ${className}`}>
      <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-emerald-500 to-emerald-700" />
      <h2 className="text-3xl font-bold text-gray-800">
        {title}
        {highlight && <span className="text-emerald-600"> {highlight}</span>}
      </h2>
    </div>
  );
};

export default SectionTitle;
