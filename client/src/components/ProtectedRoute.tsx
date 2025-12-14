import { trpc } from "@/lib/trpc";
import { ComponentType } from "react";
import NotFound404 from "@/pages/NotFound404";

/**
 * Wraps a component with page visibility check
 * @param Component - The component to wrap
 * @param path - The path of the page
 * @returns A wrapped component that checks visibility before rendering
 */
export function withPageVisibility<T extends ComponentType<any>>(
  Component: T,
  path: string
): T {
  // Skip visibility check for admin routes and home page
  if (path.startsWith('/admin') || path === '/' || path === '/fr') {
    return Component;
  }

  const WrappedComponent = (props: any) => {
    // Get visibility for this path
    const { data: pageVisibility, isLoading } = trpc.pageVisibility.getByPath.useQuery(
      { path },
      {
        // Default to visible if not in DB
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 60000, // Cache for 1 minute
      }
    );

    if (isLoading) {
      // Show component while loading (default to visible)
      return <Component {...props} />;
    }

    // If page is not visible, show 404
    if (pageVisibility && !pageVisibility.isVisible) {
      return <NotFound404 />;
    }

    // Page is visible, render normally
    return <Component {...props} />;
  };

  // Copy display name for debugging
  WrappedComponent.displayName = `withPageVisibility(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent as T;
}
