import React from 'react';

const MyAttendanceTable = ({ filters }) => {
  // Sample attendance data
  const attendanceData = [
    { date: '2023-07-01', status: 'Present', inTime: '09:00', outTime: '18:00' },
    { date: '2023-07-02', status: 'Present', inTime: '09:15', outTime: '17:45' },
    { date: '2023-07-03', status: 'Half Day', inTime: '09:00', outTime: '14:00' },
    { date: '2023-07-04', status: 'Absent', inTime: '-', outTime: '-' },
    { date: '2023-07-05', status: 'Present', inTime: '08:55', outTime: '18:10' },
  ];

  // Filter data based on selected filters
  const filteredData = attendanceData.filter(item => {
    const matchMonth = !filters.month || new Date(item.date).toLocaleString('default', { month: 'long' }) === filters.month;
    const matchDate = !filters.date || new Date(item.date).getDate() === parseInt(filters.date);
    return matchMonth && matchDate;
  });

  return (
    <div className="w-full">
      <table className="w-full text-left">
        <thead className="bg-secondary-300 text-accent">
          <tr>
            <th className="p-3 border-b border-primary-300">Date</th>
            <th className="p-3 border-b border-primary-300">Status</th>
            <th className="p-3 border-b border-primary-300">In Time</th>
            <th className="p-3 border-b border-primary-300">Out Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr 
              key={index} 
              className="hover:bg-primary-200 transition-colors"
            >
              <td className="p-3 text-accent border-b border-secondary-300">{item.date}</td>
              <td className={`p-3 border-b border-secondary-300 ${
                item.status === 'Present' ? 'text-green-500' : 
                item.status === 'Half Day' ? 'text-yellow-500' : 
                'text-red-500'
              }`}>
                {item.status}
              </td>
              <td className="p-3 text-accent border-b border-secondary-300">{item.inTime}</td>
              <td className="p-3 text-accent border-b border-secondary-300">{item.outTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredData.length === 0 && (
        <div className="text-center py-6 text-secondary-50">
          No attendance records found
        </div>
      )}
    </div>
  );
};

export default MyAttendanceTable;
