"use client";

import { Search, X } from "lucide-react";

interface ProductSearchBoxProps {
  onSearch: (value: string) => void;
  value: string;
  placeholder?: string;
}

export default function ProductSearchBox({
  onSearch,
  value,
  placeholder = "Search products...",
}: ProductSearchBoxProps) {
  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </span>
      <input
        type="text"
        className="input-field pr-10 h-12 w-full focus:ring-2 focus:ring-purple-400"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Search products"
        style={{ boxSizing: "border-box", paddingLeft: 40 }}
      />
      {value && (
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-400 focus:outline-none"
          aria-label="Clear search"
          onClick={() => onSearch("")}
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
