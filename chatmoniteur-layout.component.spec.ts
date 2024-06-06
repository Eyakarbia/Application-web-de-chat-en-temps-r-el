import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatmoniteurLayoutComponent } from './chatmoniteur-layout.component';

describe('ChatmoniteurLayoutComponent', () => {
  let component: ChatmoniteurLayoutComponent;
  let fixture: ComponentFixture<ChatmoniteurLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatmoniteurLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatmoniteurLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
