import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Paciente } from 'src/app/model/paciente';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PacienteService } from 'src/app/service/paciente.service';

import { MatDialog } from '@angular/material/dialog';
import { EditarPacienteComponent } from '../editar-paciente/editar-paciente.component';
import { ConfirmarEliminacionComponent } from '../confirmar-eliminacion/confirmar-eliminacion.component';
import { CrearPacienteComponent } from '../crear-paciente/crear-paciente.component';


@Component({
  selector: 'app-listar-pacientes',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './listar-pacientes.component.html',
  styleUrl: './listar-pacientes.component.css',
  providers: [PacienteService]
})
export class ListarPacientesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'rut', 'sexo', 'edad', 'email', 'telefono', 'fechaNacimiento', 'direccion', 'acciones'];
  dataSource!: MatTableDataSource<Paciente>;

  pacientes: Paciente[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pacienteService:PacienteService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Paciente>([]);
  }

  ngOnInit() {
    this.obtenerPacientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.paginator.pageSize = 10;
    this.paginator.firstPage();

    this.dataSource.sortingDataAccessor = (data: Paciente, sortHeaderId: string): string | number => {
      if (sortHeaderId === 'id') {
        return Number(data.id); // Convierte el ID a número para ordenarlo correctamente
      }
  
      return (data as any)[sortHeaderId] ?? ''; // Accede a la propiedad de forma segura
    };
    
    setTimeout(() => {
      this.sort.active = 'id';
      this.sort.direction = 'asc';
      this.sort.sortChange.emit();
    });
  }


  obtenerPacientes(): void {
    this.pacienteService.obtenerTodosLosPacientes().subscribe(response => {
      this.pacientes = response;
      this.dataSource.data = this.pacientes;

      // Configurar paginator y sort después de recibir los datos
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  // Configuración de dialogs para acciones
  editarPaciente(paciente: Paciente) {
    const dialogRef = this.dialog.open(EditarPacienteComponent, {
      width: '400px',
      data: paciente
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const pacienteEditado: Paciente = result;
        console.log(pacienteEditado);
        this.pacienteService.actualizarPaciente(paciente.id, pacienteEditado).subscribe({
          next: () => {
            alert(`Paciente ${result.nombre} actualizado con éxito.`);
            this.obtenerPacientes(); 
          },
          error: (err) => {
            console.error('Error al actualizar el paciente:', err);
            alert('Ocurrió un error al actualizar el paciente.');
          }
        });
      }
    });
  }
  
  confirmarEliminar(paciente: Paciente) {
    const dialogRef = this.dialog.open(ConfirmarEliminacionComponent, {
      width: '300px',
      data: paciente
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pacienteService.eliminarPaciente(paciente.id).subscribe({
          next: () => {
            alert(`Paciente ${paciente.nombre} eliminado con éxito.`);
            this.obtenerPacientes(); 
          },
          error: (err) => {
            console.error('Error al eliminar el paciente:', err);
            alert('Ocurrió un error al eliminar el paciente.');
          }
        });
      }
    });
  }

  abrirCrearPaciente() {
    const dialogRef = this.dialog.open(CrearPacienteComponent, {
      width: '400px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const nuevoPaciente: Paciente = result;
        console.log('Nuevo paciente:', nuevoPaciente);
        this.pacienteService.crearPaciente(nuevoPaciente).subscribe({
          next: (paciente) => {
            alert(`Paciente ${paciente.nombre} creado con éxito.`);
            this.obtenerPacientes();
           
          },
          error: (err) => {
            console.error('Error al crear el paciente:', err);
            alert('Ocurrió un error al crear el paciente. Inténtalo nuevamente.');
          },
        });
      }
    });
  }
}
