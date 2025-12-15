import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullReport } from './full-report';

describe('FullReport', () => {
  let component: FullReport;
  let fixture: ComponentFixture<FullReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
