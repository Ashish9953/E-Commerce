import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoFoundComponentComponent } from './no-found-component.component';

describe('NoFoundComponentComponent', () => {
  let component: NoFoundComponentComponent;
  let fixture: ComponentFixture<NoFoundComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoFoundComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoFoundComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
