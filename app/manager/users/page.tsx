"use client";
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
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/lib/http";
import { EditUserInput, UserRes } from "@/common.type";

const UserPage = () => {
  const [searchKey, setSearchKey] = React.useState<string>("");
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
  const [userSelected, setUserSelected] = React.useState<UserRes | undefined>();

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await http.get<UserRes[]>("/users");
      return data;
    },
  });

  const [form, setForm] = React.useState<EditUserInput>({
    email: "",
    isActive: true,
    roleId: "",
    username: "",
    bio: "",
    phone: "",
    avatarUrl: "",
    address: "",
  });

  React.useEffect(() => {
    if (userSelected) {
      setForm({
        email: userSelected.email,
        isActive: userSelected.isActive,
        address: userSelected.address,
        avatarUrl: userSelected.avatarUrl,
        bio: userSelected.bio,
        phone: userSelected.phone,
        roleId: userSelected.role.id,
        username: userSelected.username,
      });
      setIsEditMode(false);
    }
  }, [userSelected]);

  const handleToggleEditMode = () => {
    if (!isEditMode) {
      // setForm({
      //   userSelected,
      // });
      setIsEditMode(true);
    } else {
      // if (userSelected!.name === form.name && tagSelected?.slug === form.slug) {
      //   setIsEditMode(false);
      // } else {
      //   tagUpdateMutation.mutate({ id: tagSelected!.id, data: form });
      // }
    }
  };

  return (
    <div className="flex border rounded-md h-full overflow-hidden">
      <div className="border-r w-[220px]">
        <div className="flex items-center border-b p-2">
          <SearchIcon className="w-4 h-4 opacity-50" />
          <Input
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Search name..."
            type="text"
            className="border-none focus-visible:ring-transparent ring-inset"
          />
        </div>

        <div className=" flex flex-col gap-1 p-1 h-full overflow-y-scroll">
          {!users ||
          users.length == 0 ||
          users.filter((u) =>
            searchKey.length === 0
              ? true
              : u.username.toLowerCase().includes(searchKey.toLowerCase())
          ).length === 0 ? (
            <p className="w-full text-center text-sm p-2">No result found</p>
          ) : (
            users
              .filter((u) =>
                searchKey.length === 0
                  ? true
                  : u.username.toLowerCase().includes(searchKey.toLowerCase())
              )
              .map((user) => (
                <div
                  onClick={() =>
                    setUserSelected((prev) =>
                      prev?.email === user.email ? undefined : user
                    )
                  }
                  className={cn(
                    "flex items-center gap-1 p-2 rounded-md cursor-pointer",
                    userSelected?.email === user.email
                      ? "bg-accent"
                      : "hover:bg-accent"
                  )}
                >
                  <CheckIcon
                    className={cn(
                      "h-4 w-4 flex flex-shrink-0",
                      userSelected?.email === user.email
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <div className="overflow-hidden mr-auto">
                    <p className="font-medium truncate">{user.username}</p>
                    <p className="text-xs truncate">{user.email}</p>
                  </div>
                  <LockIcon
                    className={cn(
                      "h-4 w-4 flex flex-shrink-0",
                      !user.isActive ? "opacity-100" : "opacity-0"
                    )}
                  />
                </div>
              ))
          )}
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex items-center p-2 border-b min-h-[57px]">
          <Button
            variant="ghost"
            className={cn("h-8 w-8 p-0 mr-2", false ? "" : "hidden")}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>
          <h3 className="text-lg ">User Detail</h3>
          <div className="flex gap-1 ml-auto">
            <Button
              onClick={handleToggleEditMode}
              disabled={false}
              variant="ghost"
              className={cn(
                "rounded-full w-10 h-10 p-2",
                userSelected ? "" : "hidden"
              )}
            >
              {true ? (
                <SaveIcon className="w-4 h-4" />
              ) : (
                <PencilIcon className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "rounded-full w-10 h-10 p-2",
                userSelected ? "" : "hidden"
              )}
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
        {!userSelected ? (
          <div className="p-2 text-center">No selected</div>
        ) : isEditMode ? (
          <div className="grid grid-cols-2 gap-4 p-4 overflow-y-scroll">
            <div className="col-span-2 flex flex-col items-center justify-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={userSelected.avatarUrl ?? AvatarDefault.src}
                />
                <AvatarFallback className="bg-transparent">
                  <Skeleton className="w-24 h-24 rounded-full" />
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-4">
                <Button type="button" variant="outline">
                  Reset
                </Button>
                <Button type="button">Edit</Button>
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Label className="leading-snug text-muted-foreground">Name</Label>
              <Input
                value={userSelected.username ?? ""}
                type="text"
                className="focus-visible:ring-transparent"
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Label className="leading-snug text-muted-foreground">
                Active
              </Label>
              <Input
                value={userSelected.isActive ? "enable" : "disable"}
                type="text"
                className="focus-visible:ring-transparent"
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Label className="leading-snug text-muted-foreground">
                Phone
              </Label>
              <Input
                value={userSelected.phone ?? ""}
                type="text"
                className="focus-visible:ring-transparent"
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Label className="leading-snug text-muted-foreground">Role</Label>
              <Input type="text" className="focus-visible:ring-transparent" />
            </div>
            <div className="col-span-2 ">
              <Label className="leading-snug text-muted-foreground">
                Address
              </Label>
              <Input
                value={userSelected.address ?? ""}
                type="text"
                className="focus-visible:ring-transparent"
              />
            </div>
            <div className="col-span-2">
              <Label className="leading-snug text-muted-foreground">Bio</Label>
              <Textarea
                maxLength={255}
                className="focus-visible:ring-transparent"
                placeholder="Tell us a little bit about yourself"
                value={userSelected.bio ?? ""}
              />
            </div>
          </div>
        ) : (
          <div className=" grid grid-cols-2 gap-4 p-4 overflow-y-scroll">
            <div className="flex items-center gap-4 col-span-2">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={userSelected.avatarUrl ?? AvatarDefault.src}
                />
                <AvatarFallback className="bg-transparent">
                  <Skeleton className="w-24 h-24 rounded-full" />
                </AvatarFallback>
              </Avatar>
              <div className="w-full overflow-hidden">
                <p className="font-semibold tracking-tight text-2xl">
                  {userSelected.username ?? "Null"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {userSelected.role.roleName ?? "Null"}
                </p>
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <p className="leading-snug text-muted-foreground">Email</p>
              <p className="font-medium">{userSelected?.email ?? "_"}</p>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <p className="leading-snug text-muted-foreground">Phone</p>
              <p className="font-medium">{userSelected.phone ?? "_"}</p>
            </div>
            <div className="col-span-2">
              <p className="leading-snug text-muted-foreground">Address</p>
              <p className="font-medium">{userSelected.address ?? "_"}</p>
            </div>
            <div className="col-span-2">
              <p className="leading-snug text-muted-foreground">Bio</p>
              <p className="font-medium">{userSelected.phone ?? "_"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
