import { Outlet,Navigate } from "react-router-dom";
import { isAuth } from '../../utils/auth';

const Private = () => {
    const Auth=isAuth()
    return Auth ? <Outlet /> : <Navigate to="/auth" />;
};

export default Private;