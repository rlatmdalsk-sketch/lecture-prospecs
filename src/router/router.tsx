import { createBrowserRouter, redirect } from "react-router";
import Layout from "../layouts/Layout.tsx";
import Home from "../pages/Home.tsx";
import Register from "../pages/Register.tsx";
import Login from "../pages/Login.tsx";
import useAuthStore from "../store/useAuthStore.ts";

// Admin & Shop Pages
import AdminLayout from "../layouts/AdminLayout.tsx";
import AdminCategoryList from "../pages/(admin)/categories/AdminCategoryList.tsx";
import AdminProductList from "../pages/(admin)/products/AdminProductList.tsx";
import AdminProductNew from "../pages/(admin)/products/AdminProductNew.tsx";
import AdminProductEdit from "../pages/(admin)/products/adminProductEdit.tsx";

import ProductListPage from "../pages/(shop)/ProductListPage.tsx";
import ProductDetailPage from "../pages/(shop)/ProductDetailPage.tsx";
import CartPage from "../pages/(shop)/CartPage.tsx";
import OrderPage from "../pages/(shop)/OrderPage.tsx";
import OrderSuccessPage from "../pages/(shop)/OrderSuccessPage.tsx";
import OrderFailPage from "../pages/(shop)/OrderFailPage.tsx";

import MyLayout from "../layouts/MyLayout.tsx";
import MyDashboard from "../pages/(shop)/MyDashboard.tsx";
import MyOrderList from "../pages/(shop)/MyOrderList.tsx";
import MyOrderDetail from "../pages/(shop)/MyOrderDetail.tsx";
import MyReviewList from "../pages/(shop)/MyReviewList.tsx";
import MyInquiryList from "../pages/(shop)/MyInquiryList.tsx";
import MyInquiryWrite from "../pages/(shop)/MyInquiryWrite.tsx";

// Loader: 로그인한 사용자는 접근 불가 (로그인/회원가입)
const guestOnlyLoader = () => {
    const isLoggedIn = useAuthStore.getState().isLoggedIn;
    if (isLoggedIn) return redirect("/");
    return null;
};

// Loader: 관리자만 접근 가능
const adminOnlyLoader = () => {
    const { isLoggedIn, user } = useAuthStore.getState();
    if (!isLoggedIn) {
        alert("로그인이 필요합니다.");
        return redirect("/login");
    }
    if (user?.role !== "ADMIN") {
        alert("관리자 권한이 없습니다.");
        return redirect("/");
    }
    return null;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login />, loader: guestOnlyLoader },
            { path: "register", element: <Register />, loader: guestOnlyLoader },
            { path: "cart", element: <CartPage /> },

            /* --- Shop Category Routes (GNB와 연동) --- */
            // ID 기반 카테고리 (예: /category/6)
            { path: "category/:id", element: <ProductListPage /> },
            // 경로 기반 카테고리 (예: /running/shoes, /sports-style)
            { path: "running/:sub?", element: <ProductListPage /> },
            { path: "sports-style/:sub?", element: <ProductListPage /> },
            { path: "heritage/:sub?", element: <ProductListPage /> },
            { path: "sports/:sub?", element: <ProductListPage /> },
            { path: "onespec", element: <ProductListPage /> },
            { path: "story/:sub?", element: <ProductListPage /> },

            /* --- Product Detail --- */
            { path: "product/:id", element: <ProductDetailPage /> },

            /* --- Order Process --- */
            {
                path: "order",
                children: [
                    { index: true, element: <OrderPage /> },
                    { path: "success", element: <OrderSuccessPage /> },
                    { path: "fail", element: <OrderFailPage /> },
                ],
            },

            /* --- My Page (Nested Layout) --- */
            {
                path: "my",
                element: <MyLayout />,
                children: [
                    { index: true, element: <MyDashboard /> },
                    {
                        path: "orders",
                        children: [
                            { index: true, element: <MyOrderList /> },
                            { path: ":id", element: <MyOrderDetail /> },
                        ],
                    },
                    { path: "reviews", element: <MyReviewList /> },
                    {
                        path: "inquiry",
                        children: [
                            { index: true, element: <MyInquiryList /> },
                            { path: "write", element: <MyInquiryWrite /> },
                        ],
                    },
                ],
            },
        ],
    },

    /* --- Admin Routes --- */
    {
        path: "/admin",
        element: <AdminLayout />,
        loader: adminOnlyLoader,
        children: [
            { index: true, element: <AdminProductList /> }, // 기본 페이지를 상품 목록으로
            { path: "categories", element: <AdminCategoryList /> },
            { path: "products", element: <AdminProductList /> },
            { path: "products/new", element: <AdminProductNew /> },
            { path: "products/:id", element: <AdminProductEdit /> },
        ],
    },
]);

export default router;