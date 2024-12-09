import Asidebar from "../Asidebar";
import AccordionSection from "./AccordionSection";
import {useEffect, useState} from "react";

const DashboardAside = ({categories, setFilters}) => {
    const [name, setName] = useState("");
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(Infinity);
    const [category, setCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        setFilters({
            name,
            priceFrom,
            priceTo,
            category,
        });
    }, [name, priceFrom, priceTo, category]);

    return (
        <Asidebar title="Filtrar Resultados">
            <AccordionSection title="Categorías">
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl p-6 flex flex-col items-center text-center shadow-lg transform transition-transform duration-200 ${selectedCategory === cat.id ? 'bg-blue-500' : 'bg-[#01594F]'}`}
                            onClick={() => {
                                setCategory(cat.id);
                                setSelectedCategory(cat.id);
                            }}
                        >
                            <h3 className="text-white font-bold text-xl">{cat.name}</h3>
                            <p className="text-white text-lg mt-1">{cat.restaurants_count} Restaurantes Disponibles</p>
                        </div>
                    ))}
                </div>
            </AccordionSection>
            <AccordionSection title="Nombre">
                <input
                    type="text"
                    className="text-black p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Helado, Pizza..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </AccordionSection>
            <AccordionSection title="Precio">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="number"
                        className="text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="Desde"
                        value={priceFrom}
                        onChange={(e) => setPriceFrom(Number(e.target.value))}
                    />
                    <input
                        type="number"
                        className="text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="Hasta"
                        value={priceTo}
                        onChange={(e) => setPriceTo(Number(e.target.value))}
                    />
                </div>
            </AccordionSection>
        </Asidebar>
    );
};

export default DashboardAside;
