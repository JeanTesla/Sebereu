import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContributionComponent } from './new-contribution.component';

describe('NewContributionComponent', () => {
  let component: NewContributionComponent;
  let fixture: ComponentFixture<NewContributionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewContributionComponent]
    });
    fixture = TestBed.createComponent(NewContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
