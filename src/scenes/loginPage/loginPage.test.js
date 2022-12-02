import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { store } from "../../store";
import { Provider } from "react-redux";
import LoginPage from ".";
import { BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "@remix-run/router";

import { act } from "react-dom/test-utils";
import HomePage from "scenes/homePage";
// const render = (component) =>
//   rtlRender(<Provider store={store()}>{component}</Provider>);

describe("Reder Login", () => {
  test("on intial render Login", async () => {
    render(
      <Provider store={store()}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );
    expect(await screen.findByLabelText(/password/i)).toBeEnabled();
    expect(await screen.findByLabelText(/email/i)).toBeEnabled();
    expect(await screen.findByRole("button", { name: /login/i })).toBeEnabled();
  });

  test("login success", async () => {
    render(
      <Provider store={store()}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );
    const canidates = { email: "nguyenron83@gmail.com", password: "Abc123" };
    const emailInput = await screen.findByLabelText(/password/i);
    const passwordInput = await screen.findByLabelText(/email/i);
    const button = await screen.findByRole("button", { name: /login/i });
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: canidates.email } });
      fireEvent.change(passwordInput, {
        target: { value: canidates.password },
      });
    });

    expect(emailInput.value).toBe(canidates.email);
    expect(passwordInput.value).toBe(canidates.password);
    await act(async () => {
      fireEvent.click(button);
    });
  });
});
