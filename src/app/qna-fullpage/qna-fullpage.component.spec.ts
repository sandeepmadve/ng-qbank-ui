import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QnaFullpageComponent } from './qna-fullpage.component';

describe('QnaFullpageComponent', () => {
  let component: QnaFullpageComponent;
  let fixture: ComponentFixture<QnaFullpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QnaFullpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QnaFullpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
