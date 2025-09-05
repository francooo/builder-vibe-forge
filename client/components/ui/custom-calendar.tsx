import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomCalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

export function CustomCalendar({ selected, onSelect, className }: CustomCalendarProps) {
  const [currentDate, setCurrentDate] = useState(selected || new Date());
  
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Primeiro dia do mês (0=Sunday, 1=Monday, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  // Quantos dias tem o mês
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Navegar entre meses
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  // Selecionar data
  const handleDateClick = (day: number) => {
    const selectedDate = new Date(year, month, day);
    onSelect?.(selectedDate);
  };
  
  // Verificar se é a data selecionada
  const isSelected = (day: number) => {
    if (!selected) return false;
    return selected.getDate() === day && 
           selected.getMonth() === month && 
           selected.getFullYear() === year;
  };
  
  // Verificar se é hoje
  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year;
  };
  
  // Gerar células do calendário
  const generateCalendarCells = () => {
    const cells = [];
    
    // Placeholders para dias antes do primeiro dia do mês
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(
        <div key={`empty-${i}`} aria-hidden="true" className="h-9"></div>
      );
    }
    
    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={cn(
            "h-9 w-9 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-colors",
            isSelected(day) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            isToday(day) && !isSelected(day) && "bg-accent text-accent-foreground"
          )}
        >
          {day}
        </button>
      );
    }
    
    return cells;
  };
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return (
    <div className={cn("p-3", className)}>
      {/* Header com navegação */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousMonth}
          className="h-7 w-7"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="font-semibold">
          {monthNames[month]} {year}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={goToNextMonth}
          className="h-7 w-7"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Cabeçalho dos dias da semana - Grid fixo de 7 colunas */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="h-9 flex items-center justify-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Corpo do calendário - Grid fixo de 7 colunas */}
      <div className="grid grid-cols-7 gap-1">
        {generateCalendarCells()}
      </div>
    </div>
  );
}