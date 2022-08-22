import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileFlyoutComponent } from './user-profile-flyout.component';

describe('UserProfileFlyoutComponent', () => {
  let component: UserProfileFlyoutComponent;
  let fixture: ComponentFixture<UserProfileFlyoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileFlyoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileFlyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
