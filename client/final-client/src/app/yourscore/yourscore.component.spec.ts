import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourscoreComponent } from './yourscore.component';

describe('YourscoreComponent', () => {
  let component: YourscoreComponent;
  let fixture: ComponentFixture<YourscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourscoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
