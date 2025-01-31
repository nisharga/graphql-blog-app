"use client";

import { ReactNode, useEffect } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  header?: string | ReactNode;
  bodyClass?: string;
}
const Modal = ({ isOpen, onClose, children, header, bodyClass }: IProps) => {
  useEffect(() => {
    if (isOpen) {
      document.querySelector("body")?.classList.add("overflow-hidden");
    }

    return () => {
      document.querySelector("body")?.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <div className="fixed top-0 left-0 right-0 z-[999999] p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen bg-gray-900/40 flex justify-center items-center">
          <div className={`${bodyClass} relative w-full max-w-md max-h-full`}>
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-100/50 hover:text-gray-800 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

              {header ? (
                <div className="px-6 pt-4">
                  <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                    {header}
                  </h3>
                </div>
              ) : null}

              <div className="text-center p-6">{children}</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
