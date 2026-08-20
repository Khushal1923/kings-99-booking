import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { exportToCSV, generatePDFReport } from '../utils/exportUtils';
import { Download, Upload, RotateCcw, FileSpreadsheet, FileText, FileJson } from 'lucide-react';

export const BackupRestoreTab = () => {
  const { cms, bookings, villas, exportDataJSON, importDataJSON, resetToDefaults } = useResort();

  const [importStatus, setImportStatus] = useState('');

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const success = importDataJSON(evt.target.result);
      if (success) {
        setImportStatus("✅ Data backup successfully restored!");
      } else {
        setImportStatus("❌ Failed to import JSON file. Please check file format.");
      }
    };
    reader.readAsText(file);
  };

  const handleExportExcel = () => {
    const excelData = bookings.map(b => ({
      'Booking Ref ID': b.id,
      'Guest Name': b.customerName,
      'Mobile Number': b.phone,
      'Email Address': b.email || 'N/A',
      'Villa Reserved': b.villaName,
      'Check-In Date': b.checkIn,
      'Check-Out Date': b.checkOut,
      'Guests Count': b.guests,
      'Total Tariff (INR ₹)': b.totalPrice,
      'Status': b.status,
      'Special Requests': b.specialRequests || 'None',
      'Booking Created At': b.createdAt
    }));
    exportToCSV(excelData, `kings_99_bookings_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleExportPDF = () => {
    generatePDFReport(cms, bookings, villas);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--text-dark)', fontWeight: 800 }}>
          💾 Data Export, Backup & PDF Reports
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Download customer reservations in Excel (.csv) format, print PDF executive reports, or export JSON system backups.
        </p>
      </div>

      {importStatus && (
        <div style={{
          background: importStatus.includes('✅') ? 'rgba(13, 92, 70, 0.12)' : 'rgba(220, 38, 38, 0.12)',
          border: `1px solid ${importStatus.includes('✅') ? '#0d5c46' : '#dc2626'}`,
          color: importStatus.includes('✅') ? '#0d5c46' : '#dc2626',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '0.9rem',
          fontWeight: 700
        }}>
          {importStatus}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {/* Excel Spreadsheet Export Card */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(13, 92, 70, 0.12)',
            color: '#0d5c46',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <FileSpreadsheet size={24} />
          </div>

          <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '8px', fontWeight: 700 }}>
            Download Excel Spreadsheet (.csv)
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
            Export all guest booking records, mobile numbers, tariffs, and dates into a formatted Excel CSV file.
          </p>

          <button onClick={handleExportExcel} className="btn-gold" style={{ width: '100%', justifyContent: 'center', background: '#0d5c46', color: '#fff' }}>
            <FileSpreadsheet size={18} /> Download Excel File (.csv)
          </button>
        </div>

        {/* PDF Report Export Card */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(197, 160, 89, 0.15)',
            color: 'var(--accent-gold-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <FileText size={24} />
          </div>

          <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '8px', fontWeight: 700 }}>
            Generate Printable PDF Report
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
            Generate a clean, styled executive PDF report with resort revenue summary and booking table.
          </p>

          <button onClick={handleExportPDF} className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
            <FileText size={18} /> Generate PDF Report
          </button>
        </div>

        {/* Full JSON System Backup Card */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(59, 130, 246, 0.12)',
            color: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <FileJson size={24} />
          </div>

          <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '8px', fontWeight: 700 }}>
            System JSON Backup & Restore
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
            Download complete system backup (villas, photos, CMS text, passwords) or restore from file.
          </p>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={exportDataJSON} className="btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}>
              <Download size={14} /> Export JSON
            </button>
            <label className="btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'center' }}>
              <Upload size={14} /> Restore
              <input type="file" accept=".json" onChange={handleFileImport} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        {/* Reset Card */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(220, 38, 38, 0.12)',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <RotateCcw size={24} />
          </div>

          <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '8px', fontWeight: 700 }}>
            Reset to Factory Defaults
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
            Clear local storage and restore initial defaults for Kings 99 Nashik.
          </p>

          <button
            onClick={() => {
              if (confirm("Are you sure you want to reset all data to initial defaults?")) {
                resetToDefaults();
                alert("Data reset to defaults!");
              }
            }}
            className="btn-danger"
            style={{ width: '100%', padding: '12px' }}
          >
            Reset All Data
          </button>
        </div>
      </div>
    </div>
  );
};
