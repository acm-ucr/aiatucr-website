import OfferingCard from "./OfferingCard";
import { offerings } from "@/data/Offerings";

const OfferingCards = () => {
  return (
    <section className="p-4">
      <p className="text-4xl text-ai-blue-500 text-center m-8">We Offer...</p>
      <div className="flex justify-center">
        <div className="w-full p-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 auto-rows-fr xl:grid-cols-3 ">
          {offerings.map((offering, index) => (
            <OfferingCard
              key={index}
              title={offering.title}
              icon={offering.icon}
              description={offering.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferingCards;
