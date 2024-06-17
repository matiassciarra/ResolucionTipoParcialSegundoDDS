import { useForm } from "react-hook-form";
import {
    crearEmpleado,
    traerEmpleado,
    actualizarEmpleado,
} from "../../services/empleados.service";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const EmpleadoRegistro = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const onSubmit = async (data) => {
        if (id) {
            await actualizarEmpleado(id, data);
            navigate(-1);
        } else {
            await crearEmpleado(data);
            navigate(-1);
        }
    };

    useEffect(() => {
        const fetchEmpleado = async () => {
            if (id) {
                const empleadoTraido = await traerEmpleado(id);
                for (let campo in empleadoTraido) {
                    setValue(campo, empleadoTraido[campo]);
                }
            }
        };
        fetchEmpleado();
    }, []);

    return (
        <>
            {id ? <h1>Estoy modificando</h1> : <h1>Estoy creando</h1>}
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="" className="form-label">
                    Apellido y nombre
                </label>
                <input
                    type="text"
                    className="form-control"
                    {...register("ApellidoYNombre", {
                        required: {
                            value: true,
                            message: "Es obligatorio",
                        },
                        minLength: {
                            value: 5,
                            message: "Debe contener minimo 5 caracteres",
                        },
                        maxLength: {
                            value: 50,
                            message: "Debe tener como maximo 50 caracteres",
                        },
                    })}
                />
                {errors.ApellidoYNombre && (
                    <span className="text-danger">
                        {" "}
                        {errors.ApellidoYNombre.message}
                    </span>
                )}
                <label htmlFor="" className="form-label">
                    DNI
                </label>
                <input
                    type="text"
                    className="form-control"
                    {...register("Dni", { required: true })}
                />
                <label htmlFor="" className="form-label">
                    Fecha nacimiento
                </label>
                <input
                    type="date"
                    className="form-control"
                    {...register("FechaNacimiento", { required: true })}
                />

                <input
                    type="checkbox"
                    className="form-check-input"
                    {...register("Suspendido")}
                />
                <label htmlFor="" className="form-check-label">
                    Suspendido
                </label>
                <button
                    className="btn btn-primary"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {id ? "Modificar" : "Crear"}
                </button>
            </form>
        </>
    );
};
