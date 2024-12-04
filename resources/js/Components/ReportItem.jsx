export default function ReportItem({ title, value, ranges, onRangeChange, onVisualize, onDownload, colors }) {
    return (
        <div
            style={{
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "15px",
            }}
            className="reporte-item flex items-center justify-between"
        >
            <div>
                <h3 style={{ color: colors.grey[100] }} className="text-lg font-semibold mb-2">
                    {title}
                </h3>
                <select
                    className="border rounded-lg text-gray-700 shadow-sm focus:outline-none"
                    style={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}
                    onChange={(e) => onRangeChange(e.target.value)}
                >
                    {ranges.map((range) => (
                        <option key={range.value} value={range.value} style={{ color: colors.grey[800] }}>
                            {range.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={onVisualize}
                    style={{
                        backgroundColor: colors.greenAccent[500],
                        color: colors.grey[100],
                    }}
                    className="px-4 py-2 rounded-lg hover:opacity-80"
                >
                    Visualizar
                </button>
                <button
                    onClick={onDownload}
                    style={{
                        backgroundColor: colors.blueAccent[500],
                        color: colors.grey[100],
                    }}
                    className="px-4 py-2 rounded-lg hover:opacity-80"
                >
                    Descarga CSV
                </button>
            </div>
        </div>
    );
}
