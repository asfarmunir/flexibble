'use client'

import React from 'react'
import { IoSearch } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'
import { useRouter } from 'next/navigation'
import { removeKeysFromQuery } from '@/lib/utils'

const RemoveQuery = ({ searchText }: { searchText: string }) => {
    const router = useRouter();
  return (
      <button className="flex cursor-pointer items-center justify-center px-4 py-0.5 pb-1 rounded-xl bg-slate-100 text-slate-500"
          onClick={() => {
              
        //         let newUrl=''
        //        newUrl = removeKeysFromQuery({
        //   params:'',
        //   keysToRemove: ["query"],
        // });
        //       console.log('hehe');
            router.push('/'+'?query=', { scroll: false });
          
      }}
      >
                  <IoSearch className="text-slate-500 mr-1 mt-1 text-sm" />
                  <p className="text-xs md:text-sm font-light capitalize mt-1 flex items-center">
                  {searchText}
                </p>
                <RxCross2 className="text-slate-500 mr-1 ml-3 mt-1"  />

              </button>
  )
}

export default RemoveQuery
