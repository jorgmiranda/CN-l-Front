import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { AlertasService } from 'src/app/service/alertas.service';
import { Alerta } from 'src/app/model/alerta';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-listar-alertas',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatListModule 
  ],
  templateUrl: './listar-alertas.component.html',
  styleUrl: './listar-alertas.component.css',
   providers: [AlertasService, DatePipe]
})
export class ListarAlertasComponent implements OnInit{
  alertas: Alerta[] = [];
  alertasModeradas: Alerta[] = [];
  alertasCriticas: Alerta[] = [];

  constructor(private alertService: AlertasService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerAlertas();
  }

  obtenerAlertas(): void {
    this.alertService.obtenerAlertas().subscribe(response => {
      this.alertas = response;
      this.alertasModeradas = this.alertas.filter(alerta => alerta.severidad === 'moderado');
      this.alertasCriticas = this.alertas.filter(alerta => alerta.severidad === 'crítico');
    });
  }

  atenderAlerta(alerta: Alerta): void {
    console.log("ID de alerta atendida: "+alerta.id)
    this.alertService.atenderAlerta(alerta.id).subscribe(() => {
      alert(`Alerta atendida: ${alerta.mensaje}`);
      this.obtenerAlertas();
    });
  }
}
