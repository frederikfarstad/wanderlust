import SmallTripView from "../components/SmallTripView";
import { render, screen } from "@testing-library/react";

const trip = { title: "Domen", description: "Domen gutt", avgRating: 4.26 };

//Test that the component renders correct
test("Page renders", () => {
  render(<SmallTripView entry={trip} />);
  const button = screen.getByRole("button", {
    name: /VIS MER/i,
  });
  expect(button).toBeInTheDocument();
  expect(screen.getByText(trip.title)).toBeInTheDocument();
  expect(screen.getByText(trip.description)).toBeInTheDocument();
  expect(
    screen.getByText(trip.avgRating.toString() + " out of 5")
  ).toBeInTheDocument();
});
