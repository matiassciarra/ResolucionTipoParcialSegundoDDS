import { useState, useEffect } from "react";
import { traerEmpleados } from "../../services/empleados.service";
import { eliminarEmpleado } from "../../services/empleados.service";
import { Link } from "react-router-dom";

export const EmpleadoListado = () => {
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        const fetchEmpleados = async () => {
            const data = await traerEmpleados();
            setEmpleados(data);
        };
        fetchEmpleados();
    }, []);

    const handleDelete = async (id) => {
        try {
            await eliminarEmpleado(id);
            setEmpleados(empleados.filter((e) => e.IdEmpleado !== id));
        } catch (error) {
            console.error("Hubo un problema al eliminar el empleado");
        }
    };
    return (
        <>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre completo</th>
                        <th>DNI</th>
                        <th>Fecha nacimiento</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map((e) => (
                        <tr key={e.IdEmpleado}>
                            <th>{e.IdEmpleado}</th>
                            <th>{e.ApellidoYNombre}</th>
                            <th>{e.Dni}</th>
                            <th>{e.FechaNacimiento}</th>
                            <th>
                                {e.Suspendido ? "Suspendido" : "Disponible"}
                            </th>
                            <Link to={`/modificarEmpleado/${e.IdEmpleado}`}>
                                <button className="btn btn-warning">
                                    Modificar
                                </button>
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    handleDelete(e.IdEmpleado);
                                }}
                            >
                                Eliminar
                            </button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
