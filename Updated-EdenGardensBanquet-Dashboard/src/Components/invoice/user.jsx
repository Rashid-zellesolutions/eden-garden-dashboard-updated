import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import '../../../src/font11.js';
import './invoice.css';


function User(data) {
    console.log(data);
    //   const Service = data?.Services[0]
    const generateSerialNumber = (() => {
        let count = 1;
        return () => count++;
    })();
    // const mergeConsecutiveSlots = (selectedSlot) => {
    //   const mergedSlots = [];
    //   let currentSlot = selectedSlot && selectedSlot[0];

    //   for (let i = 1; i < selectedSlot?.length; i++) {
    //     const currentTime = currentSlot.split(' - ')[1]; // Extract end time of current slot
    //     const nextTime = selectedSlot[i].split(' - ')[0]; // Extract start time of the next slot

    //     // Check if the next slot is consecutive to the current slot
    //     if (currentTime === nextTime) {
    //       currentSlot = `${currentSlot.split(' - ')[0]} - ${selectedSlot[i].split(' - ')[1]}`;
    //     } else {
    //       mergedSlots.push(currentSlot);
    //       currentSlot = selectedSlot[i];
    //     }
    //   }

    //   // Add the last slot
    //   mergedSlots.push(currentSlot);

    //   return mergedSlots;
    // };
    const mergeConsecutiveSlots = (selectedSlot) => {
        const mergedSlots = [];
        const sortedSlots = selectedSlot?.sort((a, b) => {
          const timeMap = {
            "08:00 AM - 10:00 AM": 1,
            "10:00 AM - 12:00 PM": 2,
            "12:00 PM - 02:00 PM": 3,
            "02:00 PM - 04:00 PM": 4,
            "04:00 PM - 06:00 PM": 5,
            "06:00 PM - 08:00 PM": 6,
          };
    
          return timeMap[a] - timeMap[b];
        });
        let currentSlot = sortedSlots && sortedSlots[0];
    
        for (let i = 1; i < sortedSlots?.length; i++) {
          const currentTime = currentSlot.split(' - ')[1]; // Extract end time of current slot
          const nextStartTime = sortedSlots[i].split(' - ')[0]; // Extract start time of the next slot
    
          // Check if the next slot is consecutive to the current slot
          if (currentTime === nextStartTime || (i + 1 < sortedSlots.length && currentTime === sortedSlots[i + 1].split(' - ')[0])) {
            currentSlot = `${currentSlot.split(' - ')[0]} - ${sortedSlots[i].split(' - ')[1]}`;
          } else {
            // Format the slot and then check for consecutive slots
            mergedSlots.push(currentSlot);
            currentSlot = sortedSlots[i];
          }
        }
    
        // Add the last slot if it is consecutive
        if (currentSlot !== mergedSlots[mergedSlots.length - 1]) {
          mergedSlots.push(currentSlot);
        }
    
        return mergedSlots;
      };
      const customServicesForInvoice = data.custom?.filter(customService => customService.Invoice);
      const ServicesForInvoice = data.Services?.filter(service => service.Invoice);
      const filteredServices = [
        ['Sr.No', 'Name', 'Color', 'Unit Price', 'Qty', 'Total Price'],
    
        ...ServicesForInvoice.map((customService, index) => [
          generateSerialNumber(),
          customService.service,
          customService?.color,
          customService.price || 0,
          customService.qty || 0,
          customService.totalPrice || 0
        ]),
        ...customServicesForInvoice.map((customService, index) => [
          generateSerialNumber(),
          customService.name,
          customService.color,
          customService.price || 0,
          customService.qty || 0,
          customService.totalPrice || 0
        ]),
      ].filter(service => service.length > 0);
      console.log(filteredServices);
      const tableData = [
        filteredServices
      ];
    
      const headerStyles = {
        fillColor: 255,
        textColor: [0, 0, 0],
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
        cellPadding: { top: 2, right: 2, bottom: 2, left: 2 },
    
      };
      const columnStyles = {
        0: { // 'Total Price' column
          cellWidth: 20,
          lineWidth: [0, 0, 0.5, 0],
        },
        1: { // 'Name' column
          cellWidth: 60,
          lineWidth: [0, 0, 0.5, 0],
        },
        2: { // 'Color' column
          cellWidth: 40,
          lineWidth: [0, 0, 0.5, 0],
        },
        3: { // 'Quantity' column
          cellWidth: 20,
          lineWidth: [0, 0, 0.5, 0],
        },
        4: { // 'Unit Price' column
          cellWidth: 20,
          lineWidth: [0, 0, 0.5, 0],
        },
        5: { // 'Total Price' column
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
        columnStyles: columnStyles
      };
    
    
      var fromHeaderTop = 30;
      const doc = new jsPDF();
      // doc.
      // doc.addFileToVFS('font1.ttf', font1);
      // doc.addFont('font1.ttf','normal');
      const totalPages = doc.internal.getNumberOfPages();
    
      const headerImage = new Image();
      headerImage.src = '/header.jpg';
    
      const footerImage = new Image();
      footerImage.src = '/footer.jpg';
    
      const header = (pageNumber) => {
        doc.setPage(pageNumber);
        doc.addImage(headerImage, 'JPEG', 0, 0, doc.internal.pageSize.width - 7, 20);
      };
    
      const footer = (pageNumber) => {
        doc.setPage(pageNumber);
        doc.addImage(footerImage, 'JPEG', 0, doc.internal.pageSize.height - 10, doc.internal.pageSize.width, 10);
      };
    
    
    
      //   console.log('show all font in jspdf',doc.getfontlist());
      //header 40
    
      // Footer
    
    
    
      // doc.setFont("helvetica",'bold');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      // doc.addFont('PoppinsBold.ttf','bold');
      doc.setFont("helvetica", 'bold');
      doc.text("Customer Information", 10, fromHeaderTop );
    
      // doc.setFont("helvetica");
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", 'regular');
      doc.text( `${data.firstName} ${data.lastName}\n1444 Route 73, Pennsauken, NJ 08110 ${data.city}\n${data.phone}\n${data.email}`, 10, fromHeaderTop + 5);
    
    
      const startX = (doc.internal.pageSize.getWidth()) / 2;
    
      // doc.setTextColor(0, 0, 0);
      // doc.setFontSize(28);
      // doc.setFont("helvetica", 'bold');
      // doc.text("INVOICE", 10, fromHeaderTop - 20);
    
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", 'regular');
      doc.text("Invoice No.", 10, fromHeaderTop - 12);
    
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", 'regular');
      doc.text(data?.inv, 40, fromHeaderTop - 12);
    
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", 'regular');
      doc.text("Invoice Date       :", 10, fromHeaderTop - 7);
    
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", 'regular');
      doc.text(dayjs(data?.createdAt).format("YYYY-MM-DD"), 40, fromHeaderTop - 7);
    
      // // doc.setFont("helvetica");
      // doc.setTextColor(0, 0, 0);
      // doc.setFontSize(12);
      // doc.setFont("helvetica", 'bold');
      // doc.text("Bill To", startX + 30, fromHeaderTop + 16);
    
      // doc.setFont("helvetica");
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", 'regular');
      doc.text("EDEN GARDENS BANQUET\n1444 Route 73, Pennsauken, NJ\n08110, United States, New Jersey\n+1 800-372-7066\nedengardensbanquet@gmail.com", startX + 45, fromHeaderTop-7);
    
    
      doc.setFillColor(236, 211, 189);
      doc.setDrawColor(0, 0, 0);
      doc.rect(10, fromHeaderTop + 27, doc.internal.pageSize.getWidth() - 20, 10, 'FD');
    
    
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.setFont("helvetica", 'bold');
      doc.text("EVENT DETAILS", 15, fromHeaderTop + 33.5);
    
    
    
    
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.setFont("helvetica", 'regular');
      doc.text("VENUE NAME", 12, fromHeaderTop + 44);
    
    
      doc.setFontSize(8);
      doc.text(":", 35, fromHeaderTop + 44);
    
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text(`${data.venue}`, 42, fromHeaderTop + 44);
    
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text(`EVENT DATE`, 12, fromHeaderTop + 49);
    
      doc.setFontSize(8);
      doc.text(":", 35, fromHeaderTop + 49);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text(`${data.selectedDate}`, 42, fromHeaderTop + 49);
    
    //   doc.setTextColor(0, 0, 0);
    //   doc.setFontSize(8);
    //   doc.text(`${mergeConsecutiveSlots(data.selectedSlot).join(", ")}`, 42, fromHeaderTop + 49);
    
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text("CAPACITY", 12, fromHeaderTop + 54);
    
      doc.setFontSize(8);
      doc.text(":", 35, fromHeaderTop + 54);
    
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text(data.capacity ? data?.capacity?.toString() : "0", 42, fromHeaderTop + 54);




    //   doc.setTextColor(0, 0, 0);
    //   doc.setFontSize(8);
    //   doc.text("BOOKING DATE", 12, fromHeaderTop + 59);
    
    //   doc.setFontSize(8);
    //   doc.text(":", 35, fromHeaderTop + 59);
    
    //   doc.setTextColor(0, 0, 0);
    //   doc.setFontSize(8);
    //   doc.text(dayjs(data?.createdDate).format("YYYY-MM-DD"), 42, fromHeaderTop + 59);

      
    
    
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text("NO. OF PERSONS    :", startX + 2, fromHeaderTop + 44);
    
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text(`${data.maxPerson}`, startX + 32, fromHeaderTop + 44);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text(`TIME SLOT     :`, startX + 2, fromHeaderTop + 49);
    
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text(`${mergeConsecutiveSlots(data.selectedSlot).join(", ")}`, startX + 32, fromHeaderTop + 49);
    
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text(`TYPE OF EVENT     :`, startX + 2, fromHeaderTop + 54);
    
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text(`${data.eventType}`, startX + 32, fromHeaderTop + 54);
    
      var startY = fromHeaderTop + 90;
    
      doc.autoTable({
        // head: [filteredServices[0]], // Use the first row as the header
        // body: filteredServices.slice(1), // Exclude the header row from the body
        // ...tableOptions,
        // startX: 20, // Set the starting X-coordinate
        startY: fromHeaderTop + 60,
      });
    
    
    
    
      const tableHeight = doc.lastAutoTable.finalY;
      const tableWidth = doc.lastAutoTable.finalX;
    
      const rectWidth = 60;
      const rectHeight = 10;
    
      doc.setDrawColor(0, 0, 0); // Black line color
    
      // Set the line width
      doc.setLineWidth(0.3); // 1 unit width (you can adjust this)

    // Draw a line

    //   doc.line(12, tableHeight + 2, 198, tableHeight + 2); // (x1, y1, x2, y2)
    // Draw the rectangle



    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", 'bold');
    doc.text("Paid Amount", 11, tableHeight + 7);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", 'regular');
    doc.text(`$ ${data?.paidAmount.toString()}`, 42, tableHeight + 7);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", 'bold');
    doc.text("Balance Amount:",  startX + 2, tableHeight + 7);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", 'regular');
    doc.text(`$ ${data?.balance.toString()}`, startX + 38, tableHeight + 7);



    // doc.line(12, tableHeight + 15, 198, tableHeight + 15); // (x1, y1, x2, y2)



    const text1Width = doc.getTextWidth("Hello, Custom Font!");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", 'bold');
    doc.text("SUB TOTAL", startX + 32, tableHeight + 20);

    doc.line(startX + 20, tableHeight + 23, 198, tableHeight + 23);




    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", 'bold');
    doc.text(`$ ${data.summary.subTotal.toString()}`, startX + text1Width + 40, tableHeight + 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", 'bold');
    doc.text("TIP", startX + 32, tableHeight + 30);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", 'regular');
    doc.text(data.summary.tipType?.toString() === "%" ? `${data.summary.tip?.toString()} %` : `$ ${data.summary.tip?.toString()}`, startX + text1Width + 40, tableHeight + 30);


    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", 'bold');
    doc.text(`TAX`, startX + 32, tableHeight + 37);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", 'regular');
    doc.text(`${data.summary.tax} %`, startX + text1Width + 40, tableHeight + 37);


    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", 'bold');
    doc.text("Discount", startX + 32, tableHeight + 44);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", 'regular');
    doc.text(data.summary.discountType === "%" ? `${data.summary.discount?.toString()} %` : `$ ${data.summary.discount?.toString()}`, startX + text1Width + 40, tableHeight + 44);

    doc.line(startX + 20, tableHeight + 50, 198, tableHeight + 50);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", 'bold');
    doc.text("Total", startX + 32, tableHeight + 55);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", 'bold');
    doc.text(`$ ${data.summary.total.toString()}`, startX + text1Width + 40, tableHeight + 55);


    //    // doc.setFont("helvetica");
    //    doc.setFontSize(8);
    //    doc.setTextColor(0, 0, 0); 
    //    doc.text("+92 317 1707283",startX+30,tableHeight+15);


    doc.rect(10, tableHeight + 15, startX - 10, 40);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text("PAYMENT TERMS:", 15, tableHeight + 22);


    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text("BANK TRANSFER:", 15, tableHeight + 40);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", 'regular');
    doc.text("BANK DETAILS", 15, tableHeight + 45);


    const stamp = new Image();
    stamp.src = data.Status === "Confirmed" ? '/confirmed.jpeg' : data.Status === "Cancelled" ? '/cancelled.jpeg' : data.Status === "Hold" ? '/hold.jpeg' : data.Status === "In Process" ? "/hold.jpeg" : '/confirmed.jpeg';
    doc.addImage(stamp, 'JPEG', 70, tableHeight + 19.5, 30, 30);




    for (let i = 1; i <= doc.internal.getNumberOfPages(); i++) {
        // Go to page i
        doc.setPage(i);

        // Footer content
        //  const footer = `Page ${i} of ${doc.internal.getNumberOfPages()}`
        doc.setFontSize(12);
        // doc.text(footer, 20, doc.internal.pageSize.height - 10);
        header(i);
    }



    // Footer
    for (let i = 1; i <= doc.internal.getNumberOfPages(); i++) {
        // Go to page i
        doc.setPage(i);

        // Footer content
        //  const footer = `Page ${i} of ${doc.internal.getNumberOfPages()}`
        doc.setFontSize(12);
        // doc.text(footer, 20, doc.internal.pageSize.height - 10);
        footer(i);
    }




    // doc.save("a4.pdf");

    const pdfBlob = doc.output('blob');

    // Create a blob URL for the PDF
    const pdfBlobUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new tab
    window.open(pdfBlobUrl, '_blank');


    // return <>
    //   <button onClick={renderFn}>Download PDF</button>
    //   <div ref={targetRef} className="invoice">

    //     <div className="invHeader">

    //     </div>
    //   </div>
    // </>
}

export default User;