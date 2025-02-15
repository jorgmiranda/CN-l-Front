import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { NgIf } from '@angular/common';
@Component({
  selector: 'app-crear-paciente',
  standalone: true,
  imports: [
    NgIf,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './crear-paciente.component.html',
  styleUrl: './crear-paciente.component.css'
})
export class CrearPacienteComponent {

  pacienteForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CrearPacienteComponent>,
    private fb: FormBuilder
  ) {
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

  guardarPaciente() {
    if (this.pacienteForm.valid) {
      this.dialogRef.close(this.pacienteForm.value);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
