
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { NavigateFunction, useNavigate } from "react-router-dom";


interface ChangePasswordProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isFirstLogin?: boolean;
}

const ChangePasswordDialog = ({ open, onOpenChange, isFirstLogin = false }: ChangePasswordProps) => {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const{change_one_time_pass,change_pass} = useAuth();
  const navigate: NavigateFunction = useNavigate();
  const[isNavigating,setIsNavigating] = useState(false);

  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 2000); // Matches CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isNavigating, navigate]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('لطفا تمام فیلدها را پر کنید');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('رمز عبور جدید و تکرار آن مطابقت ندارند');
      return;
    }

    if (newPassword.length < 6) {
      setError('رمز عبور جدید باید حداقل 6 کاراکتر باشد');
      return;
    }

    if (currentPassword == newPassword) {
      setError('رمز عبور فعلی و جدید یکسان است. لطفا رمز عبور دیگری انتخاب کنید');
      return;
    }

    setIsLoading(true);

    var err:string = ""

    

    try {

      if(isFirstLogin){

        console.log("inside change_one_time_pass")

      err = await change_one_time_pass(localStorage.getItem('email_login_profile'),localStorage.getItem('pass_login_profile'),newPassword)

      console.log("error:" + err)
      }
      else{

      err =   await change_pass(localStorage.getItem('email_login_profile'),localStorage.getItem('pass_login_profile'),newPassword)

      console.log("error:" + err)

      }
      
      if(err.toLowerCase() == "one time password changed successfully" || (err.toLowerCase() == "password changed successfully")){

            // Password change successful
          toast({
            title: "رمز عبور با موفقیت تغییر کرد",
            description: "رمز عبور شما با موفقیت به‌روزرسانی شد.",
          });

          localStorage.setItem('pass_login_profile',newPassword)
 
      }

    

      else if(err.toLowerCase() == "invalid token"){

        toast(
          {
            title: "خطا",
            description:"نشست شما منقضی شده است، به صفحه ورود هدایت می شوید"

          });

          
            setIsNavigating(true);



      }



      else{

        setError(err);
        return;
        
      }

      

           // Reset form and close dialog
      resetForm();
      onOpenChange(false);
              
    } catch (error) {
      setError('خطا در تغییر رمز عبور. لطفا دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }

    
  };

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleClose = () => {
    // If it's the first login, don't allow closing without changing password
    if (isFirstLogin) {
      toast({
        title: "تغییر رمز عبور الزامی است",
        description: "لطفا برای ادامه، رمز عبور خود را تغییر دهید.",
        variant: "destructive",
      });
      return;
    }
    
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rtl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">
            {isFirstLogin ? 'تغییر رمز عبور اولیه' : 'تغییر رمز عبور'}
          </DialogTitle>
          <DialogDescription className="text-right">
            {isFirstLogin 
              ? 'برای ادامه استفاده از پنل مدیریت، لطفا رمز عبور خود را تغییر دهید.' 
              : 'برای تغییر رمز عبور، لطفا اطلاعات زیر را وارد کنید.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {error && (
              <div className="text-destructive text-sm text-right">{error}</div>
            )}
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current-password" className="text-right col-span-4">
                رمز عبور فعلی
              </Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="col-span-4"
                placeholder="رمز عبور فعلی خود را وارد کنید"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-password" className="text-right col-span-4">
                رمز عبور جدید
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="col-span-4"
                placeholder="رمز عبور جدید را وارد کنید"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirm-password" className="text-right col-span-4">
                تکرار رمز عبور جدید
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="col-span-4"
                placeholder="رمز عبور جدید را مجددا وارد کنید"
              />
            </div>
          </div>
          
          <DialogFooter className="sm:justify-start flex-row-reverse">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'در حال پردازش...' : 'تغییر رمز عبور'}
            </Button>
            {!isFirstLogin && (
              <Button type="button" variant="outline" onClick={handleClose}>
                انصراف
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
