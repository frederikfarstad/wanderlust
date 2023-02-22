import ProfilePage from "../pages/ProfilePage"
import { render, screen } from "@testing-library/react";

//Test that the page renders
test("Page renders", () => {
    render(<ProfilePage />);
    expect(screen.getByText("Om meg")).toBeInTheDocument();
});

//Test that the page renders the tripview component
test("Page renders tripview component", () => {
    render(<ProfilePage />);
    const button = screen.getByRole('button', {
        name: /Bytt Til "Favoritter"/i
      })
    expect(button).toBeInTheDocument();
    expect(screen.getByText("Dine Turer:")).toBeInTheDocument();
});
