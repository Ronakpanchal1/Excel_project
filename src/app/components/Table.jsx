
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Table({ formatedData }) {

    // FORM C FULL CODE

    const headerRows = [
        [
            { content: 'Form C\n[See Rule 21]\nRegister of fines and unpaid accumulations for the year 2023\nThe Bombay Labour Welfare Fund Act and Rules, 1953', colSpan: 6, rowSpan: 1, styles: { halign: 'center', valign: "middle" } },
        ],
        [
            { content: "Name and address of the Establishment", colSpan: 2, rowSpan: 1, styles: { valign: "middle" } },
            { content: "M/s. AQM Technologies Pvt. Ltd.401, Raheja Plaza, Lal Bahadur Shastri Marg, Nityanand Nagar, Ghatkopar West, Mumbai, Maharashtra -400086.", colSpan: 4, rowSpan: 1 }
        ],
        [
            { content: "Sl.No", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "Details of fines and unpaid accumulations", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "Quarter ending 31st March", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "Quarter ending 30th June", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "Quarter ending 30th September", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "Quarter ending 31st December", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        ]

    ];

    const columnStyles = {};

    for (let i = 0; i <= 6; i++) {
        if (i === 1) {
            columnStyles[i] = { halign: 'left', valign: "middle" }
        }
        else {
            columnStyles[i] = { halign: 'center', valign: "middle" };
        }
    }

    const Item = formatedData?.map((item) => Object.values(item))

    const data = [
        ['1.', 'Total realizations under fines :'],
        ['2.', "Total amount bearing 'unpaid accumulations'* of :-"],
        ['(i)', "Basic wages"],
        ['(ii)', "Overtime"],
        ['(iii)', "Dearness allowance"],
        ['(iv)', "Other Allowance"],
        ['(v)', "Gratuity and "],
        ['(vi)', "Any Other item"],
        [{ content: 'Total of 1 and 2…', colSpan: 2, styles: { halign: "center" } }],
    ];

    const combinedData = data.map((row, index) => {
        return [...row, ...Item[index] || [""]];
    });

    console.log(combinedData)

    const generatePdf = () => {

        const doc = new jsPDF();

        const tableData = {
            head: headerRows,
            body: combinedData,
            theme: "plain",
            styles: {
                fontSize: 6,
                lineWidth: 0.01,
                lineColor: [0, 0, 0],
            },
            columnStyles: columnStyles,
        }

        doc.autoTable(tableData);

        doc.save('my-table.pdf');
    }

    return (
        <div className='w-max mx-auto mb-60 '>

            <button className='py-2 px-4 bg-purple-800 my-10 text-white' onClick={generatePdf}>Download</button>
            <table>
                <tbody>
                    {headerRows?.map((rows, i) => (
                        <tr key={i} className="border border-black">
                            {rows.map((header, index) => (
                                <th
                                    className="border border-black"
                                    key={index}
                                    colSpan={header.colSpan}
                                    rowSpan={header.rowSpan}
                                    style={{ textAlign: header.styles?.halign || 'left', verticalAlign: header.styles?.valign || 'middle' }}
                                >
                                    {index <= 1 ? <div style={{ whiteSpace: 'pre-line' }}>{header.content}</div> : <div>{header.content}</div>}
                                </th>
                            ))}
                        </tr>
                    ))}
                  
                </tbody>

            </table>
        </div>
    );
}


