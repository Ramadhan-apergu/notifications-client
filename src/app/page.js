"use client"

import DonutChart from '@/components/DonutChart';
import Aside from '../components/Aside';
import { AiOutlineTeam } from "react-icons/ai";
import { GoGear } from "react-icons/go";
import { useState, useEffect } from 'react';
import io from "socket.io-client";
import FetchNotifications from '@/modules/fetchNotifications';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

let socket

export default function Home() {
  const router = useRouter()
  const [data, setData] = useState({})
  const [chartData, setChartData] = useState([
    { name: 'crm', value: 0, color: '#e42e2c' },
    { name: 'erp', value: 0, color: '#ffa3a2' },
  ])

  useEffect(() => {

    const fetchDataSocket = () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SOCKET_URL
        socket = io(`${baseUrl}/dashboard`);
  
        socket.on("notification:dashboard", (message) => {
          const crmPercent = message[0].total_crm / message[0].total_data * 100
          const erpPercent = message[0].total_erp / message[0].total_data * 100

          setChartData([
            { name: 'crm', value: crmPercent, color: '#e42e2c' },
            { name: 'erp', value: erpPercent, color: '#ffa3a2' },
          ]);
          setData(message[0]);
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
        const result = await FetchNotifications.getDataDashboard()

        const crmPercent = result[0].total_crm / result[0].total_data * 100
        const erpPercent = result[0].total_erp / result[0].total_data * 100

        setChartData([
          { name: 'crm', value: crmPercent, color: '#e42e2c' },
          { name: 'erp', value: erpPercent, color: '#ffa3a2' },
        ]);
        setData(result[0]);

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  
    // fetchDataSocket();

  
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
    
  }, []);

  const handleRoute = (route, filter) => {
    Cookies.set('filter', filter)
    router.push(route)
  }

  return (
    <>
      <div className="w-screen h-screen flex bg-privy-dark-50 text-privy-dark-950 relative">
        <div className=" w-3/12 xl:w-2/12">
          <Aside>
          </Aside>
        </div>
        <div className="w-full h-full p-8">
          <div className="w-full h-full grid grid-cols-12 grid-rows-2 gap-4">
            <div className="w-full gap-4 h-full flex flex-col row-span-1 col-span-12 bg-[url('/banner.jpg')] bg-cover bg-top rounded-xl p-5">
              <div className='text-xl xl:text-2xl font-semibold text-privy-dark-950'>
                <p>Overview</p>
                <p className='text-sm xl:text-base text-privy-dark-600 font-normal'>The dashboard provides a clear, real-time snapshot of key metrics and performance data.</p>
              </div>
              <div className='w-full h-full flex justify-between items-center gap-4'>
                <div className='rounded-md w-1/4 bg-white/70 px-5 py-6 xl:py-9 flex-col flex justify-center items-start'>
                  <p className='text-xl xl:text-3xl font-semibold'>{data.total_data || '-'}</p>
                  <p className='text-sm xl:text-xl'>Total Data</p>
                </div>
                <div className='rounded-md w-1/4 bg-white/70 flex gap-1 xl:gap-2 p-2 xl:p-5'>
                  <div className='w-1/3 flex-col flex justify-center items-center'>
                    <p className='text-xl xl:text-3xl font-semibold'>{data.total_error || '-'}</p>
                    <p className='text-sm xl:text-xl'>Error</p>
                  </div>
                  <div className='w-2/3 flex flex-col text-sm xl:text-xl font-semibold justify-center items-center gap-2'>
                    <div onClick={() => {handleRoute('/crm', 'error')}} className='py-2 w-full bg-white/70 hover:bg-privy-red-600/50 cursor-pointer duration-100 flex justify-center items-center rounded-lg'>
                      <p><span className='font-normal'>CRM</span> {data.total_error_crm || '-'}</p>
                    </div>
                    <div onClick={() => {handleRoute('/erp', 'error')}} className='py-2 w-full bg-white/70 hover:bg-privy-red-600/50 cursor-pointer duration-100 flex justify-center items-center rounded-lg'>
                      <p><span className='font-normal'>ERP</span> {data.total_error_erp || '-'}</p>
                    </div>
                  </div>
                </div>
                <div className='rounded-md w-1/4 bg-white/70 flex gap-1 xl:gap-2 p-2 xl:p-5'>
                  <div className='w-1/3 flex-col flex justify-center items-center'>
                    <p className='text-xl xl:text-3xl font-semibold'>{data.total_waiting || '-'}</p>
                    <p className='text-sm xl:text-xl'>Waiting</p>
                  </div>
                  <div className='w-2/3 flex flex-col text-sm xl:text-xl font-semibold justify-center items-center gap-2'>
                    <div onClick={() => {handleRoute('/crm', 'waiting')}} className='py-2 w-full bg-white/70 hover:bg-privy-red-600/50 cursor-pointer duration-100 flex justify-center items-center rounded-lg'>
                      <p><span className='font-normal'>CRM</span> {data.total_waiting_crm || '-'}</p>
                    </div>
                    <div onClick={() => {handleRoute('/erp', 'waiting')}} className='py-2 w-full bg-white/70 hover:bg-privy-red-600/50 cursor-pointer duration-100 flex justify-center items-center rounded-lg'>
                      <p><span className='font-normal'>ERP</span> {data.total_waiting_erp || '-'}</p>
                    </div>
                  </div>
                </div>
                <div className='rounded-md w-1/4 bg-white/70 flex gap-1 xl:gap-2 p-2 xl:p-5'>
                  <div className='w-1/3 flex-col flex justify-center items-center'>
                    <p className='text-xl xl:text-3xl font-semibold'>{data.total_success || '-'}</p>
                    <p className='text-sm xl:text-xl'>Success</p>
                  </div>
                  <div className='w-2/3 flex flex-col text-sm xl:text-xl font-semibold justify-center items-center gap-2'>
                    <div onClick={() => {handleRoute('/crm', 'success')}} className='py-2 w-full bg-white/70 hover:bg-privy-red-600/50 cursor-pointer duration-100 flex justify-center items-center rounded-lg'>
                      <p><span className='font-normal'>CRM</span> {data.total_success_crm || '-'}</p>
                    </div>
                    <div onClick={() => {handleRoute('/erp', 'success')}} className='py-2 w-full bg-white/70 hover:bg-privy-red-600/50 cursor-pointer duration-100 flex justify-center items-center rounded-lg'>
                      <p><span className='font-normal'>ERP</span> {data.total_success_erp || '-'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full row-span-1 col-span-4 p-5 flex justify-center rounded-xl bg-white">
              <DonutChart data={chartData}/>
            </div>
            <div className="w-full h-full flex flex-col row-span-1 col-span-8 bg-gradient-to-l from-privy-red-600 to-privy-red-300 rounded-xl p-5">
              <div className='text-xl xl:text-2xl font-semibold text-privy-dark-950'>
                  <p>Feature</p>
                  <p className='text-sm xl:text-base text-privy-dark-600 font-normal'>The dashboard provides a clear, real-time snapshot of key metrics and performance data.</p>
              </div>
              <div className='w-full h-full flex justify-between items-center gap-4'>
                <div className='rounded-md w-1/2 bg-white/70 gap-3 px-5 py-8 flex'>
                  <div className='flex flex-col justify-center items-center text-4xl xl:text-6xl'>
                    <AiOutlineTeam/>
                    <p className='text-base xl:text-xl font-semibold'>CRM</p>
                  </div>
                  <div className='flex-col flex justify-center items-start'>
                    <p className='text-xl xl:text-3xl font-semibold'>{data.total_crm || '-'}</p>
                    <p className='text-sm xl:text-xl'>Total Data</p>
                  </div>
                </div>
                <div className='rounded-md w-1/2 bg-white/70 gap-3 px-5 py-8 flex'>
                  <div className='flex flex-col justify-center items-center text-4xl xl:text-6xl'>
                    <GoGear/>
                    <p className='text-base xl:text-xl font-semibold'>ERP</p>
                  </div>
                  <div className='flex-col flex justify-center items-start'>
                    <p className='text-xl xl:text-3xl font-semibold'>{data.total_erp || '-'}</p>
                    <p className='text-sm xl:text-xl'>Total Data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

