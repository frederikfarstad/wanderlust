import siv from "../assets/siv.jpg"


function ProfilePage() {

    return (
        
      <div className="grid grid-cols-3 h-screen bg-[#999999]">
        <div className="flex-1 flex-col justify-center h-screen">
            <div className="rounded-full overflow-hidden w-1/2 aspect-square m-auto mb-20 mt-20">
                <img src={siv}/>
            </div>
            <div className="border-4 border-black rounded-3xl h-fit min-h-[20%] max-h-[50%] overflow-auto m-auto w-3/4 pl-[1.25rem] pt-[0.5rem] pr-[1.25rem] font-mono text-3xl">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
        <div className="flex justify-center">
            På
        </div>
        <div className="flex justify-center">
            Deg
        </div>
      </div>
    )
  }
  
  export default ProfilePage