import Tabla from '@/Components/Tabla';
import Layout from '@/Layouts/Layout';

export default function Promotions() {
    const columns = [
        { id: 'name', label: 'Nombre', minWidth: 200 },
        { id: 'percentage', label: '%', minWidth: 50 },
        { id: 'discount', label: '$', minWidth: 50 },
        { id: 'startDate', label: 'Fecha inicio', minWidth: 100 },
        { id: 'endDate', label: 'Fecha fin', minWidth: 100 },
        { id: 'edit', label: 'Edit', minWidth: 50, align: 'center' },
    ];

    const promotions = [
        {
            name: 'Nombre de la promoción 1',
            percentage: '20%',
            discount: '$20',
            startDate: '20/06/2004',
            endDate: '20/06/2004',
            edit: <button className="text-blue-500 hover:text-white hover:bg-blue-500 px-3 py-1 rounded-full border border-blue-500 transition duration-200">Edit</button>,
        },
        {
            name: 'Nombre de la promoción 2',
            percentage: '15%',
            discount: '$15',
            startDate: '10/04/2023',
            endDate: '15/08/2023',
            edit: <button className="text-blue-500 hover:text-white hover:bg-blue-500 px-3 py-1 rounded-full border border-blue-500 transition duration-200">Edit</button>,
        },
        {
            name: 'Nombre de la promoción 3',
            percentage: '30%',
            discount: '$30',
            startDate: '05/12/2022',
            endDate: '20/12/2022',
            edit: <button className="text-blue-500 hover:text-white hover:bg-blue-500 px-3 py-1 rounded-full border border-blue-500 transition duration-200">Edit</button>,
        },
    ];

    return (
        <Layout>
            <div className="content-area flex-1 p-6 bg-gray-100 overflow-y-auto">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Descuentos Admin</h1>
                <Tabla 
                    columns={columns} 
                    rows={promotions} 
                    rowsPerPageCustom={5}
                    tableContainerStyle={{ maxHeight: '100%', borderRadius: '12px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
                    tableCellStyle={{ padding: '16px', textAlign: 'center', color: '#4A4A4A', fontSize: '14px' }}
                    headerCellStyle={{ backgroundColor: '#3B3B3B', color: '#FFF', fontWeight: '600', fontSize: '15px', textTransform: 'uppercase', padding: '14px' }}
                    bodyCellStyle={{ backgroundColor: '#FFFFFF', transition: 'background-color 0.3s' }}
                    rowHoverStyle={{ backgroundColor: '#FAFAFA' }}
                />
            </div>
        </Layout>
    );
}
