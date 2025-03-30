
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ChangePasswordProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChangePasswordDialog = ({ open, onOpenChange }: ChangePasswordProps) => {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);

    try {
      // Here you would make an API call to verify current password and update to new password
      // For demo purposes, we'll simulate a failed verification if currentPassword is not "admin"
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (currentPassword !== 'admin') {
        setError('رمز عبور فعلی اشتباه است');
        setIsLoading(false);
        return;
      }

      // Password change successful
      toast({
        title: "رمز عبور با موفقیت تغییر کرد",
        description: "رمز عبور شما با موفقیت به‌روزرسانی شد.",
      });
      
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
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rtl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">تغییر رمز عبور</DialogTitle>
          <DialogDescription className="text-right">
            برای تغییر رمز عبور، لطفا اطلاعات زیر را وارد کنید.
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
            <Button type="button" variant="outline" onClick={handleClose}>
              انصراف
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
