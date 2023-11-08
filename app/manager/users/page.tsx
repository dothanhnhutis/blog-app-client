import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  CheckIcon,
  ChevronLeftIcon,
  LockIcon,
  PencilIcon,
  PlusIcon,
  SaveIcon,
  SearchIcon,
  TrashIcon,
  UnlockIcon,
} from "lucide-react";
import React from "react";
import AvatarDefault from "@/images/user-1.jpg";

const UserPage = () => {
  return (
    <div className="flex border rounded-md h-full overflow-hidden">
      <div className="border-r w-[220px]">
        <div className="flex items-center border-b p-2">
          <SearchIcon className="w-4 h-4 opacity-50" />
          <Input
            placeholder="Search name..."
            type="text"
            className="border-none focus-visible:ring-transparent ring-inset"
          />
        </div>
        <div className=" flex flex-col gap-1 p-1 h-full overflow-y-scroll">
          <p className="w-full text-center text-sm p-2">No result found</p>
          <div
            className={cn(
              "flex items-center gap-1 p-2 rounded-md",
              true ? "bg-accent" : "hover:bg-accent"
            )}
          >
            <CheckIcon
              className={cn(
                "h-4 w-4 flex flex-shrink-0",
                true ? "opacity-100" : "opacity-0"
              )}
            />
            <div className="overflow-hidden">
              <p className="font-medium truncate">Thanh Nhut</p>
              <p className="text-xs truncate">gaconght@gmail.com</p>
            </div>
          </div>

          <div
            className={cn(
              "flex items-center gap-1 p-2 rounded-md",
              false ? "bg-accent" : "hover:bg-accent"
            )}
          >
            <CheckIcon
              className={cn(
                "h-4 w-4 flex flex-shrink-0",
                false ? "opacity-100" : "opacity-0"
              )}
            />
            <div className="overflow-hidden mr-auto">
              <p className="font-medium truncate">Thanh Nhut</p>
              <p className="text-xs truncate">gaconght@gmail.com</p>
            </div>
            <LockIcon
              className={cn(
                "h-4 w-4 flex flex-shrink-0",
                true ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex items-center p-2 border-b min-h-[57px]">
          <Button
            variant="ghost"
            className={cn("h-8 w-8 p-0 mr-2", true ? "" : "hidden")}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>
          <h3 className="text-lg">User Detail</h3>
          <div className="flex gap-1 ml-auto">
            <Button
              disabled={false}
              variant="ghost"
              className={cn("rounded-full w-10 h-10 p-2", true ? "" : "hidden")}
            >
              {true ? (
                <SaveIcon className="w-4 h-4" />
              ) : (
                <PencilIcon className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              className={cn("rounded-full w-10 h-10 p-2", true ? "" : "hidden")}
            >
              <TrashIcon className="w-4 h-4" />
            </Button>

            <AlertDialog open={false}>
              <Button variant="ghost" className="rounded-full w-10 h-10 p-2">
                <PlusIcon className="w-4 h-4" />
              </Button>
              <AlertDialogContent>
                <form>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Create new tag</AlertDialogTitle>
                  </AlertDialogHeader>

                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Tag name</Label>
                      <Input
                        id="name"
                        name="name"
                        className="focus-visible:ring-transparent "
                        placeholder="Tag name"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="slug">Slug</Label>
                      <div className="flex gap-2">
                        <Input
                          disabled={false}
                          id="slug"
                          name="slug"
                          className={cn(
                            "focus-visible:ring-transparent",
                            true ? "border-red-400" : ""
                          )}
                          placeholder="Slug"
                        />
                        <Button type="button" variant="secondary">
                          {true ? (
                            <UnlockIcon className="w-4 h-4" />
                          ) : (
                            <LockIcon className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <AlertDialogFooter className="mt-4">
                    <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                    <AlertDialogAction type="submit" disabled={false}>
                      Create
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </form>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="flex items-center gap-4 col-span-2">
            <Avatar className="w-24 h-24">
              <AvatarImage src={AvatarDefault.src} />
              <AvatarFallback className="bg-transparent">
                <Skeleton className="w-24 h-24 rounded-full" />
              </AvatarFallback>
            </Avatar>
            <div className="w-full overflow-hidden">
              <p className="font-semibold tracking-tight text-2xl">
                Thanh nhut
              </p>
              <p className="text-sm text-muted-foreground">ADMIN</p>
            </div>
          </div>
          <p className="col-span-2 lg:col-span-1">email</p>
          <p className="col-span-2 lg:col-span-1">phone</p>

          <p className="col-span-2">address</p>
          <p className="col-span-2">bio</p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
