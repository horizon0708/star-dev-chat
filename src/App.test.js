import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { Home } from './pages/Home/Home';
import { SignIn } from './pages/SignIn/SignIn';
import { SignUp } from './pages/SignUp/SignUp';

describe('Navigation', () => {
  test('When profile link from nav bar is clicked, renders Profile page', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    // gets an element with text "profile"
    // this is a regex expression. /profile/ matches with "profile" and 'i' is
    // to make it case insensitive.
    const profileButton = screen.getByText(/profile/i);
    // You can just use string too, if you'd like e.g.
    // const profileButton = screen.getByText("Profile");

    // we are simulating a mouse click on that button
    userEvent.click(profileButton);

    // then we check that our app did render the <Profile /> component
    // by querying for text in the page
    const profilePageText = screen.getByText(/profile page/i);
    expect(profilePageText).toBeInTheDocument();
  });

  test('When sign in link from nav bar is clicked, renders Sign in page', () => {
    render( <MemoryRouter>
      <App />
    </MemoryRouter>,);
    const signinButton = screen.getByText(/signin/i);
    userEvent.click(signinButton);
    signinPageText=screen.getByText(/SignIn page/i);
    expect(signinPageText).toBeInTheDocument();
  }); 

  test('When sign up link from nav bar is clicked, renders Sign up page', () => {
    render( <MemoryRouter>
      <App />
    </MemoryRouter>,);
    const signupButton = screen.getByText(/signup/i);
    userEvent.click(signupButton);
    signupPageText=screen.getByText(/Sign up/i); 
    expect(signupPageText).toBeInTheDocument();
  });

  
  
  test('When the logo from nav bar is clicked, renders Home page', () => {
    render( <MemoryRouter>
      <App />
    </MemoryRouter>,);
    const homeButton = screen.getByText(/ /i);
    userEvent.click(homeButton);
    homePageText=screen.getByTestId('test-home');
    expect(homePageText).toBeInTheDocument();
  });
});
