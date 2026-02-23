import MainVisual from "../components/home/MainVisual";
import MainSecondSection from "../components/home/MainSecondSection.tsx";
import { twMerge } from "tailwind-merge";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <div className="flex-1 w-full min-w-0 overflow-x-hidden">
                {/* 1. 메인 비주얼 (Swiper 적용됨) */}
                <MainVisual />

                <div className={twMerge("pb-20")}>
                    {/* 2. 서브 배너 (.sec1) - MEN / WOMEN */}
                    <MainSecondSection />
                </div>



            </div>
        </div>
    );
};

export default Home;
