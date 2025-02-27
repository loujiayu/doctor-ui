import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { SortField, SortOrder } from '@/stores/patient-store';

interface SortButtonProps {
  label: string;
  field: SortField;
  currentSortField: SortField;
  currentSortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

export function SortButton({
  label,
  field,
  currentSortField,
  currentSortOrder,
  onSort
}: SortButtonProps) {
  const isActive = currentSortField === field;
  
  return (
    <Button
      variant={isActive ? "secondary" : "outline"}
      size="sm"
      onClick={() => onSort(field)}
      className="flex items-center gap-1"
    >
      {label}
      {isActive && (
        currentSortOrder === 'asc' 
          ? <ArrowUp className="h-3 w-3" /> 
          : <ArrowDown className="h-3 w-3" />
      )}
    </Button>
  );
}
