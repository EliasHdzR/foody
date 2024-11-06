import '../../../css/app.css';
import Layout from '@/Layouts/Layout.jsx';
import Tabla from '@/Components/Tabla.jsx';

const columns = [
    { id: 'name', label: 'Nombre', minWidth: 170 },
    { id: 'email', label: 'Correo Electrónico', minWidth: 100 },
    { id: 'phone', label: 'Teléfono', minWidth: 100},
    { id: 'shiftStart', label: 'Inicio de Turno', minWidth: 100, align: 'center'},
    { id: 'shiftEnd', label: 'Final de Turno', minWidth: 100, align: 'center'},
    { id: 'status', label: 'Estado', minWidth: 100},
];

const rows = [
    { name: "Elias Hernández Rodríguez", email: "elias@correo.com", phone: "8341234567", shiftStart: "08:00", shiftEnd: "18:00", status: "Disponible"},
    { name: "Ana Gómez López", email: "ana.gomez@correo.com", phone: "8341234568", shiftStart: "08:00", shiftEnd: "18:00", status: "En Ruta"},
    { name: "Carlos Martínez Pérez", email: "carlos.martinez@correo.com", phone: "8341234569", shiftStart: "08:00", shiftEnd: "18:00", status: "Disponible"},
    { name: "María Fernández Rivas", email: "maria.fernandez@correo.com", phone: "8341234570", shiftStart: "08:00", shiftEnd: "18:00", status: "Disponible"},
    { name: "Luis Torres Díaz", email: "luis.torres@correo.com", phone: "8341234571", shiftStart: "08:00", shiftEnd: "18:00", status: "En Ruta"},
    { name: "Sofía Herrera Ortiz", email: "sofia.herrera@correo.com", phone: "8341234572", shiftStart: "08:00", shiftEnd: "18:00", status: "En Ruta"},
    { name: "Jorge Méndez Castro", email: "jorge.mendez@correo.com", phone: "8341234573", shiftStart: "08:00", shiftEnd: "18:00", status: "Disponible"},
    { name: "Lucía Vargas Ruiz", email: "lucia.vargas@correo.com", phone: "8341234574", shiftStart: "08:00", shiftEnd: "18:00", status: "Disponible"},
    { name: "Miguel Ramírez Silva", email: "miguel.ramirez@correo.com", phone: "8341234575", shiftStart: "08:00", shiftEnd: "18:00", status: "En Ruta"},
    { name: "Laura García Morales", email: "laura.garcia@correo.com", phone: "8341234576", shiftStart: "08:00", shiftEnd: "18:00", status: "Disponible"},
    { name: "Daniela Ortiz Ramos", email: "daniela.ortiz@correo.com", phone: "8341234577", shiftStart: "08:00", shiftEnd: "18:00", status: "Disponible"},
    { name: "Fernando López Aguilar", email: "fernando.lopez@correo.com", phone: "8341234578", shiftStart: "08:00", shiftEnd: "18:00", status: "Disponible"},
    { name: "Valeria Cruz Vega", email: "valeria.cruz@correo.com", phone: "8341234579", shiftStart: "08:00", shiftEnd: "18:00", status: "Disponible"},
    { name: "Ricardo Jiménez Castillo", email: "ricardo.jimenez@correo.com", phone: "8341234580", shiftStart: "08:00", shiftEnd: "18:00", status: "Disponible"},
    { name: "Alejandra Navarro Flores", email: "alejandra.navarro@correo.com", phone: "8341234581", shiftStart: "08:00", shiftEnd: "18:00", status: "Disponible"},
    { name: "José Herrera Peña", email: "jose.herrera@correo.com", phone: "8341234582", shiftStart: "08:00", shiftEnd: "18:00", status: "Disponible"},
    { name: "Carmen Reyes García", email: "carmen.reyes@correo.com", phone: "8341234583", shiftStart: "08:00", shiftEnd: "18:00", status: "Disponible"},
    { name: "Emilio Sánchez Ortiz", email: "emilio.sanchez@correo.com", phone: "8341234584", shiftStart: "08:00", shiftEnd: "18:00", status: "Disponible"},
    { name: "Raquel Morales Jiménez", email: "raquel.morales@correo.com", phone: "8341234585", shiftStart: "08:00", shiftEnd: "18:00", status: "Disponible"},
    { name: "Mario Pérez Hernández", email: "mario.perez@correo.com", phone: "8341234586", shiftStart: "08:00", shiftEnd: "18:00", status: "Disponible"},
    { name: "Paula Vargas Lozano", email: "paula.vargas@correo.com", phone: "8341234587", shiftStart: "08:00", shiftEnd: "18:00", status: "Disponible" }
];

export default function Users (){
    return (
        <Layout>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Repartidores</h1>
            <Tabla
                columns={columns}
                rows={rows}
                rowsPerPageCustom={10}
            />
        </Layout>
    );
}
