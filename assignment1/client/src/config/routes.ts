import { IRoute } from "../common/interfaces";
import { HomePage } from "../common/pages/home/HomePage";
import { SignOutPage } from "../common/pages/SignOut/SignOutPage";
import { LoginPage } from "../common/pages/SingUpAndLogin/LoginPage";

export const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home Page',
        component: HomePage,
        exact: true,
        auth: true,
        navHeader: true
    },
    {
        path: '/login',
        name: 'Login Page',
        component: LoginPage,
        exact: true,
        auth: false,
        navHeader: false
    },
    {
        path: '/signout',
        name: 'SignOut Page',
        component: SignOutPage,
        exact: true,
        auth: true,
        navHeader: false
    }
];