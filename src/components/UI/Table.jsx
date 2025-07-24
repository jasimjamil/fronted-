import React from 'react';

const Table = ({ 
  columns, 
  data, 
  onRowClick,
  className = '' 
}) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-neutral-200">
        <thead className="bg-neutral-50">
          <tr>
            {columns.map((column, index) => (
              <th 
                key={index} 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className={`hover:bg-neutral-100 ${onRowClick ? 'cursor-pointer' : ''}`}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((column, colIndex) => (
                <td 
                  key={colIndex} 
                  className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900"
                >
                  {column.accessor ? column.accessor(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table; 