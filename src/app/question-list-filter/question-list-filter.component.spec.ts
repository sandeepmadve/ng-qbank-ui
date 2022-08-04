import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionListFilterComponent } from './question-list-filter.component';

describe('QuestionListFilterComponent', () => {
  let component: QuestionListFilterComponent;
  let fixture: ComponentFixture<QuestionListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
