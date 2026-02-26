import useTheme from './hooks/useTheme';
import { ThemeContext } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import UseCases from './components/UseCases';
import Pricing from './components/Pricing';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
    // 在 App 頂層管理主題狀態，透過 Context 往下傳
    const themeState = useTheme();

    return (
        <ThemeContext.Provider value={themeState}>
            <div className="app">
                <Navbar />
                <main>
                    <Hero />
                    <SocialProof />
                    <Features />
                    <UseCases />
                    <Pricing />
                    <CallToAction />
                </main>
                <Footer />
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
