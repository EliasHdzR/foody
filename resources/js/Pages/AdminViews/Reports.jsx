import Layout from '@/Layouts/Layout.jsx';
import ReportItem from '../../Components/ReportItem.jsx';
import { useState } from 'react';

export default function Reports() {
    const [selectedRange, setSelectedRange] = useState({
        report1: '7d',
        report2: '30d',
        report3: '90d',
    });

    const handleRangeChange = (reportKey, value) => {
        setSelectedRange((prev) => ({ ...prev, [reportKey]: value }));
    };

    const handleVisualize = () => console.log("Visualizar reportes");
    const handleDownload = () => console.log("Descarga de CSV");

    return (
        <Layout>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Reportes</h1>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
                <ReportItem
                    title="Restaurantes con más ventas"
                    value={selectedRange.report1}
                    onRangeChange={(value) => handleRangeChange('report1', value)}
                    ranges={[
                        { value: '7d', label: '7 días' },
                        { value: '30d', label: '30 días' },
                        { value: '90d', label: '90 días' },
                    ]}
                    onVisualize={handleVisualize}
                    onDownload={handleDownload}
                />
                <ReportItem
                            title="Clientes recurrentes"
                            value={selectedRange.report2}
                            onRangeChange={(value) => handleRangeChange('report2', value)}
                            ranges={[
                                { value: '7d', label: '7 días' },
                                { value: '30d', label: '30 días' },
                                { value: '180d', label: '180 días' },
                            ]}
                            onVisualize={handleVisualize}
                            onDownload={handleDownload}
                        />
                        <ReportItem
                            title="Ventas por categoría"
                            value={selectedRange.report3}
                            onRangeChange={(value) => handleRangeChange('report3', value)}
                            ranges={[
                                { value: '7d', label: '7 días' },
                                { value: '30d', label: '30 días' },
                                { value: '90d', label: '90 días' },
                            ]}
                            onVisualize={handleVisualize}
                            onDownload={handleDownload}
                        />
                                                <ReportItem
                            title="Otra categoria"
                            value={selectedRange.report3}
                            onRangeChange={(value) => handleRangeChange('report4', value)}
                            ranges={[
                                { value: '7d', label: '7 días' },
                                { value: '30d', label: '30 días' },
                                { value: '90d', label: '90 días' },
                            ]}
                            onVisualize={handleVisualize}
                            onDownload={handleDownload}
                        />
            </div>
        </Layout>
    );
}
