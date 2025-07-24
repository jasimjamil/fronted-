import React from 'react';

const TeamAttendanceTable = ({ filters }) => {
  // Sample team attendance data
  const teamAttendanceData = [
    { 
      name: 'John Doe', 
      project: 'Project Alpha', 
      date: '2023-07-01', 
      status: 'Present', 
      inTime: '09:00', 
      outTime: '18:00' 
    },
    { 
      name: 'Jane Smith', 
      project: 'Project Beta', 
      date: '2023-07-02', 
      status: 'Half Day', 
      inTime: '09:15', 
      outTime: '14:30' 
    },
    { 
      name: 'Mike Johnson', 
      project: 'Project Alpha', 
      date: '2023-07-03', 
      status: 'Absent', 
      inTime: '-', 
      outTime: '-' 
    },
    { 
      name: 'Sarah Williams', 
      project: 'Project Beta', 
      date: '2023-07-04', 
      status: 'Present', 
      inTime: '08:50', 
      outTime: '17:45' 
    },
    { 
      name: 'Tom Brown', 
      project: 'Project Alpha', 
      date: '2023-07-05', 
      status: 'Present', 
      inTime: '09:05', 
      outTime: '18:15' 
    }
  ];

  // Filter data based on selected filters
  const filteredData = teamAttendanceData.filter(item => {
    const matchMonth = !filters.month || new Date(item.date).toLocaleString('default', { month: 'long' }) === filters.month;
    const matchDate = !filters.date || new Date(item.date).getDate() === parseInt(filters.date);
    const matchEmployee = !filters.employee || item.name.toLowerCase().includes(filters.employee.toLowerCase());
    const matchProject = !filters.project || item.project.toLowerCase().includes(filters.project.toLowerCase());
    
    return matchMonth && matchDate && matchEmployee && matchProject;
  });

  return (
    <div className="w-full">
      <table className="w-full text-left">
        <thead className="bg-secondary-300 text-accent">
          <tr>
            <th className="p-3 border-b border-primary-300">Employee</th>
            <th className="p-3 border-b border-primary-300">Project</th>
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
              <td className="p-3 text-accent border-b border-secondary-300">{item.name}</td>
              <td className="p-3 text-accent border-b border-secondary-300">{item.project}</td>
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
          No team attendance records found
        </div>
      )}
    </div>
  );
};

export default TeamAttendanceTable; 