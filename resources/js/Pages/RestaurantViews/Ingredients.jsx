import Tabla from '@/Components/Tabla.jsx';
import Layout from "@/Layouts/Layout"

const columns = [
    { id: 'name', label: 'Nombre', minWidth: 170 },
    { id: 'email', label: 'Correo Electrónico', minWidth: 100 },
    { id: 'phone', label: 'Teléfono', minWidth: 100, align: 'center', },
    { id: 'role', label: 'Rol', minWidth: 100},
];
const rows = [
    { name: "Elias Hernández Rodríguez", email: "elias@correo.com", phone: "8341234567", role: "Usuario"},
    { name: "Ana Gómez López", email: "ana.gomez@correo.com", phone: "8341234568", role: "Usuario"},

];

const Ingredients = () =>{
    return(
        <Layout>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Ingredientes</h1>
            <Tabla
                columns={columns}
                rows={rows}
                rowsPerPageCustom={10}
            />
        </Layout>
    )
}

export default Ingredients;
