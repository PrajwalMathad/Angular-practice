import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRouteComponent } from './no-route.component';

describe('NoRouteComponent', () => {
  let component: NoRouteComponent;
  let fixture: ComponentFixture<NoRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
