"use client";

import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteProduct } from "@/lib/api/product.api";

interface DeleteProductButtonProps {
  productId: string;
}

const DeleteProductButton = ({ productId }: DeleteProductButtonProps) => {
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (result) => {
      toast.success(result.message || "Success delete product");
      router.refresh();
    },
  });

  return (
    <Button
      variant="destructive"
      size="sm"
      className="flex-1"
      disabled={deleteMutation.isPending}
      onClick={() => deleteMutation.mutate(productId)}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      {deleteMutation.isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteProductButton;
