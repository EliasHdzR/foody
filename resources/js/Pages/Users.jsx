import '../../css/app.css';
import Layout from '@/Layouts/Layout';
import Tabla from '@/Components/Tabla';

const columns = [
    { id: 'name', label: 'Nombre', minWidth: 170 },
    { id: 'email', label: 'Correo Electrónico', minWidth: 100 },
    { id: 'phone', label: 'Teléfono', minWidth: 100, align: 'center', },
    { id: 'role', label: 'Rol', minWidth: 100},
];

const rows = [
    { name: "Elias Hernández Rodríguez", email: "elias@correo.com", phone: "8341234567", role: "Usuario"},
    { name: "Ana Gómez López", email: "ana.gomez@correo.com", phone: "8341234568", role: "Usuario"},
    { name: "Carlos Martínez Pérez", email: "carlos.martinez@correo.com", phone: "8341234569", role: "Usuario"},
    { name: "María Fernández Rivas", email: "maria.fernandez@correo.com", phone: "8341234570", role: "Usuario"},
    { name: "Luis Torres Díaz", email: "luis.torres@correo.com", phone: "8341234571", role: "Usuario"},
    { name: "Sofía Herrera Ortiz", email: "sofia.herrera@correo.com", phone: "8341234572", role: "Usuario"},
    { name: "Jorge Méndez Castro", email: "jorge.mendez@correo.com", phone: "8341234573", role: "Usuario"},
    { name: "Lucía Vargas Ruiz", email: "lucia.vargas@correo.com", phone: "8341234574", role: "Usuario"},
    { name: "Miguel Ramírez Silva", email: "miguel.ramirez@correo.com", phone: "8341234575", role: "Usuario"},
    { name: "Laura García Morales", email: "laura.garcia@correo.com", phone: "8341234576", role: "Usuario"},
    { name: "Daniela Ortiz Ramos", email: "daniela.ortiz@correo.com", phone: "8341234577", role: "Usuario"},
    { name: "Fernando López Aguilar", email: "fernando.lopez@correo.com", phone: "8341234578", role: "Usuario"},
    { name: "Valeria Cruz Vega", email: "valeria.cruz@correo.com", phone: "8341234579", role: "Usuario"},
    { name: "Ricardo Jiménez Castillo", email: "ricardo.jimenez@correo.com", phone: "8341234580", role: "Usuario"},
    { name: "Alejandra Navarro Flores", email: "alejandra.navarro@correo.com", phone: "8341234581", role: "Usuario"},
    { name: "José Herrera Peña", email: "jose.herrera@correo.com", phone: "8341234582", role: "Usuario"},
    { name: "Carmen Reyes García", email: "carmen.reyes@correo.com", phone: "8341234583", role: "Usuario"},
    { name: "Emilio Sánchez Ortiz", email: "emilio.sanchez@correo.com", phone: "8341234584", role: "Usuario"},
    { name: "Raquel Morales Jiménez", email: "raquel.morales@correo.com", phone: "8341234585", role: "Usuario"},
    { name: "Mario Pérez Hernández", email: "mario.perez@correo.com", phone: "8341234586", role: "Usuario"},
    { name: "Paula Vargas Lozano", email: "paula.vargas@correo.com", phone: "8341234587", role: "Usuario" }
];

export default function Users (){
    return (
        <Layout>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Usuarios</h1>
            <Tabla
                columns={columns}
                rows={rows}
                rowsPerPageCustom={10}
            />
        </Layout>
    );
}
