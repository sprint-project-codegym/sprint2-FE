import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoResetPasswordComponent } from './do-reset-password.component';

describe('DoResetPasswordComponent', () => {
  let component: DoResetPasswordComponent;
  let fixture: ComponentFixture<DoResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
