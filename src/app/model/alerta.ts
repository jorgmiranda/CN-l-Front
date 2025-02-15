import { Paciente } from "./paciente";
import { SignosVitales } from "./signos-vitales";

export interface Alerta {
    id: number;
    mensaje: string;
    tipo: string;
    fechaGeneracion: string;
    atendida: boolean;
    severidad: 'moderado' | 'crítico' | null;
    paciente: Paciente;
    signosVitales?: SignosVitales;
  }