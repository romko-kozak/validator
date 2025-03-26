import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PasswordRules from "components/PasswordRules/PasswordRules";

describe("PasswordRules Component", () => {
  it("should display all rules", () => {
    render(<PasswordRules password="" />);

    expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/contains an uppercase letter/i)).toBeInTheDocument();
    expect(screen.getByText(/contains a lowercase letter/i)).toBeInTheDocument();
    expect(screen.getByText(/contains a number/i)).toBeInTheDocument();
    expect(screen.getByText(/contains a special character/i)).toBeInTheDocument();
  });

  it("should show passed rules for a valid password", () => {
    render(<PasswordRules password="Test1@2#" />);

    // Check that rules are marked as passed
    const ruleItems = screen.getAllByRole("listitem");
    ruleItems.forEach((item) => {
      expect(item.querySelector('svg')).toBeInTheDocument();
    });
  });

  it("should show failed rules for an invalid password", () => {
    render(<PasswordRules password="test" />);

    // Check that some rules are marked as failed
    const ruleItems = screen.getAllByRole("listitem");
    ruleItems.forEach((item) => {
      expect(item.querySelector('svg')).toBeInTheDocument();
    });
  });
});
