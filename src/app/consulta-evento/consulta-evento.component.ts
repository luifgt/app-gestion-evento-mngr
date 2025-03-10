import { Component } from '@angular/core';
import { WebApiService } from '../services/web-api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-evento',
  imports: [],
  templateUrl: './consulta-evento.component.html',
  styleUrl: './consulta-evento.component.css'
})
export class ConsultaEventoComponent {

  valores: any[] = [];

  ubicaciones = [
    { id: 1, tipo: "Bogotá" },
    { id: 2, tipo: "Medellín" },
    { id: 3, tipo: "Cali" },
    { id: 4, tipo: "Cartagena" },
    { id: 5, tipo: "Barranquilla" },
    { id: 6, tipo: "Bucaramanga" }
  ];

  constructor(private readonly apiService: WebApiService, private readonly router: Router) {}

  ngOnInit(): void {
    this.consultEvent();
  }

  consultEvent(){
    this.apiService.getValues().subscribe(
      (data) => { 
        this.valores = data; 
      },
      (error) => { 
        console.error("Error al obtener los valores:", error); 
      }
    );
  }

  editEvent(id: number) {
    this.router.navigate([`/v1.0/api/events/${id}`]);
  }

  deleteEvent(id: number) {
    Swal.fire({
      title: "¿Estas seguro que deseas eliminar el registro?",
      showCancelButton: true,
      icon: "warning",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteEvent(id).subscribe(() => {
          Swal.fire("Se eliminó el registro satisfactoriamente!", "", "success");
          this.consultEvent();
        });
      }
    });
  }

  createEvent() {
    this.router.navigate([`/v1.0/api/events/create`]);
  }

  getNameUbication(id: number): string {
    const ubicacion = this.ubicaciones.find(u => u.id === id);
    return ubicacion ? ubicacion.tipo : 'Desconocido';
  }

}
