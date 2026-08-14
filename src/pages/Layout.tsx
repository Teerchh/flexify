import { NavLink, Outlet } from "react-router";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-1.5 text-sm font-medium transition ${
        isActive ? "bg-white/10 text-white" : "text-gray-100 hover:bg-white/5 hover:text-white"
    }`;

export default function Layout() {
    return (
        <div className="min-h-screen bg-primary">
            <nav className="sticky top-0 z-40 border-b border-white/10 bg-primary/80 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
                    <NavLink to="/" className="flex items-center gap-2">
                        <img src="logo.svg" alt="Movie App logo" className="h-8 w-8" />
                        <span className="text-lg font-bold text-white">Movie App</span>
                    </NavLink>

                    <div className="flex items-center gap-1">
                        <NavLink to="/" end className={navLinkClass}>
                            Home
                        </NavLink>
                        <NavLink to="/favorites" className={navLinkClass}>
                            Favorites
                        </NavLink>
                    </div>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
