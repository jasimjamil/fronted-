import React, { useState, useEffect } from 'react';
import { employeeAPI } from '../../services/api';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import Button from '../UI/Button';

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      // Simulated data for now
      const mockData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Developer', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', position: 'Designer', status: 'active' },
      ];
      setEmployees(mockData);
    } catch (err) {
      setError('Failed to fetch employees');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setShowForm(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  const handleFormSubmit = async (employeeData) => {
    try {
      if (selectedEmployee) {
        // Update existing employee
        // await employeeAPI.update(selectedEmployee.id, employeeData);
      } else {
        // Add new employee
        // await employeeAPI.create(employeeData);
      }
      fetchEmployees();
      setShowForm(false);
    } catch (err) {
      console.error('Error saving employee:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-neutral-800">Employee Management</h2>
        <Button 
          onClick={handleAddEmployee} 
          variant="primary"
        >
          Add Employee
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      )}

      {showForm ? (
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <EmployeeList
          employees={employees}
          onEdit={handleEditEmployee}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default EmployeeManager;