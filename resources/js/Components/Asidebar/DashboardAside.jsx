import Asidebar from "../Asidebar";
import PlatillosList from "../PlatillosList";
import AccordionSection from "./AccordionSection";

const platillosMock = [
  {
    name: "Tacos al Pastor",
    description: "3 piezas con cebolla y cilantro",
    image: "/img/tacos.png", 
  },
   {
    name: "Pizza Margarita",
    description: "Clásica con albahaca",
    image: "/img/tacos.png", 
  },
  {
    name: "Hamburguesa Clásica",
    description: "Con papas fritas",
    image: "/img/tacos.png", 
  },
  {
    name: "Tacos al Pastor",
    description: "3 piezas con cebolla y cilantro",
    image: "/img/tacos.png", 
  },
  {
    name: "Pizza Margarita",
    description: "Clásica con albahaca",
    image: "/img/tacos.png", 
  },
  {
    name: "Hamburguesa Clásica",
    description: "Con papas fritas",
    image: "/img/tacos.png", 
  },
];



const DashboardAside = () => {
  return (
    <Asidebar title="Opciones">
      <AccordionSection title="Categorías">
      <PlatillosList platillos={platillosMock} />
      </AccordionSection>

      <AccordionSection title="Platillos Disponibles">
        <PlatillosList platillos={platillosMock} />
      </AccordionSection>
      <AccordionSection title="Otro">
      <PlatillosList platillos={platillosMock} />
      </AccordionSection>
      <AccordionSection title="Otro">
      <PlatillosList platillos={platillosMock} />
      </AccordionSection>
      <AccordionSection title="Otro">
      <PlatillosList platillos={platillosMock} />
      </AccordionSection>
      <AccordionSection title="Otro">
      <PlatillosList platillos={platillosMock} />
      </AccordionSection>
    </Asidebar>
  );
};

export default DashboardAside;
