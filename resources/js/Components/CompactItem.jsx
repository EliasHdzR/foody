import React from "react";
import { Link } from "@inertiajs/react";

const CompactItem = ({ title, to, icon: Icon, selected, setSelected, method }) => {
  const isSelected = selected === title;

  const outerDivClasses = `w-full h-20 rounded-l-full flex justify-center items-center shadow-lg ${
    isSelected ? "bg-slate-800" : ""
  }`;

  return (
    <Link
      href={route(`${to}`)}
      method={method}
      onClick={() => {
        setSelected(title);
      }}
      className="w-full flex justify-center"
    >
      <div className={outerDivClasses}>
        <div
          className={`w-14 h-14 rounded-xl flex justify-center items-center ${
            isSelected ? "bg-red-400" : "text-[#EA7C69]"
          } hover:bg-red-400 cursor-pointer transition-all duration-200`}
        >
          <Icon
            color={isSelected ? "#FFFFFF" : "#EA7C69"} 
            size={28} 
          />
        </div>
      </div>
    </Link>
  );
};

export default CompactItem;
