"use client";

import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductFormInput,
  ProductFormOutput,
  productFormSchema,
} from "@/lib/validators/product.schema";
import { useMutation } from "@tanstack/react-query";
import { IProduct } from "@/types/product.type";
import { createProduct, updateProduct } from "@/lib/api/product.api";

interface ProductFormProps {
  product?: IProduct;
}

const ProductForm = ({ product }: ProductFormProps) => {
  const router = useRouter();

  const isEditMode = Boolean(product);

  const form = useForm<ProductFormInput, unknown, ProductFormOutput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price?.toString() ?? "",
      stock: product?.stock?.toString() ?? "",
      category: product?.category ?? "",
      status: product?.status ?? "active",
    },
  });

  // Product Create Mutation
  const productMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      router.push("/admin/products");
      router.refresh();
    },
  });

  // Product Update Mutation
  const updateMutation = useMutation({
    mutationFn: (values: ProductFormOutput) => {
      if (!product?._id) {
        throw new Error("Product ID is missing");
      }

      return updateProduct(product._id, values);
    },
    onSuccess: async () => {
      router.push("/admin/products");
      router.refresh();
    },
  });

  function onSubmit(data: ProductFormOutput) {
    if (!isEditMode) {
      productMutation.mutate(data);
    } else {
      updateMutation.mutate(data);
    }
  }

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Product Information</CardTitle>
        <CardDescription>
          Fill in the basic details for your product.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="form-product" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-product-name">Name</FieldLabel>

                  <Input
                    {...field}
                    id="form-product-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-product-description">
                    Description
                  </FieldLabel>

                  <Textarea
                    {...field}
                    id="form-product-description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Type your message here."
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-product-price">Price</FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id="form-product-price"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter price"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="stock"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-product-stock">Stock</FieldLabel>
                  <Input
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    value={field.value === undefined ? "" : String(field.value)}
                    onChange={field.onChange}
                    type="number"
                    id="form-product-stock"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter stock"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-product-category">
                    Category
                  </FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="form-product-category"
                      className="w-full"
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="gadgets">Gadgets</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="status"
              control={form.control}
              render={({ field }) => (
                <Field
                  orientation="horizontal"
                  className="w-full justify-between"
                >
                  <div className="space-y-1">
                    <FieldLabel>Status</FieldLabel>
                    <FieldDescription>
                      Make this product visible to customers.
                    </FieldDescription>
                  </div>

                  <Switch
                    checked={field.value === "active"}
                    onCheckedChange={(checked) =>
                      field.onChange(checked ? "active" : "inactive")
                    }
                  />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex-col items-start">
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button
            disabled={productMutation.isPending}
            type="submit"
            form="form-product"
          >
            {productMutation.isPending ? "Loading..." : "Submit"}
          </Button>
        </Field>

        {productMutation.isError && (
          <div className="mt-8 rounded-lg border border-red-200 bg-red-50 px-5 py-2.5 text-base text-red-600">
            {productMutation.error.message}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductForm;
