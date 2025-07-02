import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChangePasswordFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function ChangePasswordForm({ onCancel, onSuccess }: ChangePasswordFormProps) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword) newErrors.currentPassword = "Current password is required.";
    if (newPassword.length < 8) newErrors.newPassword = "New password must be at least 8 characters.";
    if (!/[A-Z]/.test(newPassword)) newErrors.newPassword = "Must include an uppercase letter.";
    if (!/[a-z]/.test(newPassword)) newErrors.newPassword = "Must include a lowercase letter.";
    if (!/\d/.test(newPassword)) newErrors.newPassword = "Must include a number.";
    if (!/[^a-zA-Z0-9]/.test(newPassword)) newErrors.newPassword = "Must include a special character.";
    if (confirmPassword !== newPassword) newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setErrors({});
      onSuccess();
    }, 1500); // Fake API delay
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Change Your Password</h3>

      {["currentPassword", "newPassword", "confirmPassword"].map((fieldKey) => {
        const fieldLabel = fieldKey === "currentPassword"
          ? "Current Password"
          : fieldKey === "newPassword"
          ? "New Password"
          : "Confirm New Password";

        const show = showPassword[fieldKey as keyof typeof showPassword];
        return (
          <div key={fieldKey}>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">{fieldLabel}</label>
            <div className="relative">
              <Input
                type={show ? "text" : "password"}
                value={formData[fieldKey as keyof typeof formData]}
                onChange={(e) =>
                  setFormData({ ...formData, [fieldKey]: e.target.value })
                }
                placeholder={fieldLabel}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => toggleVisibility(fieldKey as keyof typeof showPassword)}
              >
                {show ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
              </Button>
            </div>
            {errors[fieldKey] && (
              <p className="mt-1 text-sm text-red-500">{errors[fieldKey]}</p>
            )}
          </div>
        );
      })}

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}
