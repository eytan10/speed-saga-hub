import { carPrices2025, getCarImage } from "@/data/carPrices2025";

const PricesPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">מחירי רכב 2025</h1>
      <table className="min-w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-2 border-b">תמונה</th>
            <th className="p-2 border-b">דגם</th>
            <th className="p-2 border-b">שנה</th>
            <th className="p-2 border-b">רמת גימור</th>
            <th className="p-2 border-b">מחיר (₪)</th>
          </tr>
        </thead>
        <tbody>
          {carPrices2025.map((car, idx) => (
            <tr key={idx}>
              <td className="p-2 border-b">
                {getCarImage(car.make, car.model) && (
                  <img
                    src={getCarImage(car.make, car.model)}
                    alt={`${car.make} ${car.model}`}
                    className="h-16 w-auto object-cover"
                  />
                )}
              </td>
              <td className="p-2 border-b">{`${car.make} ${car.model}`}</td>
              <td className="p-2 border-b">{car.year}</td>
              <td className="p-2 border-b">{car.trim}</td>
              <td className="p-2 border-b">{car.price_ils.toLocaleString("he-IL")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PricesPage;
