import { Link } from 'wouter';
import { ChevronRight, Home } from 'lucide-react';
import StructuredData, { createBreadcrumbSchema } from './StructuredData';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  // Always include home as first item
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    ...items,
  ];

  // Create structured data
  const structuredData = createBreadcrumbSchema(
    breadcrumbItems.map(item => ({
      name: item.name,
      url: `https://nukleo.digital${item.url}`,
    }))
  );

  return (
    <>
      <StructuredData data={structuredData} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-white/60 flex-wrap">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            
            return (
              <li key={item.url} className="flex items-center gap-2">
                {index === 0 ? (
                  <Link href={item.url} className="hover:text-white transition-colors">
                    <Home className="w-4 h-4" aria-hidden="true" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4 text-white/40" aria-hidden="true" />
                    {isLast ? (
                      <span className="text-white font-medium" aria-current="page">
                        {item.name}
                      </span>
                    ) : (
                      <Link 
                        href={item.url} 
                        className="hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
