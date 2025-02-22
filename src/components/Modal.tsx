"use client";

import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure you want to delete the data?",
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] border-4 border-orange-300 p-0">
        <section>
          <DialogHeader className="p-0">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8 rounded-full"
              onClick={onClose}
            >
              <X className="h-4 w-4 text-blue-800" />
            </Button>
          </DialogHeader>
          <DialogTitle>
            <div className="px-6 py-4 text-center mt-10">
              <p className="text-base font-normal">{message}</p>
            </div>
          </DialogTitle>
          <DialogFooter className="py-6 ">
            <div className="flex justify-center gap-4 w-full">
              <Button
                variant="default"
                className="bg-blue-800 hover:bg-blue-700 text-[#FCC346]"
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
              <Button
                variant="default"
                className="bg-blue-800 hover:bg-blue-700 text-[#FCC346]"
                onClick={onClose}
              >
                {cancelText}
              </Button>
            </div>
          </DialogFooter>
        </section>
      </DialogContent>
    </Dialog>
  );
}
