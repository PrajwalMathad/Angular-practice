import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PracticeService } from '../../../services/practice.service';
import { LoggerService } from '../../../services/logger.service';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent implements OnInit, OnChanges {
  @Input() formData!: Partial<{ name: string | null, age: number | null }>;
  @Input() size!: number;
  @Output() sizeChange: EventEmitter<number> = new EventEmitter();
  fromParent!: string;
  toParent: string = "";
  toParento: string = "";
  count: number = 234234.234234;
  @Output() toParentViaOutput: EventEmitter<string> = new EventEmitter();
  constructor(
    private practiceService: PracticeService,
    private loggerService: LoggerService) { }

  ngOnInit(): void {
    console.log("in child oninit.", this.formData);
    this.practiceService.createTask.subscribe((data: string) => {
      this.fromParent = data;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let change in changes) {
      const value = changes[change];
      this.loggerService.log(value.previousValue);
      this.loggerService.log(value.currentValue);
    }
  }

  increaseSize = () => {
    this.reSize(+1);
  }

  decreaseSize = () => {
    this.reSize(-1);
  }

  toParentOut = () => {
    this.toParentViaOutput.emit(this.toParento);
  }

  reSize = (delta: number) => {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
  }

  onKeyUp = ($event: any) => {
    console.log($event);
  }
}
