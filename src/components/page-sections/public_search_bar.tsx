"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ProductSearchResult, searchProducts } from "@/actions/(public)/search";
import Link from "next/link";
import Image from "next/image";

export function PublicSearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResult] = useState<ProductSearchResult[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResult([]);
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      const res = await searchProducts(query);
      setResult(res);
      setOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <div className="relative flex items-center w-full h-10 rounded-full border border-input bg-background focus-within:ring-1 focus-within:ring-ring transition-all duration-300">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search..."
          className="flex-1 h-full w-full border-0 focus-visible:ring-0 bg-transparent py-0 pl-9 pr-4 text-sm placeholder:text-muted-foreground/70"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {/* Dropdown */}
      {open && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border bg-background shadow-lg overflow-hidden">
          <ul>
            {results.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/products/${item.slug}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition"
                  onClick={() => {
                    setOpen(false);
                    setQuery("");
                  }}
                >
                  <Image
                    src={item.main_img}
                    alt={item.name}
                    className="h-10 w-10 rounded object-cover"
                    width={30}
                    height={30}
                  />
                  <span className="text-sm">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}{" "}
    </div>
  );
}
