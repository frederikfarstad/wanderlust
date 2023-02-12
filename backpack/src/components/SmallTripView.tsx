
//import ruteNavn from rute
//import ruteBilde from bilde
import domen from "../assets/domen.jpeg"

function SmallTripView() {

    return (
      <div className="grid grid-cols-5 bg-gradient-to-br from-primary-600 to-primary-400 rounded-3xl h-[30vh] mb-[2vh]">
        <div className="rounded-l-3xl overflow-hidden h-full w-full col-span-2">
            <img src={domen} className="h-full border-r-4 border-[#3c3c3c]"/>
        </div>
        <div className="text-white w-auto overflow-hidden col-span-3 p-2">
            <h1 className="border-b">DOOOOMEEEEEN</h1>
            <div className="h-[75%] overflow-scroll text-sm border-b">
                <p>Jeg er en stava gutt. Redder jomfruer i nød. Tatt no shady shit på rulling som kan forårsake død. Jeg er facked. Jeg er skjært. Og jeg er en fackings synder. Men det sto at hun var 18 år på Tinder. Jeg er en stava gutt. Redder jomfruer i nød. Tatt no shady shit på rulling som kan forårsake død. Jeg er facked. Jeg er skjært. Og jeg er en fackings synder. Men det sto at hun var 18 år på TinderJeg er en stava gutt. Redder jomfruer i nød. Tatt no shady shit på rulling som kan forårsake død. Jeg er facked. Jeg er skjært. Og jeg er en fackings synder. Men det sto at hun var 18 år på Tinder. Jeg er en stava gutt. Redder jomfruer i nød. Tatt no shady shit på rulling som kan forårsake død. Jeg er facked. Jeg er skjært. Og jeg er en fackings synder. Men det sto at hun var 18 år på Tinder</p>
            </div>
            <div className="flex justify-center mt-1">
                <button className="border-2 border-white rounded-xl p-1">
                    <p className="text-sm">VIS MER</p>
                </button>
            </div>
        </div>
      </div>
    )
  }
  
export default SmallTripView