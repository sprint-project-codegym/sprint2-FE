import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmVerificationCodeComponent } from './confirm-verification-code.component';

describe('ConfirmVerificationCodeComponent', () => {
  let component: ConfirmVerificationCodeComponent;
  let fixture: ComponentFixture<ConfirmVerificationCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmVerificationCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmVerificationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
