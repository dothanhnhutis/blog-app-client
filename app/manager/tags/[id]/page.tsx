"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateTagInputType } from "@/constants/schema";
import { useMutation } from "@tanstack/react-query";
import React from "react";

const TagDetail = () => {
  const [form, setForm] = React.useState<CreateTagInputType>({
    name: "",
    slug: "",
  });
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      return null;
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate();
  };
  console.log(mutation.data);
  return (
    <form onSubmit={handleAdd}>
      <Input
        id="name"
        name="name"
        type="text"
        value={form.name}
        onChange={handleOnchange}
      />
      <Input
        id="slug"
        name="slug"
        type="text"
        value={form.slug}
        onChange={handleOnchange}
      />
      <Button>Add</Button>
    </form>
  );
};

export default TagDetail;
