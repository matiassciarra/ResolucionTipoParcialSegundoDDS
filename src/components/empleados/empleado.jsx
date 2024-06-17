import { Link } from "react-router-dom";
import { EmpleadoListado } from "./EmpleadoListado";

export const Empleado = () => {
    return (
        <>
            <h1>Empleados</h1>
            <input
                className="form-control"
                placeholder="Buscar empleado por nombre y apellido"
            ></input>
            <button className="btn btn-primary">Buscar</button>
            <Link to="/crearEmpleado">
                <button className="btn btn-success">Agregar empleado</button>
            </Link>
            <EmpleadoListado />
        </>
    );
};
