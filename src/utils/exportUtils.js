// CSV / Excel Exporter Utility
export const exportToCSV = (data, filename = 'kings_99_data.csv') => {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  // Get keys from first object
  const headers = Object.keys(data[0]);

  // Construct CSV content
  const csvRows = [];
  csvRows.push(headers.join(',')); // Add header line

  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header] === null || row[header] === undefined ? '' : row[header];
      // Escape double quotes and enclose in quotes if contains commas or newlines
      const escaped = ('' + val).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// PDF Report Printer Utility
export const generatePDFReport = (cms, bookings, villas) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert("Please allow popups to generate the PDF report.");
    return;
  }

  const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED');
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  const reportHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Resort Report - ${cms.resortName}</title>
      <style>
        body { font-family: Arial, sans-serif; color: #111; padding: 30px; line-height: 1.5; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #d4af37; padding-bottom: 15px; margin-bottom: 20px; }
        .title { font-size: 24px; font-weight: bold; color: #0b1310; }
        .subtitle { font-size: 14px; color: #666; }
        .stats-grid { display: flex; gap: 20px; margin-bottom: 30px; }
        .stat-card { background: #f9f9f9; border: 1px solid #ddd; padding: 15px; border-radius: 8px; flex: 1; text-align: center; }
        .stat-val { font-size: 20px; font-weight: bold; color: #aa8620; margin-top: 5px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .status-confirmed { color: #10b981; font-weight: bold; }
        .status-pending { color: #f59e0b; font-weight: bold; }
        .footer { margin-top: 40px; text-align: center; font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 15px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="title">${cms.resortName}</div>
          <div class="subtitle">${cms.address} | Tel: ${cms.phone}</div>
        </div>
        <div style="text-align: right;">
          <div style="font-weight: bold;">Executive Booking Summary</div>
          <div class="subtitle">Generated: ${new Date().toLocaleDateString('en-IN')}</div>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div>Total Reservations</div>
          <div class="stat-val">${bookings.length} Bookings</div>
        </div>
        <div class="stat-card">
          <div>Confirmed Earnings</div>
          <div class="stat-val">₹${totalRevenue.toLocaleString('en-IN')}</div>
        </div>
        <div class="stat-card">
          <div>Active Villas</div>
          <div class="stat-val">${villas.length} Residences</div>
        </div>
      </div>

      <h3>Reservation Records Breakdown</h3>
      <table>
        <thead>
          <tr>
            <th>Ref ID</th>
            <th>Guest Name</th>
            <th>Mobile</th>
            <th>Villa</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Guests</th>
            <th>Tariff (₹)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${bookings.map(b => `
            <tr>
              <td><strong>${b.id}</strong></td>
              <td>${b.customerName}</td>
              <td>${b.phone}</td>
              <td>${b.villaName}</td>
              <td>${b.checkIn}</td>
              <td>${b.checkOut}</td>
              <td>${b.guests}</td>
              <td>₹${b.totalPrice.toLocaleString('en-IN')}</td>
              <td class="status-${b.status.toLowerCase()}">${b.status}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="footer">
        Confidential Management Report generated from ${cms.resortName} Owner Portal.
      </div>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(reportHTML);
  printWindow.document.close();
};
