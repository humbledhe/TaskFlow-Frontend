import Link from "next/link";

export default function Hero() {
    return (
        <section className="mt-24">
            <h1 className="text-5xl font-bold w-64 text-[#101727]">
                Task that stay yours.
            </h1>
            <p className="mt-6 text-[#596579]">
                A focused task manager with verified accounts, priorities ans
                statuses. Nothing else in the way.
            </p>
            <div className="mt-8 flex flex-row gap-4 items-center text-sm mb-12">
                <p className="bg-[#0B6B67] text-white px-6 py-2 rounded-md">
                    <Link href="/signup">Create an account</Link>
                </p>
                <p className="border border-[#D1D5DB] bg-white text-[#101727] px-4 py-2 rounded-md">
                    <Link href="/login">Log in</Link>
                </p>
            </div>
        </section>
    );
}
