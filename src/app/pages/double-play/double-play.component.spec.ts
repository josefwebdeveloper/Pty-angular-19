import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoublePlayComponent } from './double-play.component';

describe('DoublePlayComponent', () => {
  let component: DoublePlayComponent;
  let fixture: ComponentFixture<DoublePlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoublePlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoublePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
