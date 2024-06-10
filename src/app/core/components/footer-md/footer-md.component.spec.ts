import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMDComponent } from './footer-md.component';

describe('FooterComponent', () => {
  let component: FooterMDComponent;
  let fixture: ComponentFixture<FooterMDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterMDComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterMDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
