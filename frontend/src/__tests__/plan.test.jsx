import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import PlanList from "../components/travel/PlanView/PlanList";

// // dummy plan
const plans = [
  {
    id: 99999,
    destination: "dddddd",
    accomodation: "aaaaa",
    arrive: "0000-00-00",
    leave: "1111-11-22",
    teamsize: 33333,
    price: 22222,
  },
];

test("Renders a plan correctly", () => {
  const { queryByText } = render(<PlanList planDisplay={plans} />);
  expect(queryByText("99999")).toBeDefined();
  expect(queryByText("dddddd")).toBeDefined();
  expect(queryByText("aaaaa")).toBeDefined();
  expect(queryByText("0000-00-00")).toBeDefined();
  expect(queryByText("1111-11-22")).toBeDefined();
  expect(queryByText("33333")).toBeDefined();
  expect(queryByText("22222")).toBeDefined();
});

test("Renders nothing if there's no plan", () => {
  const { queryByText } = render(<PlanList />);
  expect(queryByText("No plans yet")).toBeDefined();
});
