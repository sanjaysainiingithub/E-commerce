// src/modules/products/components/Pagination.tsx

import { ChevronLeft, ChevronRight } from 'lucide-react';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export function Pagination({ currentPage, totalPages, onPageChange }:PaginationProps) {
  // Don't show pagination if only one page
  if (totalPages <= 1) return null;
  
  // Create array of page numbers to display
  const getPages = () => {
    // For 7 or fewer pages, show all
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // For many pages, show abbreviated version with current page in middle
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    } else if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages];
    } else {
      return [1, '...', currentPage-1, currentPage, currentPage+1, '...', totalPages];
    }
  };

  return (
    <div className="flex justify-center items-center gap-1 mt-6">
      {/* Previous button */}
      <button
        className="px-2 py-1 rounded border disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={16} />
      </button>
      
      {/* Page numbers */}
      {getPages().map((page, i) => (
        page === '...' ? (
          <span key={`dots-${i}`} className="px-2">...</span>
        ) : (
          <button
            key={`page-${page}`}
            className={`w-8 h-8 rounded ${
              currentPage === page 
                ? 'bg-blue-500 text-white' 
                : 'border hover:bg-gray-100'
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      ))}
      
      {/* Next button */}
      <button
        className="px-2 py-1 rounded border disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}