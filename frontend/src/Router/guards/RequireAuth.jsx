import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Route Guard: RequireAuth
 *
 * Protects routes that require authentication.
 * If user is not authenticated, redirects to /login with the attempted location saved.
 * This allows redirecting back to the original page after successful login.
 *
 * Usage in Router:
 * <Route element={<RequireAuth />}>
 *   <Route path="feed" element={<FeedPage />} />
 *   <Route path="settings" element={<SettingsPage />} />
 * </Route>
 */
function RequireAuth() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Show loading spinner while checking authentication status
  if (isLoading) {
    return (
      <div className="flex-col gap-4 w-full min-h-screen flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-primary text-4xl animate-spin flex items-center justify-center border-t-primary rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-primary/35 text-2xl animate-spin flex items-center justify-center border-t-primary rounded-full"></div>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  // Save the attempted URL so we can redirect back after login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected route
  return <Outlet />;
}

export default RequireAuth;
