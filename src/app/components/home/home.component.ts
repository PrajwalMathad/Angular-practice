import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location/housing-location';
import { CommonModule } from '@angular/common';
import { HousingService } from '../../services/housing.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnChanges {
  housingLocationList: HousingLocation[] = [];
  filteredlocationList: HousingLocation[] = [];
  // housingService: HousingService = inject(HousingService);
  constructor(private housingService: HousingService) {
    this.housingService.getAllHousingLocationList().then((housingList: HousingLocation[]) => {
      this.housingLocationList = housingList;
      this.filteredlocationList = housingList;
    }).catch(err => {
      console.log(err);
    });
  }
  ngOnInit(): void {
    console.log("on init");
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  filterResults(e: Event, city: string) {
    e.preventDefault();
    if (!city) {
      this.filteredlocationList = this.housingLocationList;
    } else {
      this.filteredlocationList = this.housingLocationList.filter((housingLocation) => {
        return housingLocation.city.toLowerCase().includes(city.toLowerCase());
      })
    }
  }
}
