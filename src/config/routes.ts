
import DetailProduct from "../components/products/DetailProduct";
import Login from "../view/auth/Login";
import Register from "../view/auth/Register";
import Home from "../view/Home";
import Invoice from "../view/Invoices";
import Profile from "../view/Profile";
import Shop from "../view/Shop";

interface IRoute {
    path: string;
    exact: boolean;
    component: any;
    name: string;
    protected: boolean;
}

const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: Home,
        name: 'Home Page',
        protected: false
    },
    {
        path: '/Shop',
        exact: true,
        component: Shop,
        name: 'Shop Page',
        protected: true
    },
    {
        path: '/profile',
        exact: true,
        component: Profile,
        name: 'profile Page',
        protected: true
    },
    {
        path: '/invoice',
        exact: true,
        component: Invoice,
        name: 'Invoice Page',
        protected: true
    },
    {
        path: '/product/:pageId',
        exact: true,
        component: DetailProduct,
        name: 'DetailProduct Page',
        protected: true
    },
    {
        path: '/Register',
        exact: false,
        component: Register,
        name: 'Register Page',
        protected: false
    },
    {
        path: '/Login',
        exact: false,
        component: Login,
        name: 'Login Page',
        protected: false
    },
    // {
    //     path: '/reset',
    //     exact: true,
    //     component: ResetPasswordPage,
    //     name: 'Reset Password Page',
    //     protected: false
    // }
];

export default routes;