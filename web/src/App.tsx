import Habit from "./components/Habit";
function App() {
  return (
    <div className="App">
      <Habit completed={3} />
      <Habit completed={20} />
      <Habit completed={5} />
    </div>
  );
}

export default App;
