import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the sign-in form heading and action', () => {
    fixture.detectChanges();

    const heading = fixture.nativeElement.querySelector('h1');
    const button = fixture.nativeElement.querySelector('button');

    expect(heading?.textContent).toContain('Welcome back');
    expect(button?.textContent).toContain('Sign in');
  });
});
