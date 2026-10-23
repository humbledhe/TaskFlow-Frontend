import Header from "@/app/components/home/header";
import Hero from "@/app/components/home/hero";
import TaskSection from "@/app/components/home/task-section";
import FeatureSection from "@/app/components/home/feature-section";

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
