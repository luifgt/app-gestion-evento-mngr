import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionEventoComponent } from './edicion-evento.component';

describe('EdicionEventoComponent', () => {
  let component: EdicionEventoComponent;
  let fixture: ComponentFixture<EdicionEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicionEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdicionEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
