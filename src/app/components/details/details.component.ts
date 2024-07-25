import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingService } from '../../services/housing.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  // route: ActivatedRoute = inject(ActivatedRoute);
  // housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('')
  })
  constructor(
    private housingService: HousingService,
    private route: ActivatedRoute) {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    console.log(this.route.snapshot.queryParams);
    this.housingService.getHousingLocationById(housingLocationId).then((location) => {
      this.housingLocation = location;
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
      this.applyForm.value.phone ?? ''
    );
  }
}
