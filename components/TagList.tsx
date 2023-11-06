"use client";
import { useQuery } from "@tanstack/react-query";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { http } from "@/lib/http";

const TagList = ({
  tags,
}: {
  tags: { id: string; name: string; slug: string; post: number }[];
}) => {
  const { data } = useQuery({
    initialData: tags,
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await http.get<{
        tags: {
          id: string;
          name: string;
          slug: string;
          _count: { post: number };
        }[];
      }>("/tags");

      return data.tags.map((t) => {
        return {
          id: t.id,
          name: t.name,
          slug: t.slug,
          post: t._count.post,
        };
      });
    },
  });
  const pathName = usePathname();
  return (
    <Command className="border-r rounded-none max-w-[220px]">
      <CommandInput placeholder="Search tag..." />
      <CommandList className="max-h-none">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup className="border-none">
          {data ? (
            data.map((tag) => (
              <CommandItem key={tag.id} className="p-0">
                <CheckIcon
                  className={cn(
                    "h-4 w-4",
                    pathName.split("/")[3] === tag.id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                <Link
                  href={`/manager/tags/${tag.id}`}
                  className="flex flex-col w-full p-2"
                >
                  <p className="font-medium">{tag.name}</p>
                  <p className="text-xs ">{tag.slug}</p>
                </Link>
              </CommandItem>
            ))
          ) : (
            <div className="flex flex-col gap-1">
              <Skeleton className="w-full h-[52px]" />
              <Skeleton className="w-full h-[52px]" />
              <Skeleton className="w-full h-[52px]" />
              <Skeleton className="w-full h-[52px]" />
              <Skeleton className="w-full h-[52px]" />
              <Skeleton className="w-full h-[52px]" />
              <Skeleton className="w-full h-[52px]" />
              <Skeleton className="w-full h-[52px]" />
              <Skeleton className="w-full h-[52px]" />
              <Skeleton className="w-full h-[52px]" />
              <Skeleton className="w-full h-[52px]" />
              <Skeleton className="w-full h-[52px]" />
            </div>
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default TagList;
