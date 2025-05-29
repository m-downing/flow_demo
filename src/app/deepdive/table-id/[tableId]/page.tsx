'use client';

import React, { useState, useEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { TableView, ListView, ColumnDef } from '../../../../design-system/tabularData';
import { useTheme } from '../../../contexts/ThemeContext';
import { colors } from '../../../../design-system/foundations/tokens/colors';
import { getTypography } from '../../../../design-system/foundations/tokens/typography';

interface DeepDivePageProps {
  params: Promise<{
    tableId: string;
  }>;
}

export default function DeepDivePage({ params }: DeepDivePageProps) {
  const resolvedParams = use(params);
  const { tableId } = resolvedParams;
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [tableData, setTableData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Try to get data from sessionStorage using the session key
      const sessionKey = searchParams.get('sessionKey');
      
      if (sessionKey) {
        const storedData = sessionStorage.getItem(sessionKey);
        if (storedData) {
          const tableData = JSON.parse(storedData);
          setTableData(tableData);
          setLoading(false);
          
          // Clean up the session data after a short delay to free memory
          setTimeout(() => {
            sessionStorage.removeItem(sessionKey);
          }, 1000);
        } else {
          setError('Table data not found in session. The link may have expired.');
          setLoading(false);
        }
      } else {
        // Fallback: Try to get data from URL params (for backward compatibility)
        const encodedData = searchParams.get('data');
        
        if (encodedData) {
          const decodedData = JSON.parse(decodeURIComponent(encodedData));
          setTableData(decodedData);
          setLoading(false);
        } else {
          // In a real app, you would fetch data from your API using the tableId
          // For now, we'll show a message to fetch from your data source
          setError('No table data found. In a production app, this would fetch data from your API using the table ID.');
          setLoading(false);
        }
      }
    } catch (err) {
      setError('Failed to load table data');
      setLoading(false);
    }
  }, [searchParams]);

  const containerStyle: React.CSSProperties = {
    height: 'calc(100vh - 80px)', // Use more of the viewport height
    display: 'flex',
    flexDirection: 'column',
    fontFamily: getTypography.fontFamily('body'),
    backgroundColor: isDark ? colors.primary[800] : colors.neutral[50],
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '24px 32px', // Add top margin and horizontal margins
    boxShadow: isDark ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: isDark ? colors.primary[800] : colors.neutral[100],
    borderBottom: `1px solid ${isDark ? colors.primary[600] : colors.neutral[200]}`,
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyle: React.CSSProperties = {
    color: isDark ? colors.neutral[50] : colors.neutral[900],
    fontSize: '24px',
    fontWeight: '700',
    margin: 0,
  };

  const tableContainerStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'hidden',
    padding: '0',
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <p style={{ color: isDark ? colors.neutral[300] : colors.neutral[600], fontSize: '18px' }}>
            Loading table data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Deep Dive Table View</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div style={{ textAlign: 'center', maxWidth: '500px', padding: '24px' }}>
            <p style={{ color: isDark ? colors.neutral[300] : colors.neutral[600], fontSize: '16px', marginBottom: '16px' }}>
              {error}
            </p>
            <p style={{ color: isDark ? colors.neutral[400] : colors.neutral[500], fontSize: '14px' }}>
              Table ID: {tableId}
            </p>
            <p style={{ color: isDark ? colors.neutral[400] : colors.neutral[500], fontSize: '14px', marginTop: '16px' }}>
              To implement this fully, connect your GraphQL/SQL data source to fetch table data by ID.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!tableData) {
    return (
      <div style={containerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <p style={{ color: isDark ? colors.neutral[300] : colors.neutral[600] }}>No table data available</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header with title and advanced filtering */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>{tableData.title || `Table ${tableId}`}</h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Advanced filtering controls would go here */}
          <button
            style={{
              backgroundColor: isDark ? colors.primary[600] : colors.primary[500],
              color: colors.neutral[50],
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
            onClick={() => window.close()}
          >
            Close
          </button>
        </div>
      </div>

      {/* Full table container */}
      <div style={tableContainerStyle}>
        {tableData.renderItem || !tableData.columns ? (
          // ListView for list-style data or when no columns are defined
          <ListView
            data={tableData.data}
            mode="deepDive"
            renderItem={tableData.renderItem || ((item: any, index: number) => (
              <div style={{ padding: '8px' }}>
                <pre style={{ 
                  margin: 0, 
                  fontSize: '12px', 
                  color: isDark ? colors.neutral[300] : colors.neutral[700],
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {JSON.stringify(item, null, 2)}
                </pre>
              </div>
            ))}
            height={undefined} // Let it take full height
            showModeToggle={false} // No mode toggle needed on Deep Dive page
          />
        ) : (
          // TableView for tabular data
          <TableView
            data={tableData.data}
            columns={tableData.columns}
            mode="deepDive"
            filters={tableData.filters}
            sortConfig={tableData.sortConfig}
            height={undefined} // Let it take full height
            showModeToggle={false} // No mode toggle needed on Deep Dive page
          />
        )}
      </div>
    </div>
  );
} 