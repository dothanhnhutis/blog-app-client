"use client";
import React from "react";
import { ChevronDownIcon, Circle, TextSelect } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Label } from "./ui/label";

const SideBar = () => {
  return (
    <div className="p-2">
      <div className="flex flex-col border-b lg:border-none">
        <Label className="hidden lg:block mb-2">Manager</Label>
        <div className="flex-shrink-0 flex flex-col gap-1">
          <Accordion type="multiple" className="lg:w-[220px]">
            <AccordionItem value="item-1" className="border-none py-0 pb-1">
              <AccordionTrigger className="py-0 hover:bg-muted rounded-md pr-1 hover:no-underline">
                <div className="flex justify-start gap-3 py-2 px-3 w-full">
                  <TextSelect className="flex flex-shrink-0 w-6 h-6" />
                  <p className="hidden text-sm lg:block truncate">Tag</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="hidden lg:flex lg:flex-col lg:gap-1 mt-1">
                  <Button
                    variant="secondary"
                    className="flex gap-3 px-3 w-full"
                  >
                    <Circle className="flex flex-shrink-0 w-6 h-6 p-2" />
                    <p className="hidden lg:block truncate">
                      asdasdsadasdsadsadsadsadsadsadasdsad
                    </p>
                  </Button>
                  <Button variant="ghost" className="flex gap-3 px-3 w-full">
                    <Circle className="flex flex-shrink-0 w-6 h-6 p-2" />
                    <p className="hidden lg:block truncate">
                      asdasdsadasdsadsadsadsadsadsadasdsad
                    </p>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-none py-0 pb-1">
              <AccordionTrigger className="py-0 hover:bg-muted rounded-md pr-1 hover:no-underline">
                <div className="flex justify-start gap-3 py-2 px-3 w-full">
                  <TextSelect className="flex flex-shrink-0 w-6 h-6" />
                  <p className="hidden text-sm lg:block truncate">Tag</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="hidden lg:flex lg:flex-col lg:gap-1 mt-1">
                  <Button
                    variant="secondary"
                    className="flex gap-3 px-3 w-full"
                  >
                    <Circle className="flex flex-shrink-0 w-6 h-6 p-2" />
                    <p className="hidden lg:block truncate">
                      asdasdsadasdsadsadsadsadsadsadasdsad
                    </p>
                  </Button>
                  <Button variant="ghost" className="flex gap-3 px-3 w-full">
                    <Circle className="flex flex-shrink-0 w-6 h-6 p-2" />
                    <p className="hidden lg:block truncate">
                      asdasdsadasdsadsadsadsadsadsadasdsad
                    </p>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            <TooltipProvider
              delayDuration={300}
              skipDelayDuration={0}
              disableHoverableContent
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex justify-start gap-3 px-3 w-full"
                  >
                    <TextSelect className="flex flex-shrink-0 w-6 h-6" />
                    <p className="hidden lg:block truncate">Tag</p>
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  align="center"
                  asChild
                  className="lg:hidden"
                >
                  <p className="text-xs">Tag</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Accordion>
        </div>
      </div>

      <div className="flex flex-col border-b last:border-none lg:border-none">
        <Label className="hidden lg:block mb-2">User</Label>
        <TooltipProvider
          delayDuration={300}
          skipDelayDuration={0}
          disableHoverableContent
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="flex justify-start gap-3 px-3 w-full"
              >
                <TextSelect className="flex flex-shrink-0 w-6 h-6" />
                <p className="hidden lg:block truncate">Tag</p>
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              align="center"
              asChild
              className="lg:hidden"
            >
              <p className="text-xs">Tag</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SideBar;
