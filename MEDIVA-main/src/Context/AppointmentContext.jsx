
import { createContext, useContext, useState } from "react";
import {
    initialAppointments,
    initialDoctor,
} from "../data/doctorData";

const AppointmentContext = createContext(null);

export function AppointmentProvider({ children }) {
    const [appointments, setAppointments] = useState(() =>
        initialAppointments.map((appointment) => ({
            ...appointment,
            doctor: initialDoctor.name,
            service: initialDoctor.specialty,
        }))
    );

    function addAppointment(appointment) {
        setAppointments((previous) => [
            ...previous,
            { ...appointment, id: Date.now() },
        ]);
    }

    function updateAppointment(id, patch) {
        setAppointments((previous) =>
            previous.map((appointment) =>
                appointment.id === id
                    ? { ...appointment, ...patch }
                    : appointment
            )
        );
    }

    function deleteAppointment(id) {
        setAppointments((previous) =>
            previous.filter((appointment) => appointment.id !== id)
        );
    }

    return (
        <AppointmentContext.Provider
            value={{
                appointments,
                addAppointment,
                updateAppointment,
                deleteAppointment,
            }}
        >
            {children}
        </AppointmentContext.Provider>
    );
}

export function useAppointments() {
    const context = useContext(AppointmentContext);

    if (!context) {
        throw new Error(
            "useAppointments harus digunakan di dalam AppointmentProvider"
        );
    }

    return context;
}
