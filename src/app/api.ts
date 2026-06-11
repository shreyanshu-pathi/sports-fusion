import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Sport {
  id: number;
  name: string;
  email: string;
  phone: number
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor ( private http:HttpClient){

  }

  api = "";

  sports(): Observable<Sport[]>{
    return this.http.get<Sport[]>(this.api+'/sports')
  }
}
