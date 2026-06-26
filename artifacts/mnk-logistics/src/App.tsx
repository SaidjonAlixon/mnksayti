import { Navbar } from "@/components/Navbar";
import { RouteLine } from "@/components/RouteLine";
import { CustomCursor } from "@/components/CustomCursor";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Drivers } from "@/components/sections/Drivers";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

function App() {
  return (
    <div className="bg-noise min-h-screen">
      <CustomCursor />
      <RouteLine />
      <Navbar />
      
      <main className="pl-8 md:pl-16 relative z-10">
        <div id="home">
          <Hero />
        </div>
        
        <div id="about">
          <About />
        </div>
        
        <div id="drivers">
          <Drivers />
        </div>
        
        <div id="contact">
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
