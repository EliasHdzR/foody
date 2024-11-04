import Tienda from '../Components/Tienda';
import '../../css/app.css';
import Layout from '@/Layouts/Layout';

export default function Restaurants() {
    const tiendas = [
        {
            logo: 'linkparaellogoqusaremos.png',
            nombre: "Carl's Jr",
            branch: 'Carretera Victoria-Monterrey',
            direccion: 'Campestre 23233 - 6313403',
            telefono: '834-305 3624',
        },
        {
            logo: 'linkparaellogo.png',
            branch: 'Slur Branch',
            nombre: 'Café Rosita',
            direccion: 'Calle de Ejemplo, Colonia #de casa - CP',
            telefono: '+01-12345678',
        },
        {
            logo: 'linkparaellogo.png',
            branch: 'Gaandipuram Branch',
            nombre: "McDonald's",
            direccion: 'Calle de Ejemplo, Colonia #de casa - CP',
            telefono: '+01-12345678',
        },
    ];

    return (
        <>

            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Tiendas</h1>
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-end mb-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Añadir</button>
                </div>
                {tiendas.map((tienda, index) => (
                    <Tienda
                        key={index}
                        logo={tienda.logo}
                        nombre={tienda.nombre}
                        branch={tienda.branch}
                        direccion={tienda.direccion}
                        telefono={tienda.telefono}
                        rutaInventario="/inventario"
                        rutaEdicion={() => console.log(`Tocaste ${tienda.nombre}`)}
                    />
                ))}
            </div>
        </>

);
}
