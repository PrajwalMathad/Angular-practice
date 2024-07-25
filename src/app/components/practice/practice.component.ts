import { AfterViewInit, Component, computed, effect, Input, OnDestroy, OnInit, signal, Signal, ViewChild, viewChild } from '@angular/core';
import { PracticeService } from '../../services/practice.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoggerService } from '../../services/logger.service';
import { ChildComponent } from './child/child.component';
import { HousingService } from '../../services/housing.service';
import { HousingLocation } from '../housing-location/housing-location';
import { HighlightDirective } from '../../directives/highlight.directive';
import { Observable } from 'rxjs';
import { AppendPipe } from '../../pipes/append.pipe';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ChildComponent, HighlightDirective, AppendPipe],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.scss'
})
export class PracticeComponent implements OnInit, OnDestroy, AfterViewInit {
  housingList!: HousingLocation[];
  colorChange: boolean = false;
  showHousingList: boolean = false;
  actionName: string;
  fontSize: number = 10;
  birthday = new Date(1996, 3, 25);
  selectedHouse!: HousingLocation;
  highLightColor!: string;
  listForObservable: number[] = [];
  inputValue: string = "";
  fromChild!: string;
  fromChildo!: string;

  count = signal(0);
  double: Signal<number> = computed(() => this.count() * 2);


  firstFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl(0),
    email: new FormControl('', Validators.required),
    address: new FormControl('')
  })

  @ViewChild(ChildComponent) childComponent: any;

  constructor(
    private practiceService: PracticeService,
    private loggerService: LoggerService,
    private housingService: HousingService) {
    this.actionName = "Some aria label";
    this.highLightColor = "yellow";
    effect(() => {
      console.log(`${this.count()}`);
    })
  }
  ngAfterViewInit(): void {
    this.fromChild = this.childComponent.toParent;
  }

  // testObservable = new Observable((observer) => {
  //   setTimeout(() => { observer.next(1) }, 1000);
  //   setTimeout(() => { observer.next(2) }, 2000);
  //   setTimeout(() => { observer.next(3) }, 3000);
  //   setTimeout(() => { observer.next(4) }, 4000);
  //   setTimeout(() => { observer.next(5) }, 5000);
  //   setTimeout(() => { observer.complete() }, 6000);
  // })

  getData = () => {
    // this.testObservable.subscribe((data: any) => {
    //   this.listForObservable.push(data);
    // })

    //to handle next, error and complete
    this.housingService.obs1.subscribe({
      next: (data: any) => {
        this.listForObservable.push(data);
      },
      error: (err) => {
        alert(err.message);
      },
      complete: () => {
        alert("All done!")
      }
    })
  }

  toChild = () => {
    this.practiceService.onCreateTask(this.inputValue);
  }

  fromChildOut = ($event: string) => {
    this.fromChildo = $event;
  }

  getHotelList = () => {
    this.housingService.getAllHousingLocationList().then((housingList: HousingLocation[]) => {
      this.housingList = housingList;
      this.selectedHouse = housingList[0];
    })
  }

  ngOnInit(): void {
    console.log("in Oninit practice.");
    this.getHotelList();
  }

  ngOnDestroy(): void {
    console.log("on destroy practice")
  }

  onFormSubmit() {
    this.loggerService.log(this.firstFormGroup.value.name);
    this.loggerService.log(this.firstFormGroup.value.age);
    this.loggerService.log(this.firstFormGroup);
  }

  toggleList() {
    this.showHousingList = !this.showHousingList;
  }

  increaseCount() {
    this.count.update(value => value + 1);
  }

  resetCount() {
    this.count.set(0);
  }

  changeColor() {
    this.colorChange = !this.colorChange;
  }
}
