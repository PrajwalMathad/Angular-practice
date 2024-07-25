import { Injectable, inject } from '@angular/core';
import { HousingLocation } from '../components/housing-location/housing-location';
import { LoggerService } from './logger.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = 'http://localhost:3000/locations';
  // loggerService: LoggerService = inject(LoggerService);
  constructor(private loggerService: LoggerService, private http: HttpClient) { }

  obs1 = new Observable((observer) => {
    setTimeout(() => { observer.next(1) }, 1000);
    setTimeout(() => { observer.next(2) }, 2000);
    setTimeout(() => { observer.next(3) }, 3000);
    setTimeout(() => { observer.next(4) }, 4000);
    setTimeout(() => { observer.next(5) }, 5000);
    setTimeout(() => { observer.complete() }, 6000);
  })

  async getAllHousingLocationList() : Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    const formattedData = await data.json() ?? [];
    this.loggerService.log(formattedData);
    return formattedData ?? [];
   }
  
  async getHousingLocationById(id:Number) : Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    const formattedData = await data.json() ?? [];
    this.loggerService.log(formattedData);
    return formattedData ?? {};
  }

  submitApplication(firstName: string, lastName: string, email:string, phone:string) {
    console.log(firstName, lastName, email, phone);
  }
}
