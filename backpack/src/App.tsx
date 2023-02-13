import { Routes, Route } from "react-router-dom";

// Change routes based on when you want to render an element
// That means creating a <Route /> with the element prop, pointing to the page you want to go

// Example:
// <Route path="/posts/ element={<Posts />} />"

// I am not sure if this is the best way to do things long term.
// Maybe later we find better solutions

function App() {
  return (
    <>
      <div className="text-3xl underline font-bold">Hello, World!</div>
      <Routes>
        <Route path="/" />
        <Route path="/posts" />
        <Route path="/posts/:id" />
      </Routes>
    </>
  );
}

export default App;
