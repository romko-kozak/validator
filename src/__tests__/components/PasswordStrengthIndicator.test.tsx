import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PasswordStrengthIndicator from "components/PasswordStrengthIndicator/PasswordStrengthIndicator";

describe("PasswordStrengthIndicator Component", () => {
  it("should display 'None' for empty password", () => {
    render(<PasswordStrengthIndicator password="" />);
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("should display 'Medium' for password with only lowercase", () => {
    render(<PasswordStrengthIndicator password="testtest" />);
    expect(screen.getByText("Medium")).toBeInTheDocument();
  });

  it("should display appropriate strength for a strong password", () => {
    render(<PasswordStrengthIndicator password="Test1@2#" />);
    const strengthText = screen.getByText(/Strong/);
    expect(strengthText).toBeInTheDocument();
  });

  it("should render the correct strength gradient bar", () => {
    render(<PasswordStrengthIndicator password="Test1@" />);
    const progressBar = screen.getByTestId("strength-gradient-bar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("strength", expect.stringMatching(/[1-4]/));
  });

  it("should have the correct strength bar width", () => {
    render(<PasswordStrengthIndicator password="Test1@" />);
    const progressBar = screen.getByTestId("strength-gradient-bar");
    expect(progressBar).toHaveAttribute("width", expect.stringMatching(/\d+/));
  });
});
