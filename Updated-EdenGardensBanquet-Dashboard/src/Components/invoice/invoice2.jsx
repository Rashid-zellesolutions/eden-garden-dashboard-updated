import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

class PDFGenerator extends React.Component {
  generatePDF = () => {
    const doc = new jsPDF();
    // Create a new jsPDF instance
    const tableData = [
        ['Name', 'Color','Unit Price','Qty', 'Total Price'],
        ['Table Top', 'red', 10,30,300],
        ['Backdrops', 'blue', 20,30,600],
        ['Furniture', 'green', 30,30,900],
        ['Table Top', 'red', 10,30,300],
        ['Backdrops', 'blue', 20,30,600],
        ['Furniture', 'green', 30,30,900],
        ['Table Top', 'red', 10,30,300],
        ['Backdrops', 'blue', 20,30,600],
        ['Furniture', 'green', 30,30,900],
        ['Table Top', 'red', 10,30,300],
        ['Backdrops', 'blue', 20,30,600],
        ['Furniture', 'green', 30,30,900],
        ['Table Top', 'red', 10,30,300],
        ['Backdrops', 'blue', 20,30,600],
        ['Furniture', 'green', 30,30,900],
        ['Table Top', 'red', 10,30,300],
        ['Backdrops', 'blue', 20,30,600],
        ['Furniture', 'green', 30,30,900],
        ['Table Top', 'red', 10,30,300],
        ['Backdrops', 'blue', 20,30,600],
        ['Furniture', 'green', 30,30,900],
        ['Table Top', 'red', 10,30,300],
        ['Backdrops', 'blue', 20,30,600],
        ['Furniture', 'green', 30,30,900],
      ];

      const headerStyles = {
        fillColor:255,
        textColor: [0,0,0],
        lineColor: [115, 102, 90], 
        lineWidth: [0, 0, 0.5, 0.5],
        fontStyle: 'normal',
        cellPadding: { top: 4, right: 2, bottom: 4, left: 2 },
      };
      
      headerStyles['styles'] = {
        fontSize: 8, 
      };
      // Set the row styles (optional)
      const rowStyles = {
        textColor: 0, // Black text color
        fontStyle: 'normal',
        cellPadding: { top: 4, right: 2, bottom: 4, left: 2 },
       
      };
        const columnStyles = {
            0: { // 'Name' column
            cellWidth: 80,
            lineWidth: [0, 0, 0.5, 0],
            },
            1: { // 'Color' column
            cellWidth: 40,
            lineWidth: [0, 0, 0.5, 0],
            },
            2: { // 'Quantity' column
            cellWidth: 20,
            lineWidth: [0, 0, 0.5, 0],
            },
            3: { // 'Unit Price' column
            cellWidth: 20,
            lineWidth: [0, 0, 0.5, 0],
            },
            4: { // 'Total Price' column
            cellWidth: 20,
            lineWidth: [0, 0, 0.5, 0],
            },
        };
    
      
      // Set the table options
      const tableOptions = {
        startY: 40, // Vertical position from the top of the page
        margin: { top: 10 }, // Top margin
        headStyles: headerStyles,
        bodyStyles: rowStyles,
        columnStyles:columnStyles
      };
    
      
    var fromHeaderTop = 45;
   
    doc.autoTable({
        head: [tableData[0]], // Use the first row as the header
        body: tableData.slice(1), // Exclude the header row from the body
        ...tableOptions,
        startX: 20, // Set the starting X-coordinate
        startY: fromHeaderTop+50,
      });


    // Header
   
   

    // Content
    const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    doc.setFontSize(12);
    doc.text(content, 20, 30);

    // Footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      // Go to page i
      doc.setPage(i);

      // Footer content
      const footer = `Page ${i} of ${totalPages}`
      const header = 'My Custom Header';
      doc.setFontSize(18);
      doc.text(header, 20, 20);
      doc.setFontSize(12);
      doc.text(footer, 20, doc.internal.pageSize.height - 10);
    }

    

    // Save the PDF
    doc.save('example.pdf');
  };

  render() {
    return (
      <div>
        <button onClick={this.generatePDF}>Generate PDF</button>
      </div>
    );
  }
}

export default PDFGenerator;
