
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormLabel } from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ServiceItem from './ServiceItem';
import { Service } from './types';

interface ServicesListProps {
  services: Service[];
  onServiceChange: (index: number, field: string, value: string) => void;
  onDeleteService: (index: number) => void;
  onMoveService: (index: number, direction: 'up' | 'down') => void;
  onAddService: () => void;
}

const ServicesList = ({ 
  services, 
  onServiceChange, 
  onDeleteService, 
  onMoveService, 
  onAddService 
}: ServicesListProps) => {
  return (
    <div className="border rounded-lg p-4 mt-6">
      <h3 className="text-lg font-medium mb-4 text-right">لیست خدمات</h3>
      
      <Accordion type="multiple" className="w-full">
        {services.map((service, index) => (
          <ServiceItem 
            key={index}
            service={service}
            index={index}
            totalCount={services.length}
            onChange={onServiceChange}
            onDelete={onDeleteService}
            onMove={onMoveService}
          />
        ))}
      </Accordion>
      
      <Button 
        type="button" 
        variant="outline" 
        className="w-full mt-4"
        onClick={onAddService}
      >
        <Plus className="ml-2 h-4 w-4" />
        افزودن خدمت جدید
      </Button>
    </div>
  );
};

export default ServicesList;
