import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  private readonly endPoint: string = environment.apiMain;
  private readonly api: string = environment.api;


  constructor(private readonly http: HttpClient) { }

  getValues(): Observable<any[]> {
    const url = `${this.endPoint}/${this.api}`
    return this.http.get<any[]>(url);
  }

  FindByIdEvent(id: number): Observable<any> {
    const url = `${this.endPoint}/${this.api}/${id}`
    return this.http.get(url);
  }

  UpdateEvent(id: number, eventoData: any): Observable<any> {
    const url = `${this.endPoint}/${this.api}/${id}`
    console.log(url);
    return this.http.put(url, eventoData);
  }

  deleteEvent(id: number): Observable<any> {
    const url = `${this.endPoint}/${this.api}/${id}`
    return this.http.delete(url);
  }

  createEvent(eventData: any): Observable<any> {
    const url = `${this.endPoint}/${this.api}`
    return this.http.post(url, eventData);
  }
}
