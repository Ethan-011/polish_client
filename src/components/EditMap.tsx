
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Save, MapPin } from "lucide-react";
import Map from '@/components/Map';

const EditMap = () => {
  const { toast } = useToast();
  
  // Map form
  const mapForm = useForm({
    defaultValues: {
      locationName: "میدان آزادی",
      latitude: 35.699450,
      longitude: 51.335952,
    }
  });

  const onSaveMapLocation = (data: any) => {
    console.log("Map location data saved:", data);
    toast({
      title: "ذخیره شد",
      description: "اطلاعات موقعیت مکانی با موفقیت ذخیره شد",
    });
  };

  return (
    <Card className="rtl">
      <CardHeader>
        <CardTitle className="text-right">موقعیت مکانی</CardTitle>
        <CardDescription className="text-right">اطلاعات موقعیت مکانی روی نقشه را ویرایش کنید</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...mapForm}>
          <form onSubmit={mapForm.handleSubmit(onSaveMapLocation)} className="space-y-4">
            <FormField
              control={mapForm.control}
              name="locationName"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>نام موقعیت</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-right" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={mapForm.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem className="text-right">
                    <FormLabel>عرض جغرافیایی</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" step="0.000001" className="text-right" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={mapForm.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem className="text-right">
                    <FormLabel>طول جغرافیایی</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" step="0.000001" className="text-right" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <p className="text-right text-sm text-muted-foreground mb-2">پیش‌نمایش نقشه:</p>
              <div className="w-full flex justify-center items-center">
                <Map 
                  location={{
                    latitude: mapForm.watch('latitude'),
                    longitude: mapForm.watch('longitude'),
                    name: mapForm.watch('locationName')
                  }}
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button type="submit">
                <Save className="ml-2 h-4 w-4" />
                ذخیره تغییرات
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditMap;
