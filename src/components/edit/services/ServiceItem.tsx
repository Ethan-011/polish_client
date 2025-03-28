
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Service } from './types';

interface ServiceItemProps {
  service: Service;
  index: number;
  totalCount: number;
  onChange: (index: number, field: string, value: string) => void;
  onDelete: (index: number) => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
}

const ServiceItem = ({ 
  service, 
  index, 
  totalCount,
  onChange, 
  onDelete, 
  onMove 
}: ServiceItemProps) => {
  return (
    <AccordionItem value={`service-${index}`} className="border-b">
      <AccordionTrigger className="flex flex-row-reverse justify-between py-4">
        <span className="text-right">{service.title}</span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 pt-2">
          <div className="text-right">
            <label htmlFor={`service-title-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
              عنوان خدمت
            </label>
            <Input 
              id={`service-title-${index}`}
              value={service.title} 
              onChange={(e) => onChange(index, 'title', e.target.value)}
              className="text-right mt-1" 
            />
          </div>
          
          <div className="text-right">
            <label htmlFor={`service-description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
              توضیحات
            </label>
            <Textarea 
              id={`service-description-${index}`}
              value={service.description} 
              onChange={(e) => onChange(index, 'description', e.target.value)}
              className="text-right mt-1" 
            />
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => onMove(index, 'up')}
                disabled={index === 0}
              >
                ↑
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => onMove(index, 'down')}
                disabled={index === totalCount - 1}
              >
                ↓
              </Button>
            </div>
            
            <Button 
              type="button" 
              variant="destructive" 
              size="sm"
              onClick={() => onDelete(index)}
            >
              <Trash2 className="ml-2 h-4 w-4" />
              حذف خدمت
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ServiceItem;
