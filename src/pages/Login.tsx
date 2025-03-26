
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Logo from '@/components/Logo';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  
  // Login form
  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data: any) => {
    // This is a simple mock login - in a real app, you would validate against a backend
    if (data.email === "admin@example.com" && data.password === "admin123") {
      // Success login
      toast({
        title: "ورود موفق",
        description: "شما با موفقیت وارد شدید",
      });
      navigate('/edit');
    } else {
      // Failed login
      toast({
        title: "خطا در ورود",
        description: "ایمیل یا رمز عبور اشتباه است",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo variant="dark" size="lg" />
          <h1 className="mt-4 text-2xl font-bold">ورود به پنل مدیریت</h1>
          <p className="text-gray-600 mt-2">لطفا اطلاعات خود را وارد کنید</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-right">ورود</CardTitle>
            <CardDescription className="text-right">
              برای ویرایش وب‌سایت وارد شوید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="text-right">
                      <FormLabel>ایمیل</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email" 
                          placeholder="your@email.com" 
                          className="text-right" 
                          required 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="text-right">
                      <FormLabel>رمز عبور</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            {...field} 
                            type={showPassword ? "text" : "password"} 
                            className="text-right pr-10" 
                            required 
                          />
                          <button 
                            type="button"
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-2">
                  <Button type="submit" className="w-full">
                    <LogIn className="ml-2 h-4 w-4" />
                    ورود
                  </Button>
                </div>
                
                <div className="text-center mt-4">
                  <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                    بازگشت به صفحه اصلی
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="text-center mt-4 text-sm text-gray-500">
          <p>برای تست ورود از ایمیل: admin@example.com و رمز عبور: admin123 استفاده کنید</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
