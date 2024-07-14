/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { ITEMS_PER_PAGE } from '../app/constant';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { nanoid } from '@reduxjs/toolkit';

function Pagination({page,setPage,pageHandler,totalItems }) {
    
    
    return (<div>
   <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <div
                  onClick={()=>(page>1)?(setPage(page-1)):(setPage(page))}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </div>
                <div
                  onClick={()=>(page<(totalItems/ITEMS_PER_PAGE))?setPage(page+1):setPage(page)}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{((page-1)*ITEMS_PER_PAGE + 1)}</span> to{" "}
                    <span className="font-medium">{((page)*ITEMS_PER_PAGE<totalItems)?(page)*ITEMS_PER_PAGE:totalItems}</span> of{" "}
                    <span className="font-medium">{totalItems}</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" onClick={()=>(page>1)?(setPage(page-1)):(setPage(page))} />
                    </a>
                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                    {Array.from({length:Math.ceil(totalItems/ITEMS_PER_PAGE)}).map((el,index)=>
                    (
                    <div
                      key={nanoid()}
                      onClick={e=>pageHandler(e,index+1)}
                      aria-current="page"
                      className= {`justify-center relative z-10 m-1 border-1 cursor-pointer border border-white inline-flex items-center ${(index+1)==page?`bg-indigo-600 text-white`:`text-black`} px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    >
                      {index+1}
                      </div>)
                    )}
                   
  
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" onClick={()=>(page<(totalItems/ITEMS_PER_PAGE))?setPage(page+1):setPage(page)}/>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
    </div>)
}

export default Pagination;

