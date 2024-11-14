"use client"

import Aside from "@/components/Aside";
import { HiOutlineSearch, HiOutlineChevronRight, HiOutlineChevronLeft, HiOutlineFilter, HiOutlineTrash } from "react-icons/hi";
import NotificationTable from "@/components/NotificationTable";
import { useEffect, useState } from "react";
import FetchNotifications from "@/modules/fetchNotifications";
import io from "socket.io-client";
import Loading from "@/components/Loading";
import Cookies from 'js-cookie';

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
  const [isModal, setIsModal] = useState(false)
  const [dataModal, setDataModal] = useState({})
  
  useEffect(() => {
    setIsLoading(true)

    const filterCookie = Cookies.get('filter')

    // const fetchDataSocket = () => {
    //   try {
    //     const baseUrl = process.env.NEXT_PUBLIC_SOCKET_URL
    //     socket = io(`${baseUrl}/crm`);
  
    //     socket.on("notification-crm:list", (message) => {
    //       setData(message);
    //       setTableList(message.data);
    //     });
  
    //     return () => {
    //       socket.disconnect();
    //     };
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setIsLoading(false)
    //   }
    // };

    const fetchData = async () => {
      try {
        let filterValid = filter == 'all' ? '' : filter

        if (filterCookie) {
          filterValid = filterCookie
          setFilter(filterCookie)
        }

        const result = await FetchNotifications.getAllCrm(searchValue, page, filterValid);
        setData(result);
        setTableList(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
        if (filterCookie) {
          Cookies.remove('filter')
        }
      }
    };

    fetchData()
  
    // if (!searchValue && page === 1 && filter == 'all') {
    //   fetchDataSocket();
    // } else {
    //   fetchData();
    // }
  
    // return () => {
    //   if (socket) {
    //     socket.disconnect();
    //   }
    // };
    
  }, [searchValue, page, filter]);

  function nextPage() {
    setPage(prevPage => prevPage + 1);
  }

  function prevPage() {
    setPage(prevPage => Math.max(prevPage - 1, 0));
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setPage(1)
      setSearchValue(search);
    } else if (e.key === "Backspace" && search.length === 1 && searchValue != '') {
      setSearchValue("");
    }
  };

  const handleChange = (e) => {
    const newSearchValue = e.target.value;
    setSearch(newSearchValue);
  };

  function filterHandle(type) {
    setPage(1)
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

  function handleDataFromTable(id) {
    const dataModal = tableList.find(item => item.id == id)
    setDataModal(dataModal)
    setIsModal(true)
  }

  return (
    <>
      <div className="w-screen h-screen flex bg-privy-dark-50 text-privy-dark-950 relative">
        <div className=" w-3/12 xl:w-2/12">
          <Aside>
          </Aside>
        </div>
          <div className="w-full p-8">
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
                      <p className="text-2xl font-semibold">Logging CRM</p>
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
                      <div className="absolute top-9 right-0 rounded-md overflow-hidden divide-y border shadow-md bg-white z-20">
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
                {isLoading && (
                  <div className="w-full h-full">
                      <Loading></Loading>
                  </div>
                )}
                {!isLoading && (
                 <div className="w-full h-[500px] flex flex-col justify-between">
                    <div className="w-full max-h-[450px]">
                      <NotificationTable data={tableList} onDataSend={handleDataFromTable}></NotificationTable>
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
                )}
              </div>
          </div>
          {isModal && dataModal && (
            <div 
            id="id_modal"
            onClick={(e) => {if (e.target.id == 'id_modal') {setIsModal(false); setDataModal({})}}}
            className="w-full h-full flex justify-center items-center absolute top-0 left-0 z-30 bg-privy-dark-800 bg-opacity-20">
              <div className="p-5 w-1/2 max-h-[400px] bg-white rounded-md border shadow-md z-40">
                  <div className="w-full h-full flex flex-col gap-2">
                    <div className="w-full flex justify-center items-start">
                      <div className="w-1/6 p-1 font-semibold">
                        <p>Type :</p>
                      </div>
                      <div className="w-5/6 p-1 bg-privy-dark-50 rounded-md border capitalize">
                        <p>{dataModal.type}</p>
                      </div>
                    </div>
                    <div className="w-full flex justify-center items-start">
                      <div className="w-1/6 p-1 font-semibold">
                        <p>Name :</p>
                      </div>
                      <div className="w-5/6 p-1 bg-privy-dark-50 rounded-md border">
                        <p>{dataModal.name}</p>
                      </div>
                    </div>
                    <div className="w-full flex justify-center items-start">
                      <div className="w-1/6 p-1 font-semibold">
                        <p>Source :</p>
                      </div>
                      <div className="w-5/6 p-1 bg-privy-dark-50 rounded-md border">
                        <p>{dataModal.source}</p>
                      </div>
                    </div>
                    <div className="w-full flex justify-center items-start">
                      <div className="w-1/6 p-1 font-semibold">
                        <p>Date :</p>
                      </div>
                      <div className="w-5/6 p-1 bg-privy-dark-50 rounded-md border">
                        <p>{dataModal.datetime.slice(0, -5).split('T')[0].split('-').reverse().join('-')} | {dataModal.datetime.slice(0, -5).split('T')[1]}</p>
                      </div>
                    </div>

                    <div className="w-full flex min-h-10 max-h-auto justify-center items-start">
                      <div className="w-1/6 p-1 font-semibold">
                        <p>Detail :</p>
                      </div>
                      <div className="w-5/6 p-1 h-full overflow-y-auto bg-privy-dark-50 rounded-md border">
                        <p>{dataModal.detail}</p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          )}
      </div>
    </>
  );
}
