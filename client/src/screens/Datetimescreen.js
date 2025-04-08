// import React, { useState } from 'react';

// import { DatePicker, Space } from 'antd';
// import moment from 'moment';

// const { RangePicker } = DatePicker;

// const App: React.FC = () => {
//   const [dateRange, setDateRange] = useState<[moment.Moment | null, moment.Moment | null]>([null, null]);

//   const handleDateChange = (dates: [moment.Moment | null, moment.Moment | null]) => {
//     setDateRange(dates);
//     if (dates) {
//       const [start, end] = dates;
//       console.log('Selected Start Date and Time:', start?.format('YYYY-MM-DD HH:mm:ss'));
//       console.log('Selected End Date and Time:', end?.format('YYYY-MM-DD HH:mm:ss'));
//     }
//   };

//   return (
//     <Space direction="vertical" size={12}>
//       <RangePicker
//         showTime={{ format: 'HH:mm' }}
//         format="YYYY-MM-DD HH:mm"
//         onChange={handleDateChange}
//         value={dateRange}
//       />
//     </Space>
//   );
// };

// export default App;
