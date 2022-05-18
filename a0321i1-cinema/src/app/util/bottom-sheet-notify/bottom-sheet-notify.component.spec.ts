import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetNotifyComponent } from './bottom-sheet-notify.component';

describe('BottomSheetNotifyComponent', () => {
  let component: BottomSheetNotifyComponent;
  let fixture: ComponentFixture<BottomSheetNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSheetNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
