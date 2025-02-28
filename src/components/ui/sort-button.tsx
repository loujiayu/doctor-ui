import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { SortField, SortOrder } from '@/stores/patient-store';
import { cn } from '@/lib/utils';

interface SortButtonProps {
  label: string;
  field: SortField;
  currentSortField: SortField;
  currentSortOrder: SortOrder;
  onSort: (field: SortField) => void;
  className?: string;
}

export function SortButton({ 
  label, 
  field, 
  currentSortField, 
  currentSortOrder, 
  onSort,
  className 
}: SortButtonProps) {
  const isActive = currentSortField === field;
  
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "h-8 px-3 border transition-all duration-200",
        isActive 
          ? "bg-blue-900/50 text-blue-100 border-blue-500/50 shadow-sm shadow-blue-500/20" 
          : "bg-slate-800/70 hover:bg-slate-700 text-slate-300 border-slate-700/50",
        className
      )}
      onClick={() => onSort(field)}
    >
      <span className="mr-1">{label}</span>
      {isActive && (
        <span className="flex items-center justify-center h-4 w-4 rounded-full bg-blue-600/30">
          {currentSortOrder === 'asc' ? (
            <ChevronUp className="h-3 w-3 text-blue-300" />
          ) : (
            <ChevronDown className="h-3 w-3 text-blue-300" />
          )}
        </span>
      )}
    </Button>
  );
}
