import AppLogo from "./appLogo";

import Link from "next/link";

export default function Header() {
    return (
        <>
            <div className="flex flex-row justify-between items-center mt-6">
                <AppLogo />
                <div className="flex flex-row gap-4 text-sm items-center">
                    <p className="text-[#0B6B67]">
                        <Link href="/login">Log in</Link>
                    </p>
                    <p className="border px-4 py-2 rounded-md bg-[#0B6B67] text-white">
                        <Link href="/signup">Get started</Link>
                    </p>
                </div>
            </div>
        </>
    );
}
