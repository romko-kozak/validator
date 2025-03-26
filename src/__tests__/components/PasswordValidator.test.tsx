import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { PasswordValidator } from "components/PasswordValidator/PasswordValidator";

describe("PasswordValidator Component", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("should render password inputs and submit button", () => {
    render(<PasswordValidator onSubmit={mockOnSubmit} />);
    
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password-input")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /validate password/i })).toBeInTheDocument();
  });

  it("should display password rules", () => {
    render(<PasswordValidator onSubmit={mockOnSubmit} />);
    
    expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/contains an uppercase letter/i)).toBeInTheDocument();
  });

  it("should display password strength indicator", () => {
    render(<PasswordValidator onSubmit={mockOnSubmit} />);
    
    expect(screen.getByText(/password strength/i)).toBeInTheDocument();
    expect(screen.getByText(/none/i)).toBeInTheDocument();
  });

  it("should show error when passwords don't match", async () => {
    render(<PasswordValidator onSubmit={mockOnSubmit} />);
    
    const passwordInput = screen.getByTestId("password-input");
    const confirmPasswordInput = screen.getByTestId("confirm-password-input");
    const submitButton = screen.getByRole("button", { name: /validate password/i });
    
    await userEvent.type(passwordInput, "Test1@");
    await userEvent.type(confirmPasswordInput, "Test2@");
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("should show error for invalid password", async () => {
    render(<PasswordValidator onSubmit={mockOnSubmit} />);
    
    const passwordInput = screen.getByTestId("password-input");
    const confirmPasswordInput = screen.getByTestId("confirm-password-input");
    const submitButton = screen.getByRole("button", { name: /validate password/i });
    
    await userEvent.type(passwordInput, "test");
    await userEvent.type(confirmPasswordInput, "test");
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("should call onSubmit with valid form data", async () => {
    render(<PasswordValidator onSubmit={mockOnSubmit} />);
    
    const passwordInput = screen.getByTestId("password-input");
    const confirmPasswordInput = screen.getByTestId("confirm-password-input");
    const form = screen.getByTestId("password-validator-form");
    
    await userEvent.type(passwordInput, "Test1@");
    await userEvent.type(confirmPasswordInput, "Test1@");
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        password: "Test1@",
        confirmPassword: "Test1@",
      });
    });
  });
});
