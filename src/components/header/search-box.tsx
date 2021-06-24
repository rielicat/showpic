/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import useSearchHistory from "hooks/use-search-history";
import Img from "components/img";
import AssetsContext from "context/assets";
import { getProfilesByName } from "services/firebase";
import { useHistory } from "react-router-dom";

interface Props {
  value: string;
  show: boolean;
  setIsFocused: Function;
  setSearching: Function;
}

export default function SearchBox({
  value,
  show,
  setIsFocused,
  setSearching,
}: Props) {
  const { searchHistory, clearHistory, addToHistory, removeFromHistory } =
    useSearchHistory();

  const { images, getAvatar } = useContext(AssetsContext);
  const { push } = useHistory();

  const [results, setResults] = useState(searchHistory);

  useEffect(() => {
    const fetchResults = async () => {
      setSearching(true);
      try {
        setResults(await getProfilesByName(value));
      } catch (e) {}
      setSearching(false);
    };
    if (!searchHistory || !!value) fetchResults();
    else setResults(searchHistory);
  }, [value]);

  useEffect(() => {
    setResults(searchHistory);
  }, [searchHistory]);

  useEffect(() => {
    for (const result of results) getAvatar(result.username);
  }, [results]);

  return show && (!!value || !!searchHistory.length) ? (
    <div className="absolute top-8 -ml-4 sm:-ml-24 z-50">
      <div className="transform rotate-45 w-4 h-4 -mb-2 mx-auto top-0 bg-white" />
      <div className="bg-white w-72 sm:w-96 rounded-md h-96 shadow-custom px-5 pb-5 overflow-y-scroll">
        {!!searchHistory.length && !value && (
          <div className="flex justify-between">
            <p className="mt-4 text-black-light font-bold">Recent</p>
            <p
              className="mt-4 text-blue-medium cursor-pointer"
              onClick={() => clearHistory()}
            >
              Clear all
            </p>
          </div>
        )}
        <div className="flex flex-col justify-center items-center">
          {results.map(({ username, fullName }) => (
            <div
              key={`${username}-search-box`}
              className="w-full grid grid-cols-6 items-center mt-4"
            >
              <Img
                circle
                skeletonSize={{ width: 44, height: 44 }}
                src={images[`${username}.jpg`]}
                className="w-11 h-11 rounded-full col-span-1"
              />
              <div className="flex flex-row justify-between items-center col-span-5">
                <div
                  className="flex flex-col ml-2"
                  onClick={() => {
                    addToHistory({ username, fullName });
                    setIsFocused(false);
                    push(`/p/${username}`);
                  }}
                >
                  <p className="text-sm font-semibold text-gray-base">
                    {username}
                  </p>
                  <p className="text-sm text-black-faded">{fullName}</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-base cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => removeFromHistory(username)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          ))}

          {results.length === 0 && (
            <p className="mt-4 font-bold text-gray-base">No results found</p>
          )}
        </div>
      </div>
    </div>
  ) : null;
}
