import React from 'react';
import {Link} from "@inertiajs/react";

const BackButton = ({ to }) => {
    return (
        <Link href={to} className="flex items-center text-gray-500 hover:text-gray-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Volver</span>
        </Link>
    );
};

export default BackButton;
