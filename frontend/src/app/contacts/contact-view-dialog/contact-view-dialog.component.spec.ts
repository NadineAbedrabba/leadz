import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactViewDialogComponent } from './contact-view-dialog.component';

describe('ContactViewDialogComponent', () => {
  let component: ContactViewDialogComponent;
  let fixture: ComponentFixture<ContactViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactViewDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
