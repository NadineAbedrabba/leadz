import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayContactListComponent } from './display-contact-list.component';

describe('DisplayContactListComponent', () => {
  let component: DisplayContactListComponent;
  let fixture: ComponentFixture<DisplayContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayContactListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
