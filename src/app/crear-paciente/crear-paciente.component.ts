import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PacienteService } from '../service/paciente.service';
import { Paciente } from '../model/paciente';

@Component({
  selector: 'app-crear-paciente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './crear-paciente.component.html',
  styleUrl: './crear-paciente.component.css'
})
export class CrearPacienteComponent implements OnInit{
  pacienteForm!: FormGroup;

  constructor(private fb: FormBuilder, private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.pacienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      rut: ['', [Validators.required, Validators.pattern(/^\d{1,8}-[kK0-9]{1}$/)]],
      sexo: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\+569\d{8}$/)]],
      fechaNacimiento: ['', [Validators.required]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(): void {
    if (this.pacienteForm.valid) {
      console.log('Paciente creado:', this.pacienteForm.value);
      const nuevoPaciente: Paciente = this.pacienteForm.value;
      this.pacienteService.crearPaciente(nuevoPaciente).subscribe({
        next: (paciente) => {
          alert(`Paciente ${paciente.nombre} creado con éxito.`);
          this.pacienteForm.reset(); // Limpia el formulario
        },
        error: (err) => {
          console.error('Error al crear el paciente:', err);
          alert('Ocurrió un error al crear el paciente. Inténtalo nuevamente.');
        },
      });


      alert('Paciente creado con éxito.');
      this.pacienteForm.reset(); // Limpiar el formulario después de enviarlo
    } else {
      console.log('Formulario inválido');
    }
  }
}
