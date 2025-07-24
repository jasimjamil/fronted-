import React from 'react';

const MyAttendanceTable = ({ filters }) => {
  // Sample attendance data for the employee
  const attendanceData = [
    { 
      date: '2023-07-01', 
      status: 'Present', 
      inTime: '09:00', 
      outTime: '18:00', 
      workHours: '9h 00m',
      project: 'Project Alpha'
    },
    { 
      date: '2023-07-02', 
      status: 'Present', 
      inTime: '09:15', 
      outTime: '17:45', 
      workHours: '8h 30m',
      project: 'Project Beta'
    },
    { 
      date: '2023-07-03', 
      status: 'Half Day', 
      inTime: '09:00', 
      outTime: '14:00', 
      workHours: '5h 00m',
      project: 'Project Alpha'
    },
    { 
      date: '2023-07-04', 
      status: 'Absent', 
      inTime: '-', 
      outTime: '-', 
      workHours: '0h 00m',
      project: '-'
    },
    { 
      date: '2023-07-05', 
      status: 'Present', 
      inTime: '08:55', 
      outTime: '18:10', 
      workHours: '9h 15m',
      project: 'Project Beta'
    }
  ];

  // Filter data based on selected filters
  const filteredData = attendanceData.filter(item => {
    const matchMonth = !filters.month || new Date(item.date).toLocaleString('default', { month: 'long' }) === filters.month;
    const matchDate = !filters.date || new Date(item.date).getDate() === parseInt(filters.date);
    
    return matchMonth && matchDate;
  });

  // Calculate summary statistics
  const totalDays = attendanceData.length;
  const presentDays = attendanceData.filter(item => item.status === 'Present').length;
  const halfDays = attendanceData.filter(item => item.status === 'Half Day').length;
  const absentDays = attendanceData.filter(item => item.status === 'Absent').length;
  const attendancePercentage = ((presentDays + halfDays * 0.5) / totalDays * 100).toFixed(2);

  return (
    <div className="w-full">
      {/* Summary Statistics */}
      <div className="grid grid-cols-4 gap-4 p-4 bg-secondary-300">
        <div className="text-center">
          <p className="text-sm text-secondary-50">Total Days</p>
          <p className="text-2xl font-bold text-accent">{totalDays}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-secondary-50">Present</p>
          <p className="text-2xl font-bold text-green-500">{presentDays}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-secondary-50">Half Days</p>
          <p className="text-2xl font-bold text-yellow-500">{halfDays}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-secondary-50">Attendance %</p>
          <p className="text-2xl font-bold text-accent">{attendancePercentage}%</p>
        </div>
      </div>

      {/* Attendance Table */}
      <table className="w-full text-left">
        <thead className="bg-secondary-300 text-accent">
          <tr>
            <th className="p-3 border-b border-primary-300">Date</th>
            <th className="p-3 border-b border-primary-300">Status</th>
            <th className="p-3 border-b border-primary-300">In Time</th>
            <th className="p-3 border-b border-primary-300">Out Time</th>
            <th className="p-3 border-b border-primary-300">Work Hours</th>
            <th className="p-3 border-b border-primary-300">Project</th>
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
              <td className="p-3 text-accent border-b border-secondary-300">{item.workHours}</td>
              <td className="p-3 text-accent border-b border-secondary-300">{item.project}</td>
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