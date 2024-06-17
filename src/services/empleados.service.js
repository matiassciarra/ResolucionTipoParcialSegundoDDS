export const traerEmpleados = async () => {
    const response = await fetch("http://localhost:4000/api/empleados");
    const data = await response.json();
    return data.Items;
};

export const crearEmpleado = async (empleado) => {
    const response = await fetch("http://localhost:4000/api/empleados", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(empleado),
    });

    if (!response.ok) {
        throw new Error("Hubo un problema al crear el empleado");
    }

    const data = await response.json();
    return data;
};

export const eliminarEmpleado = async (id) => {
    const response = await fetch(`http://localhost:4000/api/empleados/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Hubo un problema al eliminar el empleado");
    }

    const data = await response.json();
    return data;
};

export const traerEmpleado = async (id) => {
    const response = await fetch(`http://localhost:4000/api/empleados/${id}`);

    if (!response.ok) {
        throw new Error("Hubo un problema al obtener el empleado");
    }

    const data = await response.json();
    return data;
};

export const actualizarEmpleado = async (id, empleadoActualizado) => {
    const response = await fetch(`http://localhost:4000/api/empleados/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(empleadoActualizado),
    });

    if (!response.ok) {
        throw new Error("Hubo un problema al actualizar el empleado");
    }

    const data = await response.json();
    return data;
};
