import React, { useEffect } from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function NestedTable({ formatedData }) {

    const headerRows = [
        [
            { content: 'Form 10\n[See Rule 12 (1)]\nMaternity Benefit Register\nThe Maharashtra Maternity Benefit Rules, 1965', colSpan: 6, rowSpan: 1, styles: { halign: 'center', valign: "middle" } },
        ],
        [
            { content: "Name and address of the Establishment", colSpan: 2, rowSpan: 1, styles: { valign: "middle" } },
            { content: "M/s. AQM Technologies Pvt. Ltd.401, Raheja Plaza, Lal Bahadur Shastri Marg, Nityanand Nagar, Ghatkopar West, Mumbai, Maharashtra -400086.", colSpan: 4, rowSpan: 1 }
        ],
        // [
        //     { content: "1", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "S.No", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "10057", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
        // [
        //     { content: "2", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "Name of the woman", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "MS. KAVITA WAKHAREYA", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
        // [
        //     { content: "3", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "Date of appointment", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "17-03-2015", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
        // [
        //     { content: "4", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "Department in which employed", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
        // [
        //     { content: "5", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "Nature of work", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "SUBJECT MATTER EXPERT", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
        // [
        //     { content: "6", colSpan: 1, rowSpan: 14, styles: { halign: "center", valign: "middle" } },
        //     { content: "Dates (with month and year) on which she is laid off and not employed", colSpan: 5, rowSpan: 1, styles: { valign: "middle" } }
        // ],
        // [
        //     { content: "Month & Year", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "No. of days employed", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "No. of days laid off", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "Not employed", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "Remarks", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
        // ],
        // [
        //     { content: "7", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "Total days employed in the year", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
        // [
        //     { content: "8", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "Date on which woman gives payment period", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
        // [
        //     { content: "9", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "Date of birth of child", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
        // [
        //     { content: "10", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "Date of production of proof of pregnancy under section 6 of the maternity Benefit Act 1961", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
        // [
        //     { content: "11", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "Date of production of proof of delivery/miscarriage/death", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
        // [
        //     { content: "12", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "Where the Maternity benefit delivery, the date on which is paid in advance before it is paid and the amount thereof", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
        // [
        //     { content: "13", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "Date on which subsequent payment of Maternity benefit is made and the amount thereof", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
        // [
        //     { content: "14", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "Where the medical bonus is paid, the date on which it is paid and the amount thereof", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
        // [
        //     { content: "15", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "Date on which wages on account of leave are paid and the amount thereof", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
        // [
        //     { content: "16", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "Name of the person nominated by the woman", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
        // [
        //     { content: "17", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "If the woman dies, the date of her death, the name of the person to whom Maternity benefit and/or other amount was paid, the amount thereof, and the date of payment", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
        // [
        //     { content: "18", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "If the woman dies and the child survives the name of the person to whom the amount of Maternity benefit was paid on behalf of the child and period for which it was paid", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
        // [
        //     { content: "19", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
        //     { content: "Remarks column for the use of Inspector", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
        //     { content: "", colSpan: 4, rowSpan: 1, styles: { valign: "middle" } },
        // ],
    ];

    const nestedTableData = [
        [
            { content: "January-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
        ],
        [
            { content: "February-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
        ],
        [
            { content: "March-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
        ],
        [
            { content: "April-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
        ],
        [
            { content: "May-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
        ],
        [
            { content: "June-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
        ],
        [
            { content: "July-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
        ],
        [
            { content: "August-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
        ],
        [
            { content: "September-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
        ],
        [
            { content: "October-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
        ],
        [
            { content: "November-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
        ],
        [
            { content: "December-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
            { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
            { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
        ],

    ];

    const generatePdf1 = () => {
        const doc = new jsPDF();

        const peopleData = [
            { "S.No": '10057', "Name of the woman": 'MS. KAVITA WAKHAREYA', "Date of appointment": '17-03-2015', "Department in which employed": "", "Nature of work": "SUBJECT MATTER EXPERT", "Total days employed in the year": "20", "Date on which woman gives payment period": "8-8-2023", "Date of birth of child": "", "Date of production of proof of pregnancy under section 6 of the maternity": "", "Date of production of proof of delivery/miscarriage/death": "", "Where the Maternity benefit delivery, the date on which is paid in advance": "", "Date on which subsequent payment of Maternity benefit is made and the": "", "Where the medical bonus is paid, the date on which it is paid and the amount": "", "Date on which wages on account of leave are paid and the amount thereof": "", "Name of the person nominated by the woman": "", "If the woman dies, the date of her death, the name of the person to whom Maternity benefit and/or other amount was paid, the amount thereof, and the date of payment": "", "If the woman dies and the child survives the name of the person to whom the amount of Maternity benefit was paid on behalf of the child and period for which it was paid": "", "Remarks column for the use of Inspector": "" },
            { "S.No": '10078', "Name of the woman": 'MS. SHITAL AHER', "Date of appointment": '01-07-2015', "Department in which employed": "", "Nature of work": "MANAGER- FARM SOLUTIONS", "Total days employed in the year": "15", "Date on which woman gives payment period": "25-8-2023", "Date of birth of child": "", "Benefit Act 1961": "", "12 Where the Maternity benefit delivery, the date on which is pai": "", "before it is paid and the amount thereof": "", "amount thereof": "", "thereof": "", "Date on which wages on account of leave are paid and the amount thereof": "", "Name of the person nominated by the woman": "", "If the woman dies, the date of her death, the name of the person to whom Maternity benefit and/or other amount was paid, the amount thereof, and the date of payment": "", "If the woman dies and the child survives the name of the person to whom the amount of Maternity benefit was paid on behalf of the child and period for which it was paid": "", "Remarks column for the use of Inspector": "" },
        ]

        peopleData.forEach((person, index) => {
            if (index > 0) {
                doc.addPage();
            }
            const personDataArray = Object.entries(person).map((item, i) => {

                if (i <= 4) {
                    return [
                        { content: `${i + 1}`, colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                        { content: `${item[0]}`, colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
                        { content: `${item[1]}`, colSpan: 4, rowSpan: 1, styles: { valign: "middle" } }
                    ]
                }
                if (i >= 5) {
                    return [
                        { content: `${i + 2}`, colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                        { content: `${item[0]}`, colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
                        { content: `${item[1]}`, colSpan: 4, rowSpan: 1, styles: { valign: "middle" } }
                    ]
                }
            }
            );

            const data = [
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
                [
                    { content: "February-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
                    { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
                ],
                [
                    { content: "March-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
                    { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
                ],
                [
                    { content: "April-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
                    { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
                ],
                [
                    { content: "May-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
                    { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
                ],
                [
                    { content: "June-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
                    { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
                ],
                [
                    { content: "July-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
                    { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
                ],
                [
                    { content: "August-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
                    { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
                ],
                [
                    { content: "September-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
                    { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
                ],
                [
                    { content: "October-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
                    { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
                ],
                [
                    { content: "November-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
                    { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
                ],
                [
                    { content: "December-2023 ", colSpan: 1, rowSpan: 1, styles: { valign: "middle" } },
                    { content: "31", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "0", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } },
                    { content: "-", colSpan: 1, rowSpan: 1, styles: { halign: "center", valign: "middle" } }
                ],

            ]

            personDataArray.splice(5, 0, ...data)
            console.log(personDataArray)

            doc.autoTable({
                head: headerRows,
                body: personDataArray,
                theme: 'plain',
                styles: {
                    fontSize: 10,
                    lineWidth: 0.01,
                    lineColor: [0, 0, 0],
                    cellPadding: { left: 1.5, right: 1.5, top: 0.7, bottom: 0.3 }
                },
                margin: { top: 5, bottom: 10, left: 5, right: 5 },
                columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' } },
                didParseCell: function (data) {
                    if (data.section === 'head' && data.cell.text == "Name and address of the Establishment") {
                        data.cell.styles.fillColor = [0, 255, 255]
                    }
                }
            });
        });



        // doc.save('my-table.pdf');
    }

    const generatePdf = () => {
        const doc = new jsPDF();


        doc.save('nestedTableExample.pdf');
    }

    return (
        <div onClick={generatePdf1} className=' w-max mx-auto cursor-pointer py-2 px-4 bg-purple-500 text-white'>NestedTable</div>
    )
}
