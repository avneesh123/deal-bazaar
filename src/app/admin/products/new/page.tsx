"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <>
      <AdminHeader title="New Product" subtitle="Add a new product to inventory" />
      <div className="p-8">
        <ProductForm />
      </div>
    </>
  );
}
