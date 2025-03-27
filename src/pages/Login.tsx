
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn, Mail, Key } from "lucide-react";
import Logo from '@/components/Logo';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  
  // Login form
  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // Reset password form
  const resetPasswordForm = useForm({
    defaultValues: {
      email: ""
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

  const handleResetPassword = (data: any) => {
    // This is a mock reset password functionality
    console.log("Reset password for:", data.email);
    toast({
      title: "لینک بازیابی ارسال شد",
      description: "اگر ایمیل شما در سیستم موجود باشد، لینک بازیابی رمز عبور برای شما ارسال خواهد شد.",
    });
    setIsResetDialogOpen(false);
    resetPasswordForm.reset();
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
                
                <div className="text-left">
                  <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="link" className="p-0 h-auto text-sm text-accent hover:text-accent/80">
                        رمز عبور را فراموش کرده‌اید؟
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]" dir="rtl">
                      <DialogHeader>
                        <DialogTitle className="text-right">بازیابی رمز عبور</DialogTitle>
                        <DialogDescription className="text-right">
                          ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برای شما ارسال شود.
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...resetPasswordForm}>
                        <form onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)} className="space-y-4">
                          <FormField
                            control={resetPasswordForm.control}
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
                          <DialogFooter className="gap-2 sm:gap-0 pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsResetDialogOpen(false)}>
                              انصراف
                            </Button>
                            <Button type="submit" className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              ارسال لینک بازیابی
                            </Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
                
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
