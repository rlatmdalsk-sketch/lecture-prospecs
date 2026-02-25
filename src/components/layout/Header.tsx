import { Link, useLocation, useNavigate } from "react-router";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import useLayoutStore from "../../store/useLayoutStore.ts";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore.ts";

const GNB_MENU = [
    {
        name: "RUNNING",
        path: "/category/6",
        subMenus: [
            { name: "신발", path: "/category/6" },
            { name: "의류", path: "/running/clothing" },
            { name: "액세서리", path: "/running/accessories" },
        ],
    },
    {
        name: "SPORTS STYLE",
        path: "/sports-style",
        subMenus: [
            { name: "신발", path: "/sports-style/shoes" },
            { name: "의류", path: "/sports-style/clothing" },
            { name: "액세서리", path: "/sports-style/accessories" },
        ],
    },
    {
        name: "HERITAGE",
        path: "/heritage",
        subMenus: [
            { name: "마라톤 110 파리", path: "/heritage/110-paris" },
            { name: "마라톤 110", path: "/heritage/110" },
            { name: "마라톤 220", path: "/heritage/220" },
            { name: "그랜드 슬램 82", path: "/heritage/grand-slam" },
        ],
    },
    {
        name: "SPORTS",
        path: "/sports",
        subMenus: [
            { name: "야구", path: "/sports/baseball" },
            { name: "축구", path: "/sports/football" },
            { name: "농구", path: "/sports/basketball" },
            { name: "기타", path: "/sports/etc" },
        ],
    },
    { name: "ONE SPEC", path: "/onespec", subMenus: [] },
    {
        name: "OUR STORY",
        path: "/story",
        subMenus: [
            { name: "공식 후원", path: "/story/sponsorship" },
            { name: "브랜드 선언", path: "/story/manifesto" },
            { name: "시즌 컬렉션", path: "/story/collection" },
            { name: "브랜드 가이드", path: "/story/guide" },
            { name: "이벤트", path: "/story/event" },
        ],
    },
];

const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuthStore();
    const { isTopBannerVisible, topBannerHeight } = useLayoutStore();

    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isMenuOpen = hoveredMenu !== null;
    const isHome = pathname === "/";
    const isTransparent = isHome && !isScrolled;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            logout();
            alert("로그아웃 되었습니다.");
            navigate("/");
        }
    };

    const headerTop = isTopBannerVisible ? `${topBannerHeight}px` : "0px";

    return (
        <header
            onMouseLeave={() => setHoveredMenu(null)}
            className={twMerge(
                "fixed left-0 right-0 z-50 transition-all duration-300 border-b",
                isTransparent
                    ? "bg-transparent border-transparent text-white"
                    : "bg-white border-gray-100 text-black",
            )}
            style={{ top: headerTop }}>
            <div className="mx-auto w-full px-4 h-20 flex items-center justify-between">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="lg:hidden text-2xl cursor-pointer">
                    <IoMenu />
                </button>

                <Link to="/" className="shrink-0 w-40 text-center lg:text-left">
                    <span className="text-3xl font-black tracking-tighter italic uppercase">
                        PROSPECS
                    </span>
                </Link>

                <nav className="hidden lg:flex flex-1 justify-center gap-12 font-bold text-[15px] tracking-tight h-full">
                    {GNB_MENU.map(menu => (
                        <div
                            key={menu.name}
                            className="relative h-full flex items-center w-28 justify-center"
                            onMouseEnter={() => setHoveredMenu(menu.name)}>
                            <Link
                                to={menu.path}
                                className="relative py-7 hover:text-red-600 transition-colors group">
                                {menu.name}
                                <span
                                    className={twMerge(
                                        "absolute bottom-0 left-0 h-[2px] bg-red-600 transition-all duration-300",
                                        hoveredMenu === menu.name ? "w-full" : "w-0",
                                    )}
                                />
                            </Link>
                        </div>
                    ))}
                </nav>

                <div className="flex items-center gap-5 text-2xl w-40 lg:w-100 justify-end">
                    <div className="relative hidden md:block">
                        <input
                            type="text"
                            placeholder="검색"
                            className={twMerge(
                                "w-20 border-b text-sm py-1 focus:outline-none focus:w-30 transition-all",
                                isTransparent
                                    ? "bg-transparent border-white text-white placeholder:text-white"
                                    : "border-black text-black",
                            )}
                        />
                        <button className="absolute right-0 top-1 text-xl">
                            <IoSearch />
                        </button>
                    </div>
                    {isLoggedIn ? (
                        <div className="items-center gap-3 hidden md:flex">
                            <Link to="/my/orders" className="text-sm font-bold uppercase">
                                MYPAGE
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-bold hover:text-gray-500 transition-colors uppercase">
                                LOGOUT
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="text-sm font-bold hidden md:block uppercase">
                            LOGIN
                        </Link>
                    )}
                    <Link to="/cart" className="relative flex items-center gap-1">
                        <span className="text-sm font-bold hidden md:block uppercase">CART</span>
                    </Link>
                </div>
            </div>

            <div
                className={twMerge(
                    "absolute top-20 left-0 w-full bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out z-10",
                    isMenuOpen ? "h-64 opacity-100 border-b shadow-sm" : "h-0 opacity-0 border-b-0",
                )}>
                <div className="mx-auto w-full px-4 h-full flex justify-between pt-8 text-black">
                    <div className="w-40 shrink-0" /> {/* 로고 영역 고정 */}
                    <div className="hidden lg:flex flex-1 justify-center gap-12 h-full">
                        {GNB_MENU.map(menu => (
                            <ul key={menu.name} className="w-28 flex flex-col items-center gap-3">
                                {" "}
                                {/* w-28, items-center 적용 */}
                                {menu.subMenus.map(subMenu => (
                                    <li key={subMenu.name} className="w-full text-center">
                                        <Link
                                            to={subMenu.path}
                                            className="block text-sm text-gray-500 hover:text-red-600 hover:underline underline-offset-4 transition-colors font-medium whitespace-nowrap">
                                            {subMenu.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                    <div className="w-40 lg:w-100 shrink-0" /> {/* 우측 버튼 영역 고정 */}
                </div>
            </div>

            <div
                className={twMerge(
                    "fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity duration-300",
                    isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            <div
                className={twMerge(
                    "fixed top-0 left-0 w-[280px] h-full bg-white z-[70] lg:hidden transition-transform duration-300 ease-in-out flex flex-col shadow-2xl text-black",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
                )}>
                <div className="h-20 flex items-center justify-between px-6 border-b shrink-0">
                    <span className="text-2xl font-black italic">PROSPECS</span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-3xl">
                        <IoClose />
                    </button>
                </div>
                <nav className="flex-1 overflow-y-auto p-6">
                    <div className="flex flex-col gap-8">
                        {GNB_MENU.map(menu => (
                            <div key={menu.name} className="flex flex-col gap-4">
                                <Link
                                    to={menu.path}
                                    className="text-lg font-bold tracking-tight uppercase">
                                    {menu.name}
                                </Link>
                                {menu.subMenus.length > 0 && (
                                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pl-1 border-l-2 border-gray-50">
                                        {menu.subMenus.map(subMenu => (
                                            <li key={subMenu.name}>
                                                <Link
                                                    to={subMenu.path}
                                                    className="text-[13px] text-gray-500 hover:text-red-600">
                                                    {subMenu.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </nav>
                <div className="p-6 bg-gray-50 flex flex-col gap-4 border-t shrink-0">
                    {!isLoggedIn ? (
                        <Link
                            to="/login"
                            className="text-sm font-bold text-center py-3 bg-black text-white rounded">
                            LOGIN
                        </Link>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="text-sm font-bold text-center py-3 border border-black rounded">
                            LOGOUT
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
