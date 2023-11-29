import React from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Dynamictable({ formatedData }) {

    // THIS HAS THE CODE OF HEADER AND NEED TO WORK ON THIS A LIL MORE

    const generatePDF = () => {

        const doc = new jsPDF("landscape");

        const headerRows = [
            [
                { content: 'FORM\'B\'\n[See Rule 21]\nRegister of wages\nThe Bombay Labour Welfare fund Rules 1953', colSpan: 21, rowSpan: 1, styles: { halign: 'center', valign: "middle" } },
            ],
            [
                { content: "Name and address of the Establishment", colSpan: 9, rowSpan: 1, styles: { valign: "middle" } },
                { content: "M/s. AQM Technologies Pvt. Ltd.401, Raheja Plaza, Lal Bahadur Shastri Marg, Nityanand Nagar, Ghatkopar West, Mumbai, Maharashtra -400086.", colSpan: 12, rowSpan: 1 }
            ],
            [
                { content: "For the month of", colSpan: 9, rowSpan: 1 },
                { content: "May'2023", colSpan: 12, rowSpan: 1 }
            ],
            [
                { content: "S.no.", colSpan: 1, rowSpan: 2, styles: { halign: "center", valign: 'middle' } },
                { content: "Name of the Employee", colSpan: 1, rowSpan: 2, styles: { halign: "center", valign: 'middle' } },
                { content: "Ticket & Badge No", colSpan: 1, rowSpan: 2, styles: { halign: "center", valign: 'middle' } },
                { content: "Occupation", colSpan: 1, rowSpan: 2, styles: { halign: "center", valign: 'middle' } },
                { content: "Amount Payable during the month", colSpan: 5, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "Amount Deducted during the month", colSpan: 3, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "Amount actually paid during the month", colSpan: 5, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "Balance due to the employee", colSpan: 4, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
            ],
            [
                { content: "Basic Wages 1", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "Over Time 1", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "D.A & other allow. 1", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "Bonus 1", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "Total Amount Payable", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "Fines", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "Other Deductions", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "Total Amount Deducted", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "Basic Wages 2", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "Over Time 2", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "D.A & other allow. 2", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "Bonus 2", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "Total Amount Paid", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "Basic Wages", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "Over Time", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "Bonus", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
                { content: "D.A & other allow.", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: 'middle' } },
            ]
        ];

        const columnStyles = {};

        for (let i = 0; i <= 21; i++) {
            if (i === 1 || i === 3) {
                columnStyles[i] = { halign: 'left', valign: "middle" }
            }
            else {
                columnStyles[i] = { halign: 'center', valign: "middle" };  // Apply the desired style to all columns
            }
        }

        function addFooter(pageNum, totalPages) {

            const pageWidth = 297; // A4 width in mm
            const pageHeight = 210; // A4 height in mm

            const leftText = "2023"
            const midText = `${pageNum} of ${totalPages}`
            const rightText = "AQM Maharshtra"

            const textWidthLeft = doc.getStringUnitWidth(leftText) * 10;
            const textWidthMid = doc.getStringUnitWidth(midText) * 10;
            const textWidthRight = doc.getStringUnitWidth(rightText) * 10;


            const centerAlign = (pageWidth - textWidthMid / 2) / 2
            const leftAlign = textWidthLeft / 2
            const rightAlign = pageWidth - (textWidthRight / 2)

            doc.setFontSize(7)
            doc.text(leftText, 15, 200)
            doc.text(midText, centerAlign, 200)
            doc.text(rightText, rightAlign, 200)

        }

        const tableData = {
            head: headerRows, // Header rows
            body: formatedData.map((item) => Object.values(item)), // Body rows
            startY: 10, // Adjust the vertical position as needed
            theme: 'plain',
            styles: {
                fontSize: 6,
                lineWidth: 0.01,
                lineColor: [0, 0, 0],

            },
            columnStyles: columnStyles,
        };

        doc.autoTable(tableData);

        const pageCount = doc.internal.getNumberOfPages()

        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            addFooter(i, pageCount)
        }

        doc.save('table.pdf');

    };

    return (
        <div className='mb-20'>
            <button onClick={generatePDF} >Generate PDF</button>
            <table id='mainTable' className='  text-[12px] border border-black '>
                <tbody>
                    <tr >
                        <th colSpan={21} className=' border border-black w-full  '>FORM'B' <br /> [See Rule 21] <br /> Register of wages <br /> The Bombay Labour Welfare fund Rules 1953</th>
                    </tr>
                    <tr className='text-left' >
                        <th colSpan={9} className=' border border-black' >Name and address of the Establishment</th>
                        <th colSpan={12} className=' border border-black' >M/s. AQM Technologies Pvt. Ltd. <br /> 401, Raheja Plaza, Lal Bahadur Shastri Marg, Nityanand Nagar, Ghatkopar West, Mumbai, Maharashtra -400086.</th>
                    </tr>
                    <tr className='text-left' >
                        <th colSpan={9} className=' border border-black' >For the month of</th>
                        <th colSpan={12} className=' border border-black' >May'2023</th>
                    </tr>
                    <tr className=''>
                        <th className=' border border-black' rowSpan={2}>S.no.</th>
                        <th className=' border border-black' rowSpan={2}>Name of the Employee</th>
                        <th className=' border border-black' rowSpan={2}>Ticket & Badge No</th>
                        <th className=' border border-black' rowSpan={2}>Occupation</th>
                        <th className=' border border-black' rowSpan={1} colSpan={5} >Amount Payable during the month</th>
                        <th className=' border border-black' rowSpan={1} colSpan={3} >Amount Deducted during the month</th>
                        <th className=' border border-black' rowSpan={1} colSpan={5} >Amount actually paid during the month</th>
                        <th className=' border border-black' rowSpan={1} colSpan={4} >Balance due to the employee</th>
                    </tr>
                    <tr className=''>
                        <th className=' border border-black' rowSpan={1}>Basic Wages</th>
                        <th className=' border border-black' rowSpan={1}>Over Time</th>
                        <th className=' border border-black' rowSpan={1}>D.A & other allow.</th>
                        <th className=' border border-black' rowSpan={1}>Bonus</th>
                        <th className=' border border-black' rowSpan={1}>Total Amount Payable</th>
                        <th className=' border border-black' rowSpan={1}>Fines</th>
                        <th className=' border border-black' rowSpan={1}>Other Deductions</th>
                        <th className=' border border-black' rowSpan={1}>Total Amount Deducted</th>
                        <th className=' border border-black' rowSpan={1}>Basic Wages</th>
                        <th className=' border border-black' rowSpan={1}>Over Time</th>
                        <th className=' border border-black' rowSpan={1}>D.A & other allow.</th>
                        <th className=' border border-black' rowSpan={1}>Bonus</th>
                        <th className=' border border-black' rowSpan={1}>Total Amount Paid</th>
                        <th className=' border border-black' rowSpan={1}>Basic Wages</th>
                        <th className=' border border-black' rowSpan={1}>Over Time</th>
                        <th className=' border border-black' rowSpan={1}>Bonus</th>
                        <th className=' border border-black' rowSpan={1}>D.A & other allow.</th>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}
