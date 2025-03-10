import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WebApiService } from '../services/web-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creacion-evento',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './creacion-evento.component.html',
  styleUrl: './creacion-evento.component.css'
})
export class CreacionEventoComponent {

  formB = inject(FormBuilder);
  
  constructor(private readonly router: Router, private readonly route:ActivatedRoute, 
              private readonly apiService: WebApiService) {}

  eventCreateForm: FormGroup = this.formB.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      fecha_hora: ['', Validators.required],
      id_ubicacion: ['', Validators.required]
  })

  createEvent() {
    if (this.eventCreateForm.valid) {
      this.apiService.createEvent(this.eventCreateForm.value).subscribe(
        (response) => {
          Swal.fire('Evento creado', 'El evento se creó exitosamente', 'success');
          this.eventCreateForm.reset();
        },
        (error) => {
          Swal.fire('Error', 'No se pudo crear el evento', 'error');
          console.error('Error al crear el evento:', error);
        }
      );
    } else {
      Swal.fire('Formulario incompleto', 'Por favor, completa todos los campos correctamente', 'warning');
    }
  }

  reloadPage() {
    this.router.navigate([`/`]);
  }
  
}
