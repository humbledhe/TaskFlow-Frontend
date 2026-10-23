import FeatureCard from "./feature-card";

const features = [
    {
        title: "Verified accounts",
        description:
            "Sign up, confirm your email with a one-time code, then log in."
    },
    {
        title: "Private by default",
        description:
            "Every task belongs to you. Only you can see and change it."
    },
    {
        title: "Priority and status",
        description:
            "Mark tasks High, Medium or Low and move them from To do to Done."
    }
];

export default function FeatureSection() {
    return (
        <section className="mx-auto max-w-2xl space-y-8">
            {features.map(feature => (
                <FeatureCard
                    key={feature.title}
                    title={feature.title}
                    description={feature.description}
                />
            ))}
        </section>
    );
}
