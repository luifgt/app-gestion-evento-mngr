import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreacionEventoComponent } from './creacion-evento.component';
import { WebApiService } from '../services/web-api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

describe('CreacionEventoComponent', () => {
  let component: CreacionEventoComponent;
  let fixture: ComponentFixture<CreacionEventoComponent>;
  let apiServiceSpy: jasmine.SpyObj<WebApiService>;

  beforeEach(async () => {
    // Creando un spy object correctamente
    apiServiceSpy = jasmine.createSpyObj<WebApiService>('WebApiService', ['createEvent']);

    await TestBed.configureTestingModule({
      declarations: [CreacionEventoComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: WebApiService, useValue: apiServiceSpy }], // Inyectamos el SpyObj
    }).compileComponents();

    fixture = TestBed.createComponent(CreacionEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe mostrar una alerta si el formulario es inválido', () => {
    spyOn(Swal, 'fire');
    component.eventCreateForm.setValue({
      titulo: '',
      fechaHora: '',
      descripcion: '',
      idUbicacion: null,
    });

    component.createEvent();

    expect(Swal.fire).toHaveBeenCalledWith(
      'Formulario incompleto',
      'Por favor, completa todos los campos correctamente',
      'warning'
    );
  });

  it('Debe llamar a createEvent() del WebApiService y mostrar éxito si la solicitud es exitosa', () => {
    spyOn(Swal, 'fire');
    component.eventCreateForm.setValue({
      titulo: 'Evento de prueba',
      fechaHora: '2025-03-10T12:00:00',
      descripcion: 'Descripción del evento',
      idUbicacion: 5,
    });

    apiServiceSpy.createEvent.and.returnValue(of({ message: 'Evento creado' }));

    component.createEvent();

    expect(apiServiceSpy.createEvent).toHaveBeenCalledWith(component.eventCreateForm.value);
    expect(Swal.fire).toHaveBeenCalledWith(
      'Evento creado',
      'El evento se creó exitosamente',
      'success'
    );

    expect(component.eventCreateForm.value).toEqual({
      titulo: null,
      fechaHora: null,
      descripcion: null,
      idUbicacion: null,
    });
  });

  it('Debe manejar el error cuando la API falla', () => {
    spyOn(Swal, 'fire');
    spyOn(console, 'error');

    component.eventCreateForm.setValue({
      titulo: 'Evento de prueba',
      fechaHora: '2025-03-10T12:00:00',
      descripcion: 'Descripción del evento',
      idUbicacion: 5,
    });

    apiServiceSpy.createEvent.and.returnValue(throwError(() => new Error('Error en la API')));

    component.createEvent();

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'No se pudo crear el evento', 'error');
    expect(console.error).toHaveBeenCalledWith('Error al crear el evento:', new Error('Error en la API'));
  });
});
