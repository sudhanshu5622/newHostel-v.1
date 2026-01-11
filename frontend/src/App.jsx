 // import Navbar from "./components/Navbar";
import Hero from "./pages/hero";
import Footer from "./pages/Footer";
import Lastone from "./pages/lastone";
import Contact from "./pages/contact"; 
import SecondMain from "./pages/SecondMain";
import NewItem from "./pages/NewItem";
import Hostel_card from "./pages/Hostel_card";
import FloatingContact from "./pages/FloatingContact"
import Navbar from "./pages/Navbar";


function App(){
  return(
    // <div className="flex flex-col h-screen overflow-hidden">
    //   <Navbar />
    //   <Hero />
    //   <Footer/>
    // </div>
    <>
      <Navbar/>
      <SecondMain />
      <Hostel_card />
      <FloatingContact/>
      <NewItem />
      <Contact /> 
      <Lastone/>
      <Footer/>
    </>
  )
}

export default App;
