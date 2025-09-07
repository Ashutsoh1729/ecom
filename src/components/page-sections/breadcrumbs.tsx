"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// A utility function to capitalize the first letter of a string
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Breadcrumb = () => {
  const pathname = usePathname();

  if (pathname == "/") {
    return null;
  }

  const segments = pathname.split("/").filter((segment) => segment);
  // console.log(segments);

  return (
    <nav aria-label="breadcrumb" className="px-16 py-3 bg-slate-200">
      <ol className="flex items-center space-x-2 text-sm font-bold text-gray-500 ">
        {/* Home Link */}
        <li>
          <Link href="/" className="hover:text-blue-600 hover:underline">
            Home
          </Link>
        </li>

        {/* Dynamic Segments */}
        {segments.map((segment, index) => {
          // Create the path for the current segment
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <React.Fragment key={href}>
              {/* Separator */}
              <li>
                <span className="select-none text-black">&gt;</span>
              </li>

              {/* Breadcrumb Item */}
              <li>
                {isLast ? (
                  // The last segment is the current page, so it's not a link
                  <span
                    className="font-semibold text-gray-800"
                    aria-current="page"
                  >
                    {capitalize(decodeURIComponent(segment))}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="hover:text-blue-600 hover:underline"
                  >
                    {capitalize(decodeURIComponent(segment))}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
