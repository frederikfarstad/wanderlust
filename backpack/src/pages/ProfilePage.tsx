import React, { useState } from 'react';
import siv from "../assets/siv.jpg"
import TripView from "../components/TripView"
import Navbar from '../components/Navbar';
import "../index.css"

function ProfilePage() {

    const ownDummyTrips = [
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
    
    const favDummyTrips = [
        {
        title: "Samf",
        desc: "Samf gutt",
        img: "",
        rating:"4.99"
        }
    ]

    return (
        <>
        <Navbar />
        <div className="grid smallScreen:grid-cols-1 grid-cols-3 h-screen bg-primary-300 overflow-scroll">
            <div id="gridOneProfile" className="h-[100vh] fade-in-hello">
                <div className="rounded-full overflow-hidden w-1/2 aspect-square m-auto mb-[5vh] mt-[10vh] bg-gradient-to-br from-primary-600 to-primary-400 p-2">
                    <div className="rounded-full overflow-hidden aspect-square">
                        <img src={siv}/>
                    </div>
                </div>
                
                <div className="m-auto w-3/4 text-white ">
                    <h1 className="text-3xl font-serif font-bold bg-inherit">Om meg</h1>
                    <div className="bg-gradient-to-br from-primary-600 to-primary-400 rounded-3xl">
                        <div className="border-4 border-primary-200 rounded-3xl min-h-[20vh] max-h-[40vh] overflow-auto pl-[1.25rem] pt-[0.5rem] pr-[1.25rem] text-xl scrollbar-hide">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                </div>   
            
                
            </div>
            <div id="gridTwoTrips" className="col-span-2 fade-in-hello">
                <TripView myTrips={ownDummyTrips} favTrips={favDummyTrips}/>
            </div>
            <div id="gridThreeAdvertisement" className="fade-in-hello">
            
            </div>
        </div>
        </>
    )
  }
  
  export default ProfilePage