import React, { useState } from "react";
import Asidebar from "../Asidebar";
import PlatillosList from "../PlatillosList";
import AccordionSection from "./AccordionSection";

const DashboardAside = ({ onSelectCategory, platillos }) => {
  const categorias = ["Comida Mexicana", "Comida India", "Repostería", "Comida Americana", "Comida China"];
  const [activeCategory, setActiveCategory] = useState("");

  const handleCategoryClick = (categoria) => {
    const newCategory = activeCategory === categoria ? "" : categoria;
    setActiveCategory(newCategory);
    onSelectCategory(newCategory);
  };

  return (
    <Asidebar title="Opciones">
      <AccordionSection title="Categorías">
        <ul style={{ paddingLeft: "20px", color: "#fff" }}>
          {categorias.map((categoria) => (
            <li
              key={categoria}
              onClick={() => handleCategoryClick(categoria)}
              style={{
                cursor: "pointer",
                padding: "10px",
                margin: "5px 0",
                borderRadius: "8px",
                textAlign: "center",
                backgroundColor: activeCategory === categoria ? "#4A90E2" : "transparent",
                color: activeCategory === categoria ? "#fff" : "#ddd",
                transition: "background-color 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== categoria) {
                  e.target.style.backgroundColor = "#2E3B4E";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== categoria) {
                  e.target.style.backgroundColor = "transparent";
                }
              }}
            >
              {categoria}
            </li>
          ))}
        </ul>
      </AccordionSection>

      <AccordionSection title="Platillos Disponibles">
        <PlatillosList platillos={platillos} />
      </AccordionSection>
    </Asidebar>
  );
};

export default DashboardAside;
