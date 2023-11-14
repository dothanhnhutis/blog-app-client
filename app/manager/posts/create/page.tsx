import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Check, ImagePlusIcon, LockIcon, UnlockIcon } from "lucide-react";
import React from "react";

const PostCreatePage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create post</CardTitle>
        <CardDescription>Create new post now</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid sm:grid-cols-2 w-full gap-4">
            <Label
              htmlFor="thumnail"
              className="h-[200px] sm:h-auto text-muted-foreground border-2 border-dashed w-full rounded-lg flex items-center justify-center cursor-pointer"
            >
              <div>
                <ImagePlusIcon className="w-14 h-14" />
                <p>Thumnail</p>
              </div>

              <input
                type="file"
                name="thumnail"
                id="thumnail"
                className="hidden"
              />
            </Label>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  //   value={data.name}
                  //   onChange={handleOnchange}
                  className="focus-visible:ring-transparent "
                  placeholder="Name of your project"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="slug">Slug</Label>
                <div className="flex gap-2">
                  <Input
                    // disabled={!editable}
                    id="slug"
                    name="slug"
                    // value={data.slug}
                    // onChange={handleOnchange}
                    className="focus-visible:ring-transparent "
                    placeholder="Name of your project"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    // onClick={() => setEditable(!editable)}
                  >
                    {false ? (
                      <UnlockIcon className="w-4 h-4" />
                    ) : (
                      <LockIcon className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tag">Tag</Label>

                <Select
                // onValueChange={(v) =>
                //   setForm((prev) => ({ ...prev, isActive: v === "true" }))
                // }
                // defaultValue={form.isActive ? "true" : "false"}
                >
                  <SelectTrigger className="focus-visible:ring-transparent">
                    <SelectValue placeholder="Select a active to display" />
                  </SelectTrigger>
                  <SelectContent id="tag">
                    <SelectItem value="true">Enable</SelectItem>
                    <SelectItem value="false">Disable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Author</Label>
                <Select
                // onValueChange={(v) =>
                //   setForm((prev) => ({ ...prev, isActive: v === "true" }))
                // }
                // defaultValue={form.isActive ? "true" : "false"}
                >
                  <SelectTrigger className="focus-visible:ring-transparent">
                    <SelectValue placeholder="Select a active to display" />
                  </SelectTrigger>
                  <SelectContent id="tag">
                    <SelectItem value="true">
                      <Avatar>
                        <AvatarImage
                          sizes=""
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <Skeleton className="h-12 w-12 rounded-full" />
                      </Avatar>
                      <div className="w-full overflow-hidden">
                        <p className="truncate">Thanh Nhut</p>
                        <p className="text-sm text-muted-foreground truncate">
                          dothanhnhis@gmail.com
                        </p>
                      </div>
                      <Check
                        className={cn(
                          "flex flex-shrink-0 h-4 w-4",
                          true ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </SelectItem>
                    <SelectItem value="false">Disable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-1.5 mt-4">
            <Label htmlFor="">Content</Label>
            {/* <Tiptap editor={editor} /> */}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
};

export default PostCreatePage;
