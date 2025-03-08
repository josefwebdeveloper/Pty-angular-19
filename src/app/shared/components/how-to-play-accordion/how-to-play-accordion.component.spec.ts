import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToPlayAccordionComponent } from './how-to-play-accordion.component';

describe('HowToPlayAccordionComponent', () => {
  let component: HowToPlayAccordionComponent;
  let fixture: ComponentFixture<HowToPlayAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowToPlayAccordionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowToPlayAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
