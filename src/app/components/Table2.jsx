import React from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Table2({ formatedData }) {

    // FORM 10 CODE 

    const headerRows = [
        [
            { content: 'Form 10\n[See Rule 12 (1)]\nMaternity Benefit Register\nThe Maharashtra Maternity Benefit Rules, 1965', colSpan: 6, rowSpan: 1, styles: { halign: 'center', valign: "middle" } },
        ],
        [
            { content: "Name and address of the Establishment", colSpan: 2, rowSpan: 1, styles: { valign: "middle" } },
            { content: "M/s. AQM Technologies Pvt. Ltd.401, Raheja Plaza, Lal Bahadur Shastri Marg, Nityanand Nagar, Ghatkopar West, Mumbai, Maharashtra -400086.", colSpan: 4, rowSpan: 1 }
        ],
        [
            { content: "1", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "S.No", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "10057", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        ],
        [
            { content: "2", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "Name of the woman", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "MS. KAVITA WAKHAREYA", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        ],
        [
            { content: "3", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "Date of appointment", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "17-03-2015", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        ],
        [
            { content: "4", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "Department in which employed", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        ],
        [
            { content: "5", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "Nature of work", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "SUBJECT MATTER EXPERT", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        ],
        [
            { content: "6", colSpan: 1, rowSpan: 14, styles: { halign: "center", valign: "middle" } },
            { content: "Dates (with month and year) on which she is laid off and not employed", colSpan: 5, rowSpan: 1, styles: { valign: "middle" } }
        ],
        [
            { content: "Month & Year", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "No. of days employed", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "No. of days laid off", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "Not employed", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "Remarks", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
        ],
        [
            { content: "January-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
        ],


    ];

    const Item = formatedData?.map((item) => Object.values(item))

    const generatePdf = () => {

        const doc = new jsPDF();

        const peopleData = [
            { "S.No": '10057', "Name of the woman": 'MS. KAVITA WAKHAREYA', City: 'New York' },
            { "S.No": '10078', "Name of the woman": 'MS. SHITAL AHER', City: 'Mumbai' },
            // Add more people as needed
        ]

        peopleData.forEach((person, index) => {
            if (index > 0) {
                doc.addPage();
            }

            const personDataArray = Object.entries(person).map((item, i) => [i + 1, item[0], item[1]]);

            doc.autoTable({
                body: personDataArray,
                theme: 'striped',
                styles: { fontSize: 12 },
                margin: { top: 20 },
                columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' } },
            });
        });

        doc.save('my-table.pdf');
    }


    return (
        <div className='w-max mx-auto '>

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
    )
}
