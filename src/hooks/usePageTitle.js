import { useEffect } from "react";

const DEFAULT_TITLE = "Ikram Real Estate | Reliable Property Solutions";

export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | Ikram Real Estate` : DEFAULT_TITLE;

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
};
