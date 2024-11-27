import Asidebar from "../Asidebar";
import PlatillosList from "../PlatillosList";
import AccordionSection from "./AccordionSection";

const platillosMock = [
  {
    name: "Tacos al Pastor",
    description: "3 piezas con cebolla y cilantro",
    image: "https://via.placeholder.com/80",
  },
  {
    name: "Pizza Margarita",
    description: "Clásica con albahaca",
    image: "https://via.placeholder.com/80",
  },
  {
    name: "Hamburguesa Clásica",
    description: "Con papas fritas",
    image: "https://via.placeholder.com/80",
  },
];

const DashboardAside = () => {
  return (
    <Asidebar title="Opciones">
      <AccordionSection title="Categorías">
        <ul style={{ paddingLeft: "20px", color: "#fff" }}>
          <li>Comida Mexicana</li>
          <li>Comida India</li>
          <li>Repostería</li>
          <li>Comida Americana</li>
          <li>Comida China</li>
        </ul>
      </AccordionSection>

      <AccordionSection title="Platillos Disponibles">
        <PlatillosList platillos={platillosMock} />
      </AccordionSection>
    </Asidebar>
  );
};

export default DashboardAside;
