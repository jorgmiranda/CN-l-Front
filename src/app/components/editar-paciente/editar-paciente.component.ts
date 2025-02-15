import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; // 🔹 Faltaba este módulo
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-editar-paciente',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatOptionModule
  ],
  templateUrl: './editar-paciente.component.html',
  styleUrl: './editar-paciente.component.css'
})
export class EditarPacienteComponent {
  pacienteForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public paciente: any,
    private fb: FormBuilder
  ) {
    this.pacienteForm = this.fb.group({
      nombre: [paciente.nombre],
      apellido: [paciente.apellido],
      rut: [paciente.rut, [Validators.pattern(/^\d{1,8}-[kK0-9]{1}$/)]],
      sexo: [paciente.sexo],
      edad: [paciente.edad],
      email: [paciente.email],
      telefono: [paciente.telefono],
      fechaNacimiento: [paciente.fechaNacimiento],
      direccion: [paciente.direccion]
    });
  }

  guardarCambios() {
    this.dialogRef.close(this.pacienteForm.value);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
