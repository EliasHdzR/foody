import { Link } from "@inertiajs/react";
import { useTheme } from "@mui/material";
import { tokens } from "@/theme.js";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

function Tienda({logo, nombre, direccion, telefono, categoria, abre, cierra, rutaInventario, rutaPedidos, rutaProductos, rutaCategorias,}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const LinkButton = ({ text, href }) => {
    return (
      <Link
        href={href}
        className="font-semibold border px-12 py-1 transition text-center"
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
        {text}
      </Link>
    );
  }

  const buttons = [
    LinkButton({ text: "Ver Pedidos", href: rutaPedidos }),
    LinkButton({ text: "Ver Inventario", href: rutaInventario }),
    LinkButton({ text: "Ver Productos", href: rutaProductos }),
    LinkButton({ text: "Ver Categorías", href: rutaCategorias }),
  ];

  return (
    <div className="tienda p-4 shadow-sm flex items-center justify-between mb-4 border rounded">
      <div className="flex items-center">
        {logo && (
          <img
            src={`/storage/${logo}`}
            alt={`${nombre} logo`}
            className="w-[10rem] object-contain mr-4"
          />
        )}
        <div>
          <h3 className="text-lg font-semibold">{nombre}</h3>
          <h4 >{categoria}</h4>
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
      <ButtonGroup
        orientation="vertical"
        variant="contained"
      >
        {buttons}
      </ButtonGroup>
    </div>
  );
}

export default Tienda;
