export default function NotificationTable({ data, onDataSend }) {
    const sendDataToParent = (id) => {
        onDataSend(id); // Mengirim data ke parent
    };
    
    return (
        <div className="w-full max-h-full border divide-y rounded-lg overflow-hidden bg-white overflow-y-auto">
            <div className="grid grid-cols-12 gap-2 h-11 px-1 sticky top-0 bg-white z-10">
                <div className="col-span-1 flex justify-start items-center font-semibold pl-3">
                    <p>Type</p>
                </div>
                <div className="col-span-3 flex justify-start items-center font-semibold pl-3">
                    <p>Name</p>
                </div>
                <div className="col-span-2 flex justify-start items-center font-semibold pl-3">
                    <p>Source</p>
                </div>
                <div className="col-span-2 flex justify-start items-center font-semibold pl-3">
                    <p>Date</p>
                </div>
                <div className="col-span-4 flex justify-start items-center font-semibold pl-3">
                    <p>Detail</p>
                </div>
            </div>
            {data.length > 0 && (
                <>
                    {data.map((item, i) => (
                        <div
                        onClick={() => {sendDataToParent(item.id)}}
                        className={`grid grid-cols-12 h-11 px-1 gap-2 ${i % 2 == 0 ? 'bg-gray-50' : 'bg-white'} cursor-pointer hover:bg-privy-red-100/70 active:bg-privy-red-100 duration-75`} key={i}>
                            <div className="col-span-1 flex justify-start items-center pl-3 py-2 text-sm">
                                {item.type == 'error' && (
                                    <p className="truncate w-full text-center flex items-center justify-center bg-red-200 text-red-500 h-full rounded-full border border-red-500 capitalize">{item.type}</p>
                                )}
                                {item.type == 'success' && (
                                    <p className="truncate w-full text-center flex items-center justify-center bg-green-200 text-green-600 h-full rounded-full border border-green-600 capitalize">{item.type}</p>
                                )}
                                {item.type == 'waiting' && (
                                    <p className="truncate w-full text-center flex items-center justify-center bg-yellow-200 text-yellow-600 h-full rounded-full border border-yellow-600 capitalize">{item.type}</p>
                                )}
                            </div>
                            <div className="col-span-3 flex justify-start items-center pl-3">
                                <p className="truncate text-privy-dark-800 capitalize">{item.name}</p>
                            </div>
                            <div className="col-span-2 flex justify-start items-center pl-3">
                                <p className="truncate text-privy-dark-800">{item.source}</p>
                            </div>
                            <div className="col-span-2 flex justify-start items-center pl-3 gap-2">
                                <p className="truncate text-privy-dark-800">{item.datetime.slice(0, -5).split('T')[0].split('-').reverse().join('-')} | {item.datetime.slice(0, -5).split('T')[1]}</p>
                            </div>
                            <div className="col-span-4 flex justify-start items-center pl-3">
                                <p className="truncate text-privy-dark-800">{item.detail}</p>
                            </div>
                        </div>
                    ))}
                </>
            )}
            {/* {data.length > 0 && (
                <div className="w-full divide-y">
                    { data && data.map((item, i) => (
                        <div className={`grid grid-cols-12 h-11 px-1 gap-2 ${i % 2 == 0 ? 'bg-gray-50' : 'bg-white'} cursor-pointer hover:bg-privy-red-100/70 active:bg-privy-red-100 duration-75`} key={i}>
                            <div className="col-span-1 flex justify-start items-center pl-3 py-2 text-sm">
                                {item.type == 'error' && (
                                    <p className="truncate w-full xl:w-2/3 text-center flex items-center justify-center bg-red-200 text-red-500 h-full rounded-full border border-red-500 capitalize">{item.type}</p>
                                )}
                                {item.type == 'success' && (
                                    <p className="truncate w-full xl:w-2/3 text-center flex items-center justify-center bg-green-200 text-green-600 h-full rounded-full border border-green-600 capitalize">{item.type}</p>
                                )}
                                {item.type == 'waiting' && (
                                    <p className="truncate w-full xl:w-2/3 text-center flex items-center justify-center bg-yellow-200 text-yellow-600 h-full rounded-full border border-yellow-600 capitalize">{item.type}</p>
                                )}
                            </div>
                            <div className="col-span-3 flex justify-start items-center pl-3">
                                <p className="truncate text-privy-dark-800 capitalize">{item.name}</p>
                            </div>
                            <div className="col-span-2 flex justify-start items-center pl-3">
                                <p className="truncate text-privy-dark-800">{item.source}</p>
                            </div>
                            <div className="col-span-2 flex justify-start items-center pl-3 gap-2">
                                <p className="truncate text-privy-dark-800">{item.datetime.slice(0, -5).split('T')[0].split('-').reverse().join('-')} | {item.datetime.slice(0, -5).split('T')[1]}</p>
                            </div>
                            <div className="col-span-4 flex justify-start items-center pl-3">
                                <p className="truncate text-privy-dark-800">{item.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )} */}
            {data.length == 0 && (
                <div className="w-full divide-y">
                    <div className="h-11 px-1 w-full bg-white flex items-center justify-center">
                        <p>Data Not Found</p>
                    </div>
                </div>
            )}
        </div>
    );
}
