import { Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WebApiService } from '../services/web-api.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edicion-evento',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edicion-evento.component.html',
  styleUrl: './edicion-evento.component.css'
})
export class EdicionEventoComponent {

  eventForm!: FormGroup;
  eventId!: number;
  isDisabled: boolean = false;

  ubicaciones = [
    { id: 1, tipo: "Bogotá" },
    { id: 2, tipo: "Medellín" },
    { id: 3, tipo: "Cali" },
    { id: 4, tipo: "Cartagena" },
    { id: 5, tipo: "Barranquilla" },
    { id: 6, tipo: "Bucaramanga" }
  ];

  constructor(private readonly router: Router, private readonly route:ActivatedRoute, 
              private readonly apiService: WebApiService, private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.eventForm = this.fb.group({
      id:[{ value: '', disabled: true }, Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_hora: ['', Validators.required],
      id_ubicacion: ['', Validators.required]
    });
    this.loadDataEvent();
  }

  loadDataEvent() {
    this.apiService.FindByIdEvent(this.eventId).subscribe(
      (data) => {
        console.log(data);
        this.eventForm.patchValue({
          id: data.id,
          titulo: data.titulo,
          fecha_hora: data.fecha_hora,
          descripcion: data.descripcion,
          id_ubicacion: data.id_ubicacion
        });
      },
      (error) => {
        console.error('Error al cargar los datos del evento:', error);
      }
    );
  }

  updateEvent() {
    console.log("Formulario válido:", this.eventForm.valid);
    
    if (this.eventForm.valid) {
      Swal.fire({
        title: "¿Estás seguro de que deseas actualizar el evento?",
        text: "Esta acción modificará la información del evento.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "No, cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.UpdateEvent(this.eventId, this.eventForm.value).subscribe(
            (response) => {
              console.log('Evento actualizado correctamente:', response);
              Swal.fire("¡Evento actualizado correctamente!", "", "success");
              this.reloadPage();
            },
            (error) => {
              console.error('Error al actualizar el evento:', error);
              Swal.fire("Error al actualizar el evento", "Inténtalo nuevamente.", "error");
            }
          );
        }
      });
    } else {
      Swal.fire("Formulario inválido", "Por favor, revisa los campos obligatorios.", "warning");
    }
  }

  reloadPage() {
    this.router.navigate([`/`]);
  }

}
