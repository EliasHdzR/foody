import React, {useState} from 'react';
import Layout from '@/Layouts/Layout.jsx';
import Modal from '@/Pages/RestaurantViews/Modal';
import {Alert, AlertTitle} from "@mui/material";
import AddCouponForm from '@/Pages/RestaurantViews/Coupons/AddCouponForm.jsx';
import EditCouponForm from '@/Pages/RestaurantViews/Coupons/EditCouponForm.jsx';
import DeleteCouponForm from '@/Pages/RestaurantViews/Coupons/DeleteCouponForm.jsx';
import Tabla from "@/Components/Tabla.jsx";
import jsPDF from "jspdf";
import 'jspdf-autotable';

const CouponsIndex = ({coupons, restaurantID}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const [priceRange, setPriceRange] = useState(['', '']);
    const [discountRange, setDiscountRange] = useState(['', '']);
    const [expirationDateRange, setExpirationDateRange] = useState(['', '']);

    const handlePriceRangeChange = (value, index) => {
        const updatedRange = [...priceRange];
        updatedRange[index] = value === '' ? '' : Number(value);
        setPriceRange(updatedRange);
    };
    const priceValidation = (price) => {
        const minPrice = priceRange[0] === '' ? null : Number(priceRange[0]);
        const maxPrice = priceRange[1] === '' ? null : Number(priceRange[1]);

        if (minPrice === null && maxPrice === null) return true;
        if (minPrice !== null && maxPrice === null) return price >= minPrice;
        if (minPrice === null && maxPrice !== null) return price <= maxPrice;
        return minPrice <= maxPrice && price >= minPrice && price <= maxPrice;
    }

    const handleDiscountRangeChange = (value, index) => {
        const updatedRange = [...discountRange];
        updatedRange[index] = value === '' ? '' : Number(value);
        setDiscountRange(updatedRange);
    }
    const discountValidation = (discount) => {
        const minDiscount = discountRange[0] === '' ? null : Number(discountRange[0]);
        const maxDiscount = discountRange[1] === '' ? null : Number(discountRange[1]);

        if (minDiscount === null && maxDiscount === null) return true;
        if (minDiscount !== null && maxDiscount === null) return discount >= minDiscount;
        if (minDiscount === null && maxDiscount !== null) return discount <= maxDiscount;
        return minDiscount <= maxDiscount && discount >= minDiscount && discount <= maxDiscount;
    }

    const handleExpirationDateRangeChange = (value, index) => {
        const updatedRange = [...expirationDateRange];
        updatedRange[index] = value === '' ? '' : value;
        setExpirationDateRange(updatedRange);
    }
    const expirationDateValidation = (expirationDate) => {
        const minExpirationDate = expirationDateRange[0] === '' ? null : expirationDateRange[0];
        const maxExpirationDate = expirationDateRange[1] === '' ? null : expirationDateRange[1];

        if (minExpirationDate === null && maxExpirationDate === null) return true;
        if (minExpirationDate !== null && maxExpirationDate === null) return expirationDate >= minExpirationDate;
        if (minExpirationDate === null && maxExpirationDate !== null) return expirationDate <= maxExpirationDate;
        return minExpirationDate <= maxExpirationDate && expirationDate >= minExpirationDate && expirationDate <= maxExpirationDate;
    }

    const filteredCoupons = coupons.filter((coupon) => {
        const priceValidationResult = priceValidation(coupon.discount);
        const discountValidationResult = discountValidation(coupon.discount_percent);
        const expirationDateValidationResult = expirationDateValidation(coupon.expires_at);

        return priceValidationResult && discountValidationResult && expirationDateValidationResult;
    });

    const openModal = (type, coupon = null) => {
        setModalType(type);
        setSelectedCoupon(coupon);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
        setSelectedCoupon(null);
    };

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    const resetFilters = () => {
        setPriceRange(['', '']);
        setDiscountRange(['', '']);
        setExpirationDateRange(['', '']);
    };

    const columns = [
        {id: 'code', label: 'Código', align: 'left'},
        {id: 'discount', label: 'Descuento ($)', align: 'right'},
        {id: 'discount_percent', label: 'Descuento (%)', align: 'right'},
        {id: 'expires_at', label: 'Fecha de Expiración', align: 'center'},
        {id: 'actions', label: '', align: 'center'},
    ];

    const rows = filteredCoupons.map((coupon) => ({
        id: coupon.id,
        code: coupon.code,
        discount: coupon.discount ? `$${Number(coupon.discount).toFixed(2)}` : '-',
        discount_percent: coupon.discount_percent ? `${Number(coupon.discount_percent).toFixed(2)}%` : '-',
        expires_at: coupon.expires_at,
        actions: [
            <button onClick={() => openModal('edit', coupon)}
                    className="ml-4 px-4 py-2 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition">
                Editar
            </button>,
            <button onClick={() => openModal('delete', coupon)}
                    className="ml-4 px-4 py-2 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition">
                Eliminar
            </button>,
        ],
    }));

    const convertToCSV = (data) => {
        const exportableColumns = columns.filter(col => col.id && col.id !== 'actions');
        const headers = exportableColumns.map(col => col.label).join(',');
        const rows = data.map(row =>
            exportableColumns.map(col => {
                return row[col.id];
            }).join(',')
        ).join('\n');
        return `${headers}\n${rows}`;
    };

    const downloadCSV = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'cupones.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const downloadPDF = () => {
        const doc = new jsPDF();

        const exportableColumns = columns.filter(col => col.id && col.id !== 'actions');
        const headers = exportableColumns.map(col => col.label);

        const cleanText = (text) =>
            typeof text === 'string' ? text.replace(/[\r\n]+/g, ' ').trim() : text;

        const data = rows.map(row =>
            exportableColumns.map(col => cleanText(row[col.id]))
        );

        doc.autoTable({
            head: [headers],
            body: data,
            styles: { cellPadding: 3, fontSize: 10 },
            startY: 10,
            theme: 'grid',
        });

        doc.save('cupones.pdf');
    };

    return (
        <div>
            {successMessage && (
                <div className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-4">
                    <Alert severity="success" onClose={() => setSuccessMessage(null)}>
                        <AlertTitle>Éxito</AlertTitle>
                        {successMessage}
                    </Alert>
                </div>
            )}
            <div className="container mx-auto">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Gestión de Cupones</h2>
                <div className="flex justify-start mb-2">
                    <input
                        type="number"
                        placeholder="Descuento($) Mínimo"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(e.target.value, 0)}
                        className="mr-2 p-2 w-[13rem] border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Descuento($) Máximo"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(e.target.value, 1)}
                        className="mr-2 p-2 w-[13rem] border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Descuento(%) Mínimo"
                        value={discountRange[0]}
                        onChange={(e) => handleDiscountRangeChange(e.target.value, 0)}
                        className="mr-2 p-2 w-[13rem] border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Descuento(%) Máximo"
                        value={discountRange[1]}
                        onChange={(e) => handleDiscountRangeChange(e.target.value, 1)}
                        className="mr-2 p-2 w-[13rem] border rounded"
                    />
                    <button onClick={resetFilters}
                            className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition">
                        Reiniciar
                    </button>
                    <button onClick={downloadCSV}
                            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition">
                        Descargar CSV
                    </button>
                    <button onClick={downloadPDF}
                            className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition">
                        Descargar PDF
                    </button>
                    <button onClick={() => openModal('add')}
                            className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition">
                        Agregar
                    </button>
                </div>

                <Tabla
                    columns={columns}
                    rows={rows}
                    rowsPerPageCustom={10}
                />
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalType === 'edit' ? 'Editar' : 'Agregar'}>
                <div className="max-h-[80vh] overflow-y-auto">
                    {modalType === 'add' &&
                        <AddCouponForm restaurantID={restaurantID} closeModal={closeModal} onSuccess={handleSuccess}/>}
                    {modalType === 'edit' &&
                        <EditCouponForm coupon={selectedCoupon} closeModal={closeModal} onSuccess={handleSuccess}/>}
                    {modalType === 'delete' &&
                        <DeleteCouponForm coupon={selectedCoupon} closeModal={closeModal} onSuccess={handleSuccess}/>}
                </div>
            </Modal>
        </div>
    );
};

CouponsIndex.layout = (page) => <Layout children={page} type={'restaurant'}/>;

export default CouponsIndex;
