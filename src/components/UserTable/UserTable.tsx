import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { fetchUsers, setFilter } from '../../redux/features/userSlice';
import CustomInput from '../Input/CustomInput';
import './UserTable.scss';

const UserTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.filteredUsers);
  const filters = useAppSelector((state) => state.users.filters);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    dispatch(setFilter({ field, value }));
  };

  return (
    <div className="user-table-container">
      <div className="user-table-frame">
        <h1>User Information</h1>

        <div className="search-fields">
          <CustomInput
            placeholder="Search by name"
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
          />
          <CustomInput
            placeholder="Search by username"
            value={filters.username}
            onChange={(e) => handleFilterChange('username', e.target.value)}
          />
          <CustomInput
            placeholder="Search by email"
            value={filters.email}
            onChange={(e) => handleFilterChange('email', e.target.value)}
          />
          <CustomInput
            placeholder="Search by phone"
            value={filters.phone}
            onChange={(e) => handleFilterChange('phone', e.target.value)}
          />
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
