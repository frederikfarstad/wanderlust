import { LocationListElement } from "../components/ListElements";
import Navbar from "../components/Navbar";
import { auth } from "../firebase";

export default function WelcomeUserPage() {
  console.log(auth.currentUser);

  return (
    <div className="bg-primary-300">
      <Navbar />
      <div className="h-screen px-60">
        <div className="grid grid-cols-2 gap-x-10">
          <div className="flex col-span-2 justify-center my-24">
            Welcome, {auth.currentUser?.displayName}
          </div>
          <div className="p-4 border-2 border-slate-500 rounded-md bg-primary-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            lorem purus, lacinia at hendrerit quis, cursus sed ex. Maecenas ut
            sem rutrum, vehicula leo ac, feugiat eros. Nam posuere elit massa,
            sit amet consectetur libero posuere ac. Mauris fermentum, ante vitae
            porta mattis, elit felis blandit tellus, sed pharetra erat magna id
            urna.
          </div>
          <div className="p-4 border-2 border-slate-500 rounded-md bg-primary-700">
            Fusce sit amet elit hendrerit, semper neque eu, rhoncus lectus.
            Proin tincidunt tortor magna. Vestibulum mollis ligula sit amet orci
            vulputate aliquet. Donec tortor diam, hendrerit vel placerat sed,
            rhoncus et odio. Vestibulum ultrices ultricies arcu sed viverra.
            Etiam faucibus neque quis metus gravida consectetur. Orci varius
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Nullam in lorem ut nibh suscipit faucibus eu vel
            felis. Proin sollicitudin hendrerit elementum. Donec ac dolor
            lectus.
          </div>
          <div className="bg-blue-500 p-1 overflow-y-scroll overflow-hidden max-h-80 border-2 border-slate-600 space-y-2 ml-3 rounded-md my-14 col-span-2">
            <LocationListElement
              country="Norway"
              province="Trøndelag"
              area="Gløshaugen"
            />
            <LocationListElement
              country="Germany"
              province="Bayern"
              area="Allianz Arena"
            />
            <LocationListElement
              country="Australia"
              province="Queensland"
              area="The beach"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
