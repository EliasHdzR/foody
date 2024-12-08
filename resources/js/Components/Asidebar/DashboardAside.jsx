import Asidebar from "../Asidebar";
import PlatillosList from "../PlatillosList";
import AccordionSection from "./AccordionSection";

const platillosMock = [
    {
        name: "Tacos al Pastor",
        description: "3 piezas con cebolla y cilantro",
        image: "",
    },
    {
        name: "Pizza Margarita",
        description: "Clásica con albahaca",
        image: "",
    },
    {
        name: "Hamburguesa Clásica",
        description: "Con papas fritas",
        image: "",
    },
    {
        name: "Tacos al Pastor",
        description: "3 piezas con cebolla y cilantro",
        image: "",
    },
    {
        name: "Pizza Margarita",
        description: "Clásica con albahaca",
        image: "",
    },
    {
        name: "Hamburguesa Clásica",
        description: "Con papas fritas",
        image: "",
    },
];


const DashboardAside = ({categories}) => {
    console.log(categories)
    return (
        <Asidebar title="Filtrar Resultados">
            <AccordionSection title="Restaurantes">
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="bg-[#01594F] rounded-2xl p-6 flex flex-col items-center text-center shadow-lg transform transition-transform duration-200"
                        >
                            <h3 className="text-white font-bold text-xl">{category.name}</h3>
                            <p className="text-white text-lg mt-1">{category.restaurants_count} Restaurantes Disponibles</p>
                        </div>
                    ))}
                </div>
            </AccordionSection>

            <AccordionSection title="Categorías">
                <PlatillosList platillos={platillosMock}/>
            </AccordionSection>
            <AccordionSection title="Precio">
                <PlatillosList platillos={platillosMock}/>
            </AccordionSection>
            <AccordionSection title="Calificación">
                <PlatillosList platillos={platillosMock}/>
            </AccordionSection>
        </Asidebar>
    );
};

export default DashboardAside;
