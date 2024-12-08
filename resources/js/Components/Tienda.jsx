import { Link } from "@inertiajs/react";
import { useTheme } from "@mui/material";
import { tokens } from "@/theme.js";

function Tienda({
  logo,
  nombre,
  direccion,
  telefono,
  categoria,
  abre,
  cierra,
  rutaInventario,
  rutaPedidos,
  rutaProductos,
  rutaCategorias,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div
      className="tienda p-4 rounded-lg shadow-sm flex items-center justify-between mb-4"
      style={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}
    >
      <div className="flex items-center">
        {logo && (
          <img
            src={`/storage/${logo}`}
            alt={`${nombre} logo`}
            className="w-20 h-20 object-contain mr-4"
          />
        )}
        <div>
          <h3
            className="text-lg font-semibold"
            style={{ color: colors.greenAccent[500] }}
          >
            {nombre}
          </h3>
          <h4 style={{ color: colors.blueAccent[300] }}>{categoria}</h4>
          <p className="text-sm" style={{ color: colors.grey[300] }}>
            {direccion}
          </p>
          <p className="text-sm" style={{ color: colors.grey[300] }}>
            {telefono}
          </p>
          <p className="text-sm" style={{ color: colors.grey[300] }}>
            Horario: {abre} - {cierra}
          </p>
        </div>
      </div>
      <div>
        <div className="flex items-stretch justify-between mb-4">
          <Link
            href={rutaPedidos}
            className="font-semibold border rounded-lg px-12 py-1 transition"
            style={{
              color: colors.greenAccent[500],
              borderColor: colors.greenAccent[500],
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = colors.greenAccent[500]) &&
              (e.target.style.color = colors.primary[900])
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent") &&
              (e.target.style.color = colors.greenAccent[500])
            }
          >
            Ver Pedidos
          </Link>
        </div>
        <div className="flex items-stretch justify-between mb-4">
          <Link
            href={rutaInventario}
            className="font-semibold border rounded-lg px-10 py-1 transition"
            style={{
              color: colors.blueAccent[500],
              borderColor: colors.blueAccent[500],
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = colors.blueAccent[500]) &&
              (e.target.style.color = colors.primary[900])
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent") &&
              (e.target.style.color = colors.blueAccent[500])
            }
          >
            Ver Inventario
          </Link>
        </div>
        <div className="flex items-stretch justify-between mb-4">
          <Link
            href={rutaProductos}
            className="font-semibold border rounded-lg px-10 py-1 transition"
            style={{
              color: colors.grey[500],
              borderColor: colors.grey[500],
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = colors.grey[500]) &&
              (e.target.style.color = colors.primary[900])
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent") &&
              (e.target.style.color = colors.grey[500])
            }
          >
            Ver Productos
          </Link>
        </div>
        <div className="flex items-stretch justify-between mb-4">
          <Link
            href={rutaCategorias}
            className="font-semibold border rounded-lg px-10 py-1 transition"
            style={{
              color: colors.redAccent[500],
              borderColor: colors.redAccent[500],
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = colors.redAccent[500]) &&
              (e.target.style.color = colors.primary[900])
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent") &&
              (e.target.style.color = colors.redAccent[500])
            }
          >
            Ver Categorías
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Tienda;
