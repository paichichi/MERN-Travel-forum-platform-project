import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import ProfileSidebar from '../components/Profile/ProfileSidebar/ProfileSideBar';

describe('ProfileSidebar component', () => {
  const changeContent = jest.fn();

  test('render when match is false', () => {
    const { getByText } = render(
      <ProfileSidebar currentcontent="profile" changeContent={changeContent} targetusername="The Elder" match={false} />
    );
    expect(getByText("The Elder's profile")).toBeInTheDocument();
    expect(getByText("Profile")).toBeInTheDocument();
  });

  test('should call changeContent function when a menu item is clicked', () => {
    const { getByText } = render(
      <ProfileSidebar currentcontent="profile" changeContent={changeContent} targetusername="The Elder" match={true} />
    );
    fireEvent.click(getByText("MyPassword"));
    expect(changeContent).toHaveBeenCalledWith("pwd");
  });
});