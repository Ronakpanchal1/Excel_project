import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Handlebars from 'handlebars'

export default function Dynamictable2() {

    const [headers, setHeaders] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/reports/formQ.txt`)
                if (!res.ok) {
                    throw new Error('Network response was not ok')
                }

                const template = Handlebars.compile(await res.text())
                const data = {
                    company_name: 'AQM Technologies Pvt. Ltd.',
                    company_address: '401, Raheja Plaza, Lal Bahadur Shastri Marg, Nityanand Nagar, Ghatkopar West, Mumbai, Maharashtra - 400086.',
                    report_month: 'May 2023'
                }

                const htmlString = template(data)
                const result = await JSON.parse(htmlString)
                setHeaders(result.header)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])


    return (

        <table className='m-10  border-black '>
            <tbody>
                {headers?.map((rows, i) => (
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

    )
}
