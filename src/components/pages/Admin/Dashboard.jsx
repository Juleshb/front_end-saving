import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div class="container flex flex-col mx-auto  bg-slate-400">
        <aside
          class="group/sidebar flex flex-col shrink-0 lg:w-[300px] w-[250px] transition-all duration-300 ease-in-out m-0 fixed z-40 inset-y-0 left-0 bg-white border-r border-r-dashed border-r-neutral-200 sidenav fixed-start loopple-fixed-start"
          id="sidenav-main"
        >
          <div class="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

          <div class="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

          <div class="relative pl-3 my-5 overflow-y-scroll">
            <div class="flex flex-col w-full font-medium">
              <div>
                <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <svg
                    width="50px"
                    height="20px"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
                        fill="#969696"
                      />{" "}
                    </g>
                  </svg>{" "}
                  <Link
                    href="javascript:;"
                    class="flex items-center flex-grow text-[1.15rem]  text-blue-700 hover:text-dark"
                  >
                    Dashboard
                  </Link>
                </span>
              </div>

              <div>
                <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <svg
                    fill="#666666"
                    width="50px"
                    height="20px"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon"
                    stroke="#666666"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path d="M668.6 320c0-4.4-3.6-8-8-8h-54.5c-3 0-5.8 1.7-7.1 4.4l-84.7 168.8H511l-84.7-168.8a8 8 0 0 0-7.1-4.4h-55.7c-1.3 0-2.6.3-3.8 1-3.9 2.1-5.3 7-3.2 10.8l103.9 191.6h-57c-4.4 0-8 3.6-8 8v27.1c0 4.4 3.6 8 8 8h76v39h-76c-4.4 0-8 3.6-8 8v27.1c0 4.4 3.6 8 8 8h76V704c0 4.4 3.6 8 8 8h49.9c4.4 0 8-3.6 8-8v-63.5h76.3c4.4 0 8-3.6 8-8v-27.1c0-4.4-3.6-8-8-8h-76.3v-39h76.3c4.4 0 8-3.6 8-8v-27.1c0-4.4-3.6-8-8-8H564l103.7-191.6c.5-1.1.9-2.4.9-3.7zM157.9 504.2a352.7 352.7 0 0 1 103.5-242.4c32.5-32.5 70.3-58.1 112.4-75.9 43.6-18.4 89.9-27.8 137.6-27.8 47.8 0 94.1 9.3 137.6 27.8 42.1 17.8 79.9 43.4 112.4 75.9 10 10 19.3 20.5 27.9 31.4l-50 39.1a8 8 0 0 0 3 14.1l156.8 38.3c5 1.2 9.9-2.6 9.9-7.7l.8-161.5c0-6.7-7.7-10.5-12.9-6.3l-47.8 37.4C770.7 146.3 648.6 82 511.5 82 277 82 86.3 270.1 82 503.8a8 8 0 0 0 8 8.2h60c4.3 0 7.8-3.5 7.9-7.8zM934 512h-60c-4.3 0-7.9 3.5-8 7.8a352.7 352.7 0 0 1-103.5 242.4 352.57 352.57 0 0 1-112.4 75.9c-43.6 18.4-89.9 27.8-137.6 27.8s-94.1-9.3-137.6-27.8a352.57 352.57 0 0 1-112.4-75.9c-10-10-19.3-20.5-27.9-31.4l49.9-39.1a8 8 0 0 0-3-14.1l-156.8-38.3c-5-1.2-9.9 2.6-9.9 7.7l-.8 161.7c0 6.7 7.7 10.5 12.9 6.3l47.8-37.4C253.3 877.7 375.4 942 512.5 942 747 942 937.7 753.9 942 520.2a8 8 0 0 0-8-8.2z" />{" "}
                    </g>
                  </svg>
                  <Link
                    href="javascript:;"
                    class="flex items-center flex-grow text-[1.15rem]  text-slate-700 hover:text-dark"
                  >
                    Transation
                  </Link>
                </span>
              </div>
              <div>
                <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <svg
                    fill="#979191"
                    width="50px"
                    height="20px"
                    viewBox="0 0 64 64"
                    id="Layer_1_1_"
                    version="1.1"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    stroke="#979191"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <path d="M60,3h-9.184C50.402,1.839,49.302,1,48,1H34c-1.302,0-2.402,0.839-2.816,2H22c-1.654,0-3,1.346-3,3v13h-3.406 c-1.217,0-2.418,0.319-3.474,0.923L6.734,23H1v18h6.697l4.236,2.824C13.087,44.594,14.43,45,15.816,45H19v15c0,1.654,1.346,3,3,3 h38c1.654,0,3-1.346,3-3V6C63,4.346,61.654,3,60,3z M25,27h2c2.206,0,4-1.794,4-4s-1.794-4-4-4h-2V9h6.184 c0.414,1.161,1.514,2,2.816,2h14c1.302,0,2.402-0.839,2.816-2H57v48H25V27z M33,4c0-0.552,0.448-1,1-1h14c0.552,0,1,0.448,1,1v4 c0,0.552-0.448,1-1,1H34c-0.552,0-1-0.448-1-1V4z M21,6c0-0.552,0.448-1,1-1h9v2h-8v12h-2V6z M15.816,43 c-0.99,0-1.949-0.29-2.773-0.84L8.303,39H3V25h4.266l5.847-3.341C13.867,21.228,14.725,21,15.594,21H27c1.103,0,2,0.897,2,2 s-0.897,2-2,2H15v1c0,2.757-2.243,5-5,5v2c3.521,0,6.442-2.612,6.929-6H19v16H15.816z M61,60c0,0.552-0.448,1-1,1H22 c-0.552,0-1-0.448-1-1V27h2v32h36V7h-8V5h9c0.552,0,1,0.448,1,1V60z" />{" "}
                        <rect height="2" width="2" x="35" y="5" />{" "}
                        <rect height="2" width="2" x="45" y="5" />{" "}
                        <path d="M48.373,47.209l-3.375-0.964l-0.001-0.507C46.81,44.472,48,42.374,48,40v-2c0-3.859-3.141-7-7-7s-7,3.141-7,7v2 c0,2.372,1.189,4.469,3,5.736v0.51l-3.374,0.963C31.491,47.82,30,49.797,30,52.018V55h22v-2.982 C52,49.797,50.509,47.82,48.373,47.209z M36,40v-2c0-2.757,2.243-5,5-5s5,2.243,5,5v2c0,2.757-2.243,5-5,5S36,42.757,36,40z M42.965,46.714L41,49.333l-1.965-2.619C39.659,46.897,40.318,47,41,47S42.341,46.897,42.965,46.714z M50,53H32v-0.982 c0-1.332,0.895-2.519,2.176-2.885l3.437-0.982L41,52.667l3.387-4.516l3.437,0.982C49.105,49.499,50,50.686,50,52.018V53z" />{" "}
                        <rect height="2" width="2" x="27" y="13" />{" "}
                        <rect height="2" width="24" x="31" y="13" />{" "}
                        <rect height="2" width="22" x="33" y="17" />{" "}
                        <rect height="2" width="22" x="33" y="21" />{" "}
                        <rect height="2" width="2" x="53" y="25" />{" "}
                        <rect height="2" width="18" x="33" y="25" />{" "}
                      </g>{" "}
                    </g>
                  </svg>
                  <Link
                    href="javascript:;"
                    class="flex items-center flex-grow text-[1.15rem]  text-slate-700 hover:text-dark"
                  >
                    Transation
                  </Link>
                </span>
              </div>

              <div class="block pt-5 pb-[.15rem]">
                <div class="px-4 py-[.65rem]">
                  <span class="font-semibold text-[0.95rem] uppercase dark:text-neutral-500/80 text-secondary-dark">
                    Investment
                  </span>
                </div>
              </div>

              <div>
                <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <a
                    href="javascript:;"
                    class="flex items-center flex-grow text-[1.15rem]  hover:text-blue-700 hover:text-dark"
                  >
                    Loans
                  </a>
                </span>
              </div>

              <div>
                <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <a
                    href="javascript:;"
                    class="flex items-center flex-grow text-[1.15rem]  hover:text-blue-700 hover:text-dark"
                  >
                    Services
                  </a>
                </span>
              </div>

              <div>
                <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <a
                    href="javascript:;"
                    class="flex items-center flex-grow text-[1.15rem]  hover:text-blue-700 hover:text-dark"
                  >
                    Settings{" "}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Dashboard;
