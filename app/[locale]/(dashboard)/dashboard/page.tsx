'use client';

import {useAuth} from '@/contexts/AuthContext';
import {useEffect, useState} from 'react';
import {statsApi, type DashboardStats} from '@/lib/api/stats';
import styles from './DashboardOverview.module.css';

export default function DashboardOverview() {
  const {user, loading: authLoading} = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await statsApi.getDashboard();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
      setError('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchStats();
    }
  }, [authLoading]);

  if (authLoading || loading) {
    return (
      <div className={styles.loadingState}>
        <div>Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <div className={styles.errorIcon}>⚠️</div>
        <div className={styles.errorText}>{error}</div>
        <button onClick={fetchStats} className={styles.retryButton}>
          Retry
        </button>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className={styles.loadingState}>
        <div>No data available</div>
      </div>
    );
  }

  const roleColors: Record<string, string> = {
    ADMIN: 'badgeRed',
    EDITOR: 'badgePurple',
    CLIENT: 'badgeBlue',
    GUEST: 'badgeGray',
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome back, {user?.name}</h1>
        <p className={styles.subtitle}>
          Here&apos;s an overview of your dashboard activity and statistics
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className={styles.statsGrid}>
        {/* Total Users */}
        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <span className={styles.statLabel}>Total Users</span>
            <div className={`${styles.statIcon} ${styles.statIconBlue}`}>👥</div>
          </div>
          <div className={styles.statValue}>{stats.users.total.toLocaleString()}</div>
          <div className={styles.statTrend}>
            <span className={styles.trendPositive}>
              <span className={styles.trendIcon}>↑</span>
              {stats.users.growthPercentage}%
            </span>
            <span style={{color: '#6b7280'}}>in last 30 days</span>
          </div>
        </div>

        {/* Total Messages */}
        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <span className={styles.statLabel}>Total Messages</span>
            <div className={`${styles.statIcon} ${styles.statIconGreen}`}>💬</div>
          </div>
          <div className={styles.statValue}>{stats.messages.total.toLocaleString()}</div>
          <div className={styles.statTrend}>
            <span className={styles.trendPositive}>
              <span className={styles.trendIcon}>↑</span>
              {stats.messages.growthPercentage}%
            </span>
            <span style={{color: '#6b7280'}}>in last 30 days</span>
          </div>
        </div>

        {/* New Messages */}
        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <span className={styles.statLabel}>New Messages</span>
            <div className={`${styles.statIcon} ${styles.statIconOrange}`}>📩</div>
          </div>
          <div className={styles.statValue}>{stats.messages.new.toLocaleString()}</div>
          <div className={styles.statTrend}>
            <span className={styles.trendNeutral}>Requires attention</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <span className={styles.statLabel}>Recent Users</span>
            <div className={`${styles.statIcon} ${styles.statIconPurple}`}>⭐</div>
          </div>
          <div className={styles.statValue}>{stats.users.recent.toLocaleString()}</div>
          <div className={styles.statTrend}>
            <span className={styles.trendNeutral}>Last 30 days</span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className={styles.detailsGrid}>
        {/* Messages by Status */}
        <div className={styles.detailCard}>
          <h3 className={styles.detailCardTitle}>Messages by Status</h3>
          <div className={styles.detailList}>
            <div className={styles.detailItem}>
              <div className={styles.detailItemLabel}>
                <span className={`${styles.detailItemBadge} ${styles.badgeYellow}`}></span>
                <span>New</span>
              </div>
              <span className={styles.detailItemValue}>{stats.messages.new}</span>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailItemLabel}>
                <span className={`${styles.detailItemBadge} ${styles.badgeBlue}`}></span>
                <span>Read</span>
              </div>
              <span className={styles.detailItemValue}>{stats.messages.read}</span>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailItemLabel}>
                <span className={`${styles.detailItemBadge} ${styles.badgeGreen}`}></span>
                <span>Replied</span>
              </div>
              <span className={styles.detailItemValue}>{stats.messages.replied}</span>
            </div>
          </div>
        </div>

        {/* Users by Role */}
        <div className={styles.detailCard}>
          <h3 className={styles.detailCardTitle}>Users by Role</h3>
          <div className={styles.detailList}>
            {Object.entries(stats.users.byRole).map(([role, count]) => (
              <div key={role} className={styles.detailItem}>
                <div className={styles.detailItemLabel}>
                  <span className={`${styles.detailItemBadge} ${roleColors[role] || styles.badgeGray}`}></span>
                  <span>{role}</span>
                </div>
                <span className={styles.detailItemValue}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Messages by Service (if available) */}
        {Object.keys(stats.messages.byService).length > 0 && (
          <div className={styles.detailCard}>
            <h3 className={styles.detailCardTitle}>Messages by Service</h3>
            <div className={styles.detailList}>
              {Object.entries(stats.messages.byService).map(([service, count], index) => {
                const badges = [styles.badgeBlue, styles.badgeGreen, styles.badgePurple, styles.badgeYellow];
                const badgeColor = badges[index % badges.length];
                
                return (
                  <div key={service} className={styles.detailItem}>
                    <div className={styles.detailItemLabel}>
                      <span className={`${styles.detailItemBadge} ${badgeColor}`}></span>
                      <span>{service}</span>
                    </div>
                    <span className={styles.detailItemValue}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
