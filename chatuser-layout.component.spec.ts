import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatuserLayoutComponent } from './chatuser-layout.component';

describe('ChatuserLayoutComponent', () => {
  let component: ChatuserLayoutComponent;
  let fixture: ComponentFixture<ChatuserLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatuserLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatuserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
