import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  private http = inject(HttpClient);

  getWeather(latitude: number, longitude: number): Observable<any> {
    const url =
      `https://api.open-meteo.com/v1/forecast
      ?latitude=${latitude}
      &longitude=${longitude}
      &current=temperature_2m,wind_speed_10m,weather_code
      &hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
        .replace(/\s/g, '');

    return this.http.get(url);
  }
}
