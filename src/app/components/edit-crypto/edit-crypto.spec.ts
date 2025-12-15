import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCrypto } from './edit-crypto';

describe('EditCrypto', () => {
  let component: EditCrypto;
  let fixture: ComponentFixture<EditCrypto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCrypto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCrypto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
