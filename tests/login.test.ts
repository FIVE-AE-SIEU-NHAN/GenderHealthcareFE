import { Selector } from 'testcafe';

fixture('Login Page Test').page('http://localhost:5173/login');

// Login Success Test
test('Login success redirects to home page', async t => {
  const emailInput = Selector('#email');
  const passwordInput = Selector('#password');
  const submitButton = Selector('button').withText('Log In');

  await t
    .typeText(emailInput, 'k@admin.com')
    .typeText(passwordInput, 'Kiet@123')
    .click(submitButton)
    .expect(t.eval(() => window.location.pathname)).eql('/');
});


// Wrong email/password Test
test('Login failure shows incorrect credentials error', async t => {
  const emailInput = Selector('#email');
  const passwordInput = Selector('#password');
  const submitButton = Selector('button').withText('Log In');
  const errorMsg = Selector('#errorServer');

  await t
    .typeText(emailInput, 'wrong@email.com')
    .typeText(passwordInput, 'wrongPassword')
    .click(submitButton)
    .expect(errorMsg.innerText).eql('Email or password is incorrect');
});


// Banned User Test
test('Banned user sees banned error message', async t => {
  const emailInput = Selector('#email');
  const passwordInput = Selector('#password');
  const submitButton = Selector('button').withText('Log In');
  const errorMsg = Selector('#errorServer');

  await t
    .typeText(emailInput, 't@t.com')
    .typeText(passwordInput, 'Kiet@123')
    .click(submitButton)
    .expect(errorMsg.innerText).eql('User is banned');
});
