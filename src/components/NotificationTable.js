export default function NotificationTable({ data }) {
    return (
        <div className="w-full max-h-full border divide-y rounded-lg overflow-hidden bg-white overflow-y-auto">
            <div className="grid grid-cols-12 gap-2 h-11 px-1">
                <div className="col-span-2 flex justify-start items-center font-semibold pl-3">
                    <p>Type</p>
                </div>
                <div className="col-span-2 flex justify-start items-center font-semibold pl-3">
                    <p>Name</p>
                </div>
                <div className="col-span-3 flex justify-start items-center font-semibold pl-3">
                    <p>Source</p>
                </div>
                <div className="col-span-3 flex justify-start items-center font-semibold pl-3">
                    <p>Date</p>
                </div>
                <div className="col-span-2 flex justify-start items-center font-semibold pl-3">
                    <p>Detail</p>
                </div>
            </div>
            {data.length > 0 && (
                <div className="w-full divide-y">
                    { data && data.map((item, i) => (
                        <div className={`grid grid-cols-12 h-11 px-1 gap-2 ${i % 2 == 0 ? 'bg-gray-50' : 'bg-white'}`} key={i}>
                            <div className="col-span-2 flex justify-start items-center pl-3 py-2">
                                {item.type == 'error' && (
                                    <p className="truncate w-full xl:w-2/3 text-center bg-red-200 text-red-500 h-full rounded-full border border-red-500 capitalize">{item.type}</p>
                                )}
                                {item.type == 'success' && (
                                    <p className="truncate w-full xl:w-2/3 text-center bg-green-200 text-green-600 h-full rounded-full border border-green-600 capitalize">{item.type}</p>
                                )}
                                {item.type == 'waiting' && (
                                    <p className="truncate w-full xl:w-2/3 text-center bg-yellow-200 text-yellow-600 h-full rounded-full border border-yellow-600 capitalize">{item.type}</p>
                                )}
                            </div>
                            <div className="col-span-2 flex justify-start items-center pl-3">
                                <p className="truncate text-privy-dark-600 capitalize">{item.name}</p>
                            </div>
                            <div className="col-span-3 flex justify-start items-center pl-3">
                                <p className="truncate text-privy-dark-600">{item.source}</p>
                            </div>
                            <div className="col-span-3 flex justify-start items-center pl-3 gap-2">
                                {item.datetime.slice(0, -5).split('T').map((el, i) => (
                                    <p key={i} className={`truncate ${i == 1 ? 'text-blue-500' : 'text-green-500'}`}>{el}</p>
                                ))}
                            </div>
                            <div className="col-span-2 flex justify-start items-center pl-3">
                                <p className="truncate text-privy-dark-600">{item.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
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
