type FeatureCardProps = {
    title: string;
    description: string;
};

export default function FeatureCard({ title, description }: FeatureCardProps) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

            <p className="mt-4 text-sm text-gray-500">{description}</p>
        </div>
    );
}
