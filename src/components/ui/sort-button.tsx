import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { SortField, SortOrder } from "@/stores/patient-store";

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
  onSort,
}: SortButtonProps) {
  const isActive = field === currentSortField;
  
  // Determine which icon to show
  const getSortIcon = () => {
    if (!isActive) return <ArrowUpDown className="h-3 w-3 ml-1" />;
    return currentSortOrder === 'asc' 
      ? <ArrowUp className="h-3 w-3 ml-1" /> 
      : <ArrowDown className="h-3 w-3 ml-1" />;
  };

  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      size="sm"
      className="h-7 gap-1 px-2"
      onClick={() => onSort(field)}
    >
      {label}
      {getSortIcon()}
    </Button>
  );
}
