import React, { useState, useEffect } from 'react';
import { adminAPI } from '../utils/api';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log('Fetching admin data...');
      const [statsRes, usersRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getAllUsers()
      ]);

      console.log('Stats response:', statsRes);
      console.log('Users response:', usersRes);

      if (statsRes.success) setStats(statsRes.stats);
      if (usersRes.success) setUsers(usersRes.users);
      
      console.log('Stats set to:', statsRes.success ? statsRes.stats : null);
      console.log('Users set to:', usersRes.success ? usersRes.users : null);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, username) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"?`)) {
      return;
    }

    try {
      const response = await adminAPI.deleteUser(userId);
      if (response.success) {
        alert('User deleted successfully');
        fetchData();
      } else {
        alert(response.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Delete user error:', error);
      alert('Failed to delete user');
    }
  };

  const handleToggleRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    
    if (!window.confirm(`Change user role to "${newRole}"?`)) {
      return;
    }

    try {
      const response = await adminAPI.updateUserRole(userId, newRole);
      if (response.success) {
        alert('User role updated successfully');
        fetchData();
      } else {
        alert(response.message || 'Failed to update role');
      }
    } catch (error) {
      console.error('Update role error:', error);
      alert('Failed to update role');
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="page admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p className="page-description">Manage users and view system statistics</p>

      <div className="admin-tabs">
        <button
          className={activeTab === 'stats' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
        <button
          className={activeTab === 'users' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab('users')}
        >
          Users Management
        </button>
      </div>

      {activeTab === 'stats' && stats && (
        <div className="admin-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
            <div className="stat-card">
              <h3>{stats.totalActivities}</h3>
              <p>Total Activities</p>
            </div>
            <div className="stat-card">
              <h3>{stats.totalMeals}</h3>
              <p>Total Meals</p>
            </div>
            <div className="stat-card">
              <h3>{stats.totalExercises}</h3>
              <p>Total Exercises</p>
            </div>
          </div>

          <div className="recent-users">
            <h3>Recent Users</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="users-management">
          <h3>All Users ({users.length})</h3>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="action-buttons">
                      <button
                        onClick={() => handleToggleRole(user.id, user.role)}
                        className="btn-small btn-primary"
                      >
                        {user.role === 'admin' ? 'Make User' : 'Make Admin'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id, user.username)}
                        className="btn-small btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
