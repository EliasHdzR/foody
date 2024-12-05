import { useTheme } from "@mui/material";
import { tokens } from "@/theme.js";
import { useState } from "react";
import Layout from "@/Layouts/Layout.jsx";
import ReportItem from "@/Components/ReportItem.jsx";

export default function Reports() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [selectedRange, setSelectedRange] = useState({
        report1: "7d",
        report2: "30d",
        report3: "90d",
        report4: "30d",
    });

    const handleRangeChange = (reportKey, value) => {
        setSelectedRange((prev) => ({ ...prev, [reportKey]: value }));
    };

    const handleVisualize = () => console.log("Visualizar reportes");
    const handleDownload = () => console.log("Descarga de CSV");

    const reports = [
        { key: "report1", title: "Restaurantes con más ventas" },
        { key: "report2", title: "Clientes recurrentes" },
        { key: "report3", title: "Ventas por categoría" },
        { key: "report4", title: "Otra categoría" },
    ];

    return (
        <div className="w-full h-full" style={{ backgroundColor: colors.primary[400], padding: "20px", borderRadius: "10px" }}>
            <h1 style={{ color: colors.grey[100], marginBottom: "20px" }} className="text-2xl font-semibold">
                Reportes
            </h1>
            <div className="w-full h-full" style={{ backgroundColor: colors.primary[400], padding: "20px", borderRadius: "10px" }}>
                {reports.map((report) => (
                    <ReportItem
                        key={report.key}
                        title={report.title}
                        value={selectedRange[report.key]}
                        onRangeChange={(value) => handleRangeChange(report.key, value)}
                        ranges={[
                            { value: "7d", label: "7 días" },
                            { value: "30d", label: "30 días" },
                            { value: "90d", label: "90 días" },
                        ]}
                        onVisualize={handleVisualize}
                        onDownload={handleDownload}
                        colors={colors}
                    />
                ))}
            </div>
        </div>
    );
}

Reports.layout = (page) => <Layout children={page} type="admin" />;
