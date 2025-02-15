import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-eliminacion',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmar-eliminacion.component.html',
  styleUrl: './confirmar-eliminacion.component.css'
})
export class ConfirmarEliminacionComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarEliminacionComponent>,
    @Inject(MAT_DIALOG_DATA) public paciente: any
  ) { }

  eliminar() {
    console.log('Eliminar paciente', this.paciente);
    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
