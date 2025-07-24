import React from 'react';
import Table from '../UI/Table';
import Button from '../UI/Button';

const EmployeeList = ({ employees, onEdit, isLoading }) => {
  const columns = [
    {
      header: 'Name',
      key: 'name',
    },
    {
      header: 'Email',
      key: 'email',
    },
    {
      header: 'Position',
      key: 'position',
    },
    {
      header: 'Status',
      accessor: (row) => (
        <span 
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
            ${row.status === 'active' ? 'bg-green-100 text-green-800' : 
              row.status === 'inactive' ? 'bg-red-100 text-red-800' : 
              'bg-yellow-100 text-yellow-800'}`}
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: (row) => (
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => onEdit(row)}
          className="text-xs"
        >
          Edit
        </Button>
      ),
    }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-soft overflow-hidden">
      {employees.length === 0 ? (
        <div className="text-center py-8 text-neutral-500">
          No employees found. Add your first employee!
        </div>
      ) : (
        <Table 
          columns={columns} 
          data={employees} 
          className="w-full"
        />
      )}
    </div>
  );
};

export default EmployeeList;