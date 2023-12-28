"use client"
import { SearchInputComponent } from "@/components/search_page_components/searchInputComponent/SearchInputComponent";
import { Button } from "@/components/ui/button";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"

export const NavBarRoutes = () => {
    const pathname = usePathname();
    const isSearchPage = pathname.startsWith("/search")
    const isCoursePage = pathname.startsWith("/courses")

  return (
    <>
        {isSearchPage && (
            <div className="hidden md:block">
                <SearchInputComponent />
            </div>
        )}
        <div className="flex gap-2 ml-auto items-center">
            {pathname.startsWith("/teacher") || pathname.startsWith("/courses") ? (
                <Link href={"/search"}>
                    <Button variant="ghost" className="flex items-center gap-1">
                        Exit
                        <LogOut className="h-4"/>
                    </Button>
                </Link>
            ) : (
                <Link href={"/teacher/courses"}>
                    <Button>
                        Teacher mode
                    </Button>
                </Link>
            ) }
            <UserButton afterSignOutUrl="/sign-in" />
        </div>
    </>
  )
}


