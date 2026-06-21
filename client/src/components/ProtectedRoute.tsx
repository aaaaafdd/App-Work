import { Navigate, Outlet} from "react-router-dom";

interface ProtectedRouteProps {
    isAuthenticated: boolean;

}
    
export default function ProtectedRoute({ isAuthenticated }: ProtectedRouteProps) {
    if (!isAuthenticated) {
        return <Navigate to="/" replace/>;
    }
    return isAuthenticated ? <Outlet /> : null;
}
