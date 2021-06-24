import { delay } from "helpers/utils";
import { useState, useEffect } from "react";
import SearchBox from "./search-box";

export default function SearchInput() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setSearchValue("");
    }
  }, [isFocused]);

  const suffixIcon = searching ? (
    <>
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </>
  ) : (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray-primary select-none cursor-pointer w-8 h-6"
        viewBox="0 0 20 20"
        fill="currentColor"
        onClick={() => {
          setIsFocused(false);
        }}
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    </>
  );

  return (
    <>
      <div className="w-full h-8 bg-gray-background flex flex-row justify-evenly items-center rounded-sm border border-gray-primary">
        <div className="mx-2 flex flex-row relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-primary select-none w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            value={searchValue}
            onFocus={() => setIsFocused(true)}
            onBlur={async () => {
              if (!searchValue) {
                await delay(100);
                setIsFocused(false);
              }
            }}
            onChange={(e) => setSearchValue(e.target.value)}
            className={`ml-2 bg-gray-background text-black-light focus:outline-none ${
              isFocused ? "w-full" : "w-12"
            }`}
            placeholder="Buscar"
          />
          <SearchBox
            value={searchValue}
            show={isFocused}
            setIsFocused={setIsFocused}
            setSearching={setSearching}
          />
        </div>
        {isFocused && suffixIcon}
      </div>
    </>
  );
}
