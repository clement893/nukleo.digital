import { Link, useLocation } from 'wouter';
import { ChevronRight, Home } from 'lucide-react';
import StructuredData, { createBreadcrumbSchema } from './StructuredData';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb component for navigation hierarchy
 * Automatically generates breadcrumbs from current route if items not provided
 */
export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const [location] = useLocation();
  
  // Auto-generate breadcrumbs from route if not provided
  const breadcrumbItems: BreadcrumbItem[] = items || (() => {
    const pathSegments = location.split('/').filter(Boolean);
    const generated: BreadcrumbItem[] = [
      { name: 'Home', url: '/' }
    ];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      // Convert segment to readable name
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      generated.push({
        name,
        url: currentPath
      });
    });
    
    return generated;
  })();

  return (
    <>
      <StructuredData data={createBreadcrumbSchema(breadcrumbItems)} />
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center gap-2 text-sm ${className}`}
      >
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          
          return (
            <div key={item.url} className="flex items-center gap-2">
              {index === 0 ? (
                <Link href={item.url}>
                  <a className="flex items-center gap-1 text-white/60 hover:text-white transition-colors">
                    <Home className="w-4 h-4" />
                    <span>{item.name}</span>
                  </a>
                </Link>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                  {isLast ? (
                    <span className="text-white font-medium" aria-current="page">
                      {item.name}
                    </span>
                  ) : (
                    <Link href={item.url}>
                      <a className="text-white/60 hover:text-white transition-colors">
                        {item.name}
                      </a>
                    </Link>
                  )}
                </>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
