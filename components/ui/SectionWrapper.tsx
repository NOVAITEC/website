import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-24 md:py-32 overflow-hidden',
        className
      )}
    >
      <div className="container mx-auto px-6">
        {children}
      </div>
    </section>
  );
}
