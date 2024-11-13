import React from 'react';

const DonutChart = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="text-center text-gray-600">No data available</div>;
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;

  const segments = data.map((item) => {
    const endAngle = (item.value / total) * 100 + startAngle;
    const segment = `${item.color} ${startAngle}% ${endAngle}%`;
    startAngle = endAngle;
    return segment;
  });

  const gradient = `conic-gradient(${segments.join(', ')})`;

  return (
    <div className='h-full aspect-square flex justify-between items-center'>
        <div className="relative h-full aspect-square">
            <div
                className="donut-chart"
                style={{
                borderRadius: '50%',
                background: gradient,
                width: '100%',
                height: '100%',
                position: 'relative',
                }}
            ></div>
            <div className="absolute w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className='w-full aspect-square bg-white rounded-full flex flex-col gap-1 justify-center items-center overflow-hidden'>
                    <p className='text-sm xl:text-base'>CRM: {data[0].value.toFixed(1)}%</p>
                    <p className='text-sm xl:text-base'>ERP: {data[1].value.toFixed(1)}%</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default DonutChart;
