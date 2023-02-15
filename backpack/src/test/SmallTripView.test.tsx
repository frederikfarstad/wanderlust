import SmallTripView from "../components/SmallTripView";
import { render, screen } from "@testing-library/react";

const trip = ["Domen", "Domen gutt", "", "4.26"]
  
//Test that the component renders correct
test("Page renders", () => {
    render(<SmallTripView {...[trip[0], trip[1], trip[2], trip[3]]} />);
    const button = screen.getByRole('button', {
        name: /VIS MER/i
      })
    expect(button).toBeInTheDocument();
    expect(screen.getByText(trip[0])).toBeInTheDocument();
    expect(screen.getByText(trip[1])).toBeInTheDocument();
    expect(screen.getByText(trip[3] + " out of 5")).toBeInTheDocument();
});