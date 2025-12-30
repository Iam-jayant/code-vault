import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

/**
 * Props for the ProtectedRoute component
 */
export interface ProtectedRouteProps {
  /** The content to render when authenticated */
  children: React.ReactNode;
  /** The path to redirect to when unauthenticated (defaults to '/login') */
  redirectTo?: string;
}

/**
 * A route wrapper that protects content from unauthenticated users.
 * 
 * Behavior:
 * - Shows a loading indicator while Privy initializes (ready=false)
 * - Redirects to login page when user is unauthenticated
 * - Renders children when user is authenticated
 * 
 * @example
 * ```tsx
 * <Route path="/dashboard" element={
 *   <ProtectedRoute>
 *     <Dashboard />
 *   </ProtectedRoute>
 * } />
 * ```
 */
export function ProtectedRoute({ 
  children, 
  redirectTo = '/login' 
}: ProtectedRouteProps): JSX.Element {
  const { ready, isAuthenticated } = useAuth();

  // Show loading indicator while Privy initializes
  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login when unauthenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Render protected content when authenticated
  return <>{children}</>;
}

export default ProtectedRoute;
