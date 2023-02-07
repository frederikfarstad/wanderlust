import siv from "../assets/siv.jpg"
import SmallTripView from "../components/SmallTripView"

function ProfilePage() {

    return (
      <div className="grid smallScreen:grid-cols-1 grid-cols-3 h-screen bg-gradient-to-b from-black to-[#3c3c3c] overflow-scroll">
        <div id="gridOne" className="h-screen">
            <div className="rounded-full overflow-hidden w-1/2 aspect-square m-auto mb-[5vh] mt-[10vh] bg-gradient-to-br from-red-500 via-pink-500 to-yellow-500 p-2">
                <div className="rounded-full overflow-hidden aspect-square">
                    <img src={siv}/>
                </div>
            </div>
            
            <div className="m-auto w-3/4 text-white">
                <h1 className="text-3xl font-serif font-bold bg-inherit">Om meg</h1>
                <div className="bg-gradient-to-br from-red-500 via-pink-500 to-yellow-500 rounded-3xl">
                    <div className="border-4 border-orange-600 rounded-3xl min-h-[20vh] max-h-[40vh] overflow-auto pl-[1.25rem] pt-[0.5rem] pr-[1.25rem] text-xl">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
            </div>   
           
             
        </div>
        <div id="gridTwo" className="">
            <SmallTripView />
        </div>
        <div id="gridThree" className="">
        
        </div>
      </div>
    )
  }
  
  export default ProfilePage