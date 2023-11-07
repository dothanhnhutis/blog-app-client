"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreateTagInputType } from "@/constants/schema";
import { http } from "@/lib/http";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LockIcon, UnlockIcon } from "lucide-react";
import React from "react";

const TagDetail = ({ params }: { params: { id: string } }) => {
  const [editable, setEditable] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [errorSlug, setErrorSlug] = React.useState(false);
  const tagQuery = useQuery({
    queryKey: ["tags", params.id],
    queryFn: async () => {
      const { data } = await http.get<{
        id: string;
        name: string;
        slug: string;
        _count: {
          post: number;
        };
      }>("/tags/" + params.id);
      return data;
    },
  });
  const [form, setForm] = React.useState<CreateTagInputType>({
    name: tagQuery.data?.name ?? "",
    slug: tagQuery.data?.slug ?? "",
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
  return (
    <>
      {isEdit ? (
        <>
          <div className="p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Tag name</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleOnchange}
                  className="focus-visible:ring-transparent "
                  placeholder="Tag name"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="slug">Slug</Label>
                <div className="flex gap-2">
                  <Input
                    disabled={!editable}
                    id="slug"
                    name="slug"
                    value={form.slug}
                    onChange={handleOnchange}
                    className={cn(
                      "focus-visible:ring-transparent",
                      errorSlug ? "border-red-400" : ""
                    )}
                    placeholder="Slug"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setEditable(!editable)}
                  >
                    {editable ? (
                      <UnlockIcon className="w-4 h-4" />
                    ) : (
                      <LockIcon className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-end gap-2 px-4">
            <Button variant="outline">cancel</Button>
            <Button variant="default">Save</Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4 p-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">ID:</p>
              <p className="text-muted-foreground">{tagQuery.data?.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">NAME:</p>
              <p className="text-muted-foreground">{tagQuery.data?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">SLUG</p>
              <p className="text-muted-foreground">{tagQuery.data?.slug}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">POST</p>
              <p className="text-muted-foreground">
                {tagQuery.data?._count.post}
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-end gap-2 px-4">
            <Button variant="default" onClick={() => setIsEdit(true)}>
              Edit
            </Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </>
      )}
    </>
  );
};

export default TagDetail;
