"use client"

import Aside from "@/components/Aside";
import { HiOutlineSearch, HiOutlineChevronRight, HiOutlineChevronLeft, HiOutlineFilter, HiOutlineTrash } from "react-icons/hi";
import NotificationTable from "@/components/NotificationTable";
import { useEffect, useState } from "react";
import FetchNotifications from "@/modules/fetchNotifications";
import io from "socket.io-client";
import Loading from "@/components/Loading";

let socket;

export default function Home() {

  const [data, setData] = useState({})
  const [tableList, setTableList] = useState([])
  const [search, setSearch] = useState('')
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('all')
  const [isFilter, setIsFilter] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    setIsLoading(true)
    const fetchDataSocket = () => {
      try {
        socket = io("http://localhost:8000");
  
        socket.on("notification:list", (message) => {
          setData(message);
          setTableList(message.data);
        });
  
        return () => {
          socket.disconnect();
        };
      } catch (error) {
        console.log(error);
      }
    };
  
    const fetchData = async () => {
      try {
        const filterValid = filter == 'all' ? '' : filter
        const response = await FetchNotifications.getAll(searchValue, page, filterValid);
        setData(response);
        setTableList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    if (!searchValue && page === 1 && filter == 'all') {
      fetchDataSocket();
    } else {
      fetchData();
    }

    setIsLoading(false)
  
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [searchValue, page, filter]);

  function nextPage() {
    setPage(prevPage => prevPage + 1);
  }

  function prevPage() {
    setPage(prevPage => Math.max(prevPage - 1, 0));
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchValue(search);
    } /* else if (e.key === "Backspace" && search.length === 1) {
      setSearchValue("");
    } */
  };

  const handleChange = (e) => {
    const newSearchValue = e.target.value;
    setSearch(newSearchValue);
  };

  function filterHandle(type) {
    setFilter(type)
    setIsFilter(false)
  }

  function handleReset() {
    setSearch('')
    setSearchValue('')
    setPage(1)
    setFilter('all')
    setIsFilter(false)
  }

  return (
    <>
      <div className="w-screen h-screen flex bg-privy-dark-50 text-privy-dark-950">
        <div className="w-2/12">
          <Aside>
          </Aside>
        </div>
          <div className="w-10/12 p-8">
              <div className="w-full h-full flex flex-col gap-8">
                <div className="w-full flex items-center justify-between">
                  <div className="w-1/2 h-10 rounded-full bg-white flex justify-start items-center relative">
                    <HiOutlineSearch className="text-xl absolute left-3"/>
                    <input
                      type="text"
                      className="w-full h-full border-2 rounded-full pl-10 pr-3"
                      placeholder="Search keyword..."
                      value={search}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  {searchValue && (
                    <div className="w-1/2 h-10 flex justify-end items-center">
                      <p className="">Search results for: '{searchValue}'</p>
                    </div>
                  )}
                </div>
                <div className="w-full flex justify-between items-center">
                  <div className="">
                      <p className="text-2xl font-semibold">Logging</p>
                  </div>
                  <div className="flex justify-center gap-3 relative">
                  <button 
                    onClick={handleReset}
                    className="flex capitalize justify-center items-center px-3 py-1 border rounded-md gap-3 cursor-pointer text-white bg-privy-red-600 hover:bg-privy-red-700 duration-100">
                      <HiOutlineTrash className="text-xl"/>
                      <p>reset</p>
                    </button>
                    <button 
                    onClick={() => {setIsFilter(!isFilter)}}
                    className="flex capitalize justify-center items-center px-3 py-1 border bg-white rounded-md gap-3 cursor-pointer hover:text-white hover:bg-privy-red-600 duration-100">
                      <HiOutlineFilter className="text-xl"/>
                      <p>{filter}</p>
                    </button>
                    {isFilter && (
                      <div className="absolute top-9 right-0 rounded-md overflow-hidden divide-y border shadow-md bg-white">
                        <div onClick={() => {filterHandle('all')}} className="px-3 py-1 text-center bg-white cursor-pointer hover:bg-privy-red-600 hover:text-white capitalize duration-100">
                          <p>all</p>
                        </div>
                        <div onClick={() => {filterHandle('success')}} className="px-3 py-1 text-center bg-white cursor-pointer hover:bg-privy-red-600 hover:text-white capitalize duration-100">
                          <p>success</p>
                        </div>
                        <div onClick={() => {filterHandle('waiting')}} className="px-3 py-1 text-center bg-white cursor-pointer hover:bg-privy-red-600 hover:text-white capitalize duration-100">
                          <p>waiting</p>
                        </div>
                        <div onClick={() => {filterHandle('error')}} className="px-3 py-1 text-center bg-white cursor-pointer hover:bg-privy-red-600 hover:text-white capitalize duration-100">
                          <p>error</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                  <div className="w-full h-full flex flex-col gap-3">
                    <div className="w-full max-h-[500px]">
                      <NotificationTable data={tableList}></NotificationTable>
                    </div>
                    <div className="w-full flex justify-center items-center gap-2 relative">
                      <button 
                      onClick={prevPage}
                      className="p-1 border bg-privy-red-600 hover:bg-privy-red-700 duration-100 text-white rounded-md disabled:bg-privy-red-600/50 disabled:cursor-not-allowed" disabled={data.page == 1}>
                        <HiOutlineChevronLeft />
                      </button>
                        {data.totalPages > 0 && (
                          <p className="">{`${data.page} / ${data.totalPages}`}</p>
                        )}
                        {data.totalPages == 0 && (
                          <p className="">{`${data.totalPages}`}</p>
                        )}
                      <button 
                      onClick={nextPage}
                      className="p-1 border bg-privy-red-600 hover:bg-privy-red-700 duration-100 text-white rounded-md disabled:bg-privy-red-600/50 disabled:cursor-not-allowed" disabled={data.page >= data.totalPages}>
                        <HiOutlineChevronRight />
                      </button>
                      <p className="absolute right-0">Show {tableList.length} out of {data.totalData} results</p>
                    </div>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
}
