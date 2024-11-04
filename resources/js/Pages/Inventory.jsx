import '../../css/app.css';
import Layout from '@/Layouts/Layout';
import Tabla from '@/Components/TablaColapsable.jsx';

function createData(name, description, price, availability) {
    return {name, description, price, availability,
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
        },
      ],
    };
  }

const rows = [
    createData('Yoghurt', 'Es un yogurth griego', 49.99, "Disponible"),
    createData('Helado de Limón', 'Helado Natural', 49.99, "Disponible"),
    createData('Helado de Fresa', 'Helado Natural', 49.99, "Agotado"),
];

export default function Inventory(){
    return(
        <Layout>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Tienda X - Inventario</h1>
            <Tabla
                data={rows}/>
        </Layout>
    );
}
