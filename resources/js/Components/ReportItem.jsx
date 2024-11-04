
function ReportItem({ title, value, ranges, onRangeChange, onVisualize, onDownload }) {
    return (
        <div className="reporte-item bg-white p-4 rounded-lg shadow-sm flex items-center justify-between mb-4">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                
                <select 
    className="border border-gray-300 rounded-lg p-3 w-48 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"                    onChange={(e) => onRangeChange(e.target.value)} 
                >
                    {ranges.map((range) => (
                        <option key={range.value} value={range.value}>
                            {range.label}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className="flex space-x-4">
                <button
                    onClick={onVisualize}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                    Visualizar
                </button>
                <button
                    onClick={onDownload}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Descarga CSV
                </button>
            </div>
        </div>
    );
}

export default ReportItem;
