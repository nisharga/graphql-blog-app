/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FC, useEffect, useRef, useState } from "react";

interface IProps {
  html: string;
  className?: string;
  tag?: string;
}

const InnerHTML: FC<IProps> = ({ html, className }: any) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isMount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);

    const parsedHTML = document.createRange().createContextualFragment(html);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isMount && divRef.current && divRef.current.appendChild(parsedHTML);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMount]);

  return isMount && <div className={className} ref={divRef}></div>;
};

export default InnerHTML;
