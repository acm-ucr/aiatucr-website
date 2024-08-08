const OfferingCard = ({ title, description, icon }) => {
  return (
    <div className="rounded-3xl p-8 bg-ai-blue-200 flex flex-col justify-between h-full">
      <h3 className="text-white text-2xl text-center font-semibold">{title}</h3>
      <div className="flex justify-center items-center mb-4">{icon}</div>
      <p className="text-center text-ai-gray">{description}</p>
    </div>
  );
};

export default OfferingCard;
