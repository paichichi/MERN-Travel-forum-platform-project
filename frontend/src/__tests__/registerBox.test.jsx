import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Registerbox from '../components/shared/RegisterBox/Registerbox';

describe('RegisterBox component', () => {

    test('displays without login', () => {
        const { getByText } = render(<Registerbox />);
        expect(getByText("Login")).toBeInTheDocument();
        expect(getByText("Sign Up")).toBeInTheDocument();
    });

    test('displays with a user', () => {

        const user = { id: 1, username: "The Elder" };
        localStorage.setItem("user", JSON.stringify(user))
        const { getByText } = render(<Registerbox />);
        expect(getByText("@The Elder")).toBeInTheDocument();
        expect(getByText("Log out")).toBeInTheDocument();

        localStorage.clear();
    });

});