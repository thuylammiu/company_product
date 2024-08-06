import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomPassword from "./CustomPassword";
import "@testing-library/jest-dom/extend-expect";

// Mocking the MUI icons
jest.mock("@mui/icons-material/CheckCircleOutline", () => () => (
  <span>CheckCircleOutlineIcon</span>
));
jest.mock("@mui/icons-material/Close", () => () => <span>CloseIcon</span>);

describe("<CustomPassword />", () => {
  it("renders password input", () => {
    render(
      <CustomPassword
        initPassword=""
        initConfirmPassword=""
        isShowConfirmPassword={false}
        handleChange={() => {}}
        setIsValidPassword={() => {}}
      />
    );
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
  });

  it("renders confirm password input when isShowConfirmPassword is true", () => {
    render(
      <CustomPassword
        initPassword=""
        initConfirmPassword=""
        isShowConfirmPassword={true}
        handleChange={() => {}}
        setIsValidPassword={() => {}}
      />
    );
    expect(screen.getByLabelText(/^confirm password$/i)).toBeInTheDocument();
  });

  it("updates password value on change", () => {
    const handleChange = jest.fn();
    render(
      <CustomPassword
        initPassword=""
        initConfirmPassword=""
        isShowConfirmPassword={false}
        handleChange={handleChange}
        setIsValidPassword={() => {}}
      />
    );
    const passwordInput = screen.getByLabelText(/^password$/i);
    fireEvent.change(passwordInput, { target: { value: "newPassword" } });
    expect(handleChange).toHaveBeenCalled();
  });

  // Add more tests to check password validation logic, icons rendering based on conditions, etc.
  it("changes password value on input change (state change)", () => {
    const handleChange = jest.fn();
    render(
      <CustomPassword
        initPassword=""
        initConfirmPassword=""
        isShowConfirmPassword={false}
        handleChange={handleChange}
        setIsValidPassword={() => {}}
      />
    );

    // Simulate user entering a password to change component's state
    const passwordInput = screen.getByLabelText(/^password$/i);
    fireEvent.change(passwordInput, { target: { value: "newPassword" } });

    // Assert that the password input's value has changed
    expect(passwordInput.value).toBe("newPassword");
  });

  //change login and register
  it("renders confirm password input when props change", () => {
    const { rerender } = render(
      <CustomPassword
        initPassword=""
        initConfirmPassword=""
        isShowConfirmPassword={false}
        handleChange={() => {}}
        setIsValidPassword={() => {}}
      />
    );

    expect(
      screen.queryByLabelText(/^confirm password$/i)
    ).not.toBeInTheDocument();

    rerender(
      <CustomPassword
        initPassword=""
        initConfirmPassword=""
        isShowConfirmPassword={true}
        handleChange={() => {}}
        setIsValidPassword={() => {}}
      />
    );
    expect(screen.getByLabelText(/^confirm password$/i)).toBeInTheDocument();
  });

  const renderNormalCustomPassword = () => render(
    <CustomPassword
      initPassword=""
      initConfirmPassword=""
      isShowConfirmPassword={true}
      handleChange={() => {}}
      setIsValidPassword={() => {}}
    />
  );

  it("validates minimum length of password", () => {
    renderNormalCustomPassword();
    const passwordInput = screen.getByLabelText(/^password$/i);

    fireEvent.change(passwordInput, { target: { value: "short" } });
    expect(screen.getByTestId("tenChar-check")).toHaveStyle(
      "color: red"
    );

    fireEvent.change(passwordInput, {
      target: { value: "ThisIsALongPassword123" },
    });
    expect(screen.getByTestId("tenChar-check")).toHaveStyle(
      "color: green"
    );
    
  });

  it("validates presence of special character", () => {
    renderNormalCustomPassword();

    const passwordInput = screen.getByLabelText(/^password$/i);

    fireEvent.change(passwordInput, { target: { value: "NoSpecialChar" } });
    expect(
      screen.getByTestId("special-check")
    ).toHaveStyle("color: red");
    fireEvent.change(passwordInput, { target: { value: "HasSpecialChar$" } });
    expect(
      screen.getByTestId("special-check")
    ).toHaveStyle("color: green");
  });

  it("validates presence of lowercase letter", () => {
    renderNormalCustomPassword();

    const passwordInput = screen.getByLabelText(/^password$/i);

    fireEvent.change(passwordInput, { target: { value: "NOLOWERCASE" } });
    expect(screen.getByTestId("lowercase-check")).toHaveStyle(
      "color: red"
    );
  
    fireEvent.change(passwordInput, { target: { value: "HasLowercase" } });
    expect(screen.getByTestId("lowercase-check")).toHaveStyle(
      "color: green"
    );
  });

  it("validates presence of uppercase letter", () => {
    renderNormalCustomPassword();

    const passwordInput = screen.getByLabelText(/^password$/i);

    fireEvent.change(passwordInput, { target: { value: "nouppercase" } });
    expect(screen.getByTestId("uppercase-check")).toHaveStyle(
      "color: red"
    );

    fireEvent.change(passwordInput, { target: { value: "HasUppercase" } });
    expect(screen.getByTestId("uppercase-check")).toHaveStyle(
      "color: green"
    );
  });

  it("validates if confirm password matches", () => {
    renderNormalCustomPassword();

    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/^confirm password$/i);

    fireEvent.change(passwordInput, { target: { value: "Password123$" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "DifferentPassword123$" },
    });
    expect(screen.getByTestId("confirmPassword-check")).toHaveStyle(
      "color: red"
    );


    fireEvent.change(confirmPasswordInput, {
      target: { value: "Password123$" },
    });
    expect(screen.getByTestId("confirmPassword-check")).toHaveStyle(
      "color: green"
    );
  });


  const mockSetIsValidPassword = jest.fn();
  const renderCustomPasswordWithIsSetPasswordMockFunction =()=>{
    render(
        <CustomPassword
          initPassword=""
          initConfirmPassword=""
          isShowConfirmPassword={true}
          handleChange={() => {}}
          setIsValidPassword={mockSetIsValidPassword}
        />
      );
  }
  it("checks for a valid password", () => {
    renderCustomPasswordWithIsSetPasswordMockFunction();
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/^confirm password$/i);

    // Enter a password that meets all criteria
    fireEvent.change(passwordInput, { target: { value: "ValidPassword123$" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "ValidPassword123$" },
    });

    // Assert that setIsValidPassword was called with true
    expect(mockSetIsValidPassword).toHaveBeenCalledWith(true);
  });

  it("checks for an invalid password", () => {
    renderCustomPasswordWithIsSetPasswordMockFunction();
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/^confirm password$/i);

    // Enter a password that doesn't meet all criteria
    fireEvent.change(passwordInput, { target: { value: "invalid" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "invalid" } });

    // Assert that setIsValidPassword was called with false
    expect(mockSetIsValidPassword).toHaveBeenCalledWith(false);
  });
});
