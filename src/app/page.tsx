import Header from "@/app/components/header";
import Hero from "@/app/components/hero";
import TaskSection from "@/app/components/taskSection";
import FeatureSection from "@/app/components/featureSection";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#F5F6F8] px-12">
            <header>
                <Header />
            </header>
            <main>
                <Hero />
                <TaskSection />
                <div className="mb-24" />
                <FeatureSection />
            </main>
            <footer>
                <h4 className="text-[#596579] text-center mt-32 mb-4">
                    TaskFlow
                </h4>
            </footer>
        </div>
    );
}
