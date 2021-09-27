import React from 'react';
import { Redirect } from 'react-router-dom';
import StoreContextProvider from '../reducer/StoreReducer';

export interface IAuthRouteProps { }

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const { children } = props;
    const { checkAuthUser } = React.useContext(StoreContextProvider);

    if (!checkAuthUser) {
        // logging.warn('No user detected, redirecting');
        return <Redirect to="/login" />;
    } else {
        return (
            <div>{children}</div>
        );
    }

}
export default AuthRoute;
