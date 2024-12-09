import Layout from "@/Layouts/Layout";
import Menu from "./Menu";
import React from "react";

export default function MenuStore({products, categories, restaurant}) {
    return (
        <div className={"w-full bg-gray-100 min-h-full max-w-8xl mx-auto"}>
            <Menu productsCont={products} categories={categories} restaurant={restaurant} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"/>
        </div>
    );
}

MenuStore.layout = (page) => <Layout children={page} type={'restaurant'}/>;
