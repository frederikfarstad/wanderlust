import TripView from "../components/TripView";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const ownTestTrips = [
    {
    title: "Domen",
    desc: "Domen gutt",
    img:"",
    rating:"4.26"
    },
    {
    title: "Gløs",
    desc: "Gløs gutt",
    img:"",
    rating:"5"
    },
    {
    title: "Dragvoll",
    desc: "Dragvoll gutt",
    img:"",
    rating:"1.27"
    },
    {
    title: "Handels",
    desc: "Handels gutt",
    img:"",
    rating:"3.75"
    }
  ]

const ownFavTrips = [
    {
    title: "Samf",
    desc: "Samf gutt",
    img: "",
    rating:"4.99"
    }
]

//Test that the component with a testObject (a list of trips) renders correct
test("Page renders", () => {
    render(<TripView myTrips={ownTestTrips} favTrips={ownFavTrips}/>);
    const button = screen.getByRole('button', {
        name: /Bytt Til "Favoritter"/i
      })
    expect(button).toBeInTheDocument();
    expect(screen.getByText("Dine Turer:")).toBeInTheDocument();
    
    ownTestTrips.map(async (trip) => {
        expect(await screen.findByText(trip.title)).toBeInTheDocument();
        expect(await screen.findByText(trip.desc)).toBeInTheDocument();
        expect(await screen.findByText(trip.rating + " out of 5")).toBeInTheDocument();
    })
});

//Test that the component switches mode when the button is pressed
test("Page switches mode", async () => {
    render(<TripView myTrips={ownTestTrips} favTrips={ownFavTrips}/>);
    const button = screen.getByRole('button', {
        name: /Bytt Til "Favoritter"/i
      })
    expect(button).toBeInTheDocument();
    expect(await screen.findByText("Dine Turer:")).toBeInTheDocument();

    userEvent.click(button); //Change to favorites

    expect(await screen.findByText("Dine Favoritter:")).toBeInTheDocument();
    const newbutton = screen.getByRole('button', {
        name: /Bytt Til "Dine Turer"/i
      })
    expect(newbutton).toBeInTheDocument();
    
    userEvent.click(button); //Change back to your trips

    expect(await screen.findByText("Dine Turer:")).toBeInTheDocument();
    expect(button).toBeInTheDocument();
});

//Test that the favorites are rendered correctly when button is clicked
test("Page renders favorites", async () => {
    render(<TripView myTrips={ownTestTrips} favTrips={ownFavTrips}/>);
    const button = screen.getByRole('button', {
        name: /Bytt Til "Favoritter"/i
      })
    expect(button).toBeInTheDocument();

    userEvent.click(button); //Change to favorites

    expect(await screen.findByText("Dine Favoritter:")).toBeInTheDocument();
    const newbutton = screen.getByRole('button', {
        name: /Bytt Til "Dine Turer"/i
      })
    expect(newbutton).toBeInTheDocument();
    
    ownFavTrips.map(async (trip) => {
        expect(await screen.findByText(trip.title)).toBeInTheDocument();
        expect(await screen.findByText(trip.desc)).toBeInTheDocument();
        expect(await screen.findByText(trip.rating + " out of 5")).toBeInTheDocument();
    })
});