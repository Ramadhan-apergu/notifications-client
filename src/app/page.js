"use client"

import DonutChart from '@/components/DonutChart';
import Aside from '../components/Aside';
import { AiOutlineTeam } from "react-icons/ai";
import { GoGear } from "react-icons/go";
import { useState, useEffect } from 'react';
import io from "socket.io-client";
import FetchNotifications from '@/modules/fetchNotifications';

let socket

export default function Home() {
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
                <div className='rounded-md w-1/4 bg-white/70 px-5 py-8 flex-col flex justify-center items-start'>
                  <p className='text-2xl xl:text-3xl font-semibold'>{data.total_data || '-'}</p>
                  <p className='text-base xl:text-xl'>Total Data</p>
                </div>
                <div className='rounded-md w-1/4 bg-white/70 px-5 py-8 flex-col flex justify-center items-start'>
                  <p className='text-2xl xl:text-3xl font-semibold'>{data.total_error || '-'}</p>
                  <p className='text-base xl:text-xl'>Error</p>
                </div>
                <div className='rounded-md w-1/4 bg-white/70 px-5 py-8 flex-col flex justify-center items-start'>
                  <p className='text-2xl xl:text-3xl font-semibold'>{data.total_waiting || '-'}</p>
                  <p className='text-base xl:text-xl'>Waiting</p>
                </div>
                <div className='rounded-md w-1/4 bg-white/70 px-5 py-8 flex-col flex justify-center items-start'>
                  <p className='text-2xl xl:text-3xl font-semibold'>{data.total_success || '-'}</p>
                  <p className='text-base xl:text-xl'>Success</p>
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
                    <p className='text-2xl xl:text-3xl font-semibold'>{data.total_crm || '-'}</p>
                    <p className='text-base xl:text-xl'>Total Data</p>
                  </div>
                </div>
                <div className='rounded-md w-1/2 bg-white/70 gap-3 px-5 py-8 flex'>
                  <div className='flex flex-col justify-center items-center text-4xl xl:text-6xl'>
                    <GoGear/>
                    <p className='text-base xl:text-xl font-semibold'>ERP</p>
                  </div>
                  <div className='flex-col flex justify-center items-start'>
                    <p className='text-2xl xl:text-3xl font-semibold'>{data.total_erp || '-'}</p>
                    <p className='text-base xl:text-xl'>Total Data</p>
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

