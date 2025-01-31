"use client";
import { ChangeEvent } from "react";

interface ISearchInput {
  onChange: (e: ChangeEvent) => void;
  placeholder?: string;
}
const SearchInput = ({ onChange, placeholder }: ISearchInput) => {
  return (
    <div className="w-full">
      <label htmlFor="search" className="sr-only">
        Search projects
      </label>
      <div className="relative text-gray-300 focus-within:text-gray-400">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          onChange={onChange}
          id="search"
          className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-200 bg-opacity-25 text-indigo-300 placeholder-gray-300 focus:outline-none focus:bg-white focus:placeholder-gray-400 focus:text-gray-900 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
          placeholder={placeholder || "Search here"}
          type="search"
        />
      </div>
    </div>
  );
};

export default SearchInput;
