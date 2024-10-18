import Link from "next/link";
import { Icons } from "./Icons";
import { ToggleMode } from "./ToggleMode";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Brush, ListCollapse } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-screen-2xl h-14 flex items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="flex items-center space-x-2 lg:mr-6" href="/">
            <Icons.logo />
          </Link>
          <NavigationMenu className="md:flex items-center gap-4 text-sm lg:gap-6 hidden">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  href={"/teambition"}
                  className="flex items-center transition-colors hover:text-foreground/80 text-foreground/60 px-6 py-2"
                >
                  <Brush size={20} className="mr-2" />
                  Teambition
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Button variant="ghost" className="md:hidden px-0 py-2 mr-2">
          <ListCollapse />
        </Button>
        <div className="flex flex-1 items-center justify-end">
          <ToggleMode />
        </div>
      </div>
    </header>
  );
}
