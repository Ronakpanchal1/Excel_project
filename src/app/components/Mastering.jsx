import React, { useState } from 'react'
import { read, utils } from 'xlsx'
import Dynamictable from './Dynamictable';
import Table from './Table';
import Table2 from './Table2';
import NestedTable from './NestedTable';

export default function Mastering() {

    const pdfCols = ["S.no.", "Name of the Employee", "Ticket & Badge No", "Occupation"];
    // const pdfCols = ["S.no.", "Name of the Employee", "Ticket & Badge No", "Occupation", "Basic Wages", "Over Time", "D.A & other allow.", "Bonus", "Total Amount Payable", "Fines", "Other Deductions", "Total Amount Deducted", "Basic Wages_1", "Over Time_1", "D.A & other allow._1", "Bonus_1", "Total Amount Paid", "Basic Wages_2", "Over Time_2", "Bonus_2", "D.A & other allow._2"];

    const OptionsSelectionlength = Array.from({ length: pdfCols.length }, () => "")

    const [excelData, setExcelData] = useState([])
    const [xlColHeads, setXlColHeads] = useState([])
    const [userSelectedCols, setUserSelectedCols] = useState(OptionsSelectionlength)
    const [formatedData, setFormatedData] = useState([])
    const [showTable, setShowTable] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [fileNametoDisplay, setFileNameToDisplay] = useState(null)

    const filteringEmtyVals = userSelectedCols.filter(item => item)

    const handleFile = async (e) => {
        const file = e.target.files[0]

        if (file) {
            setFileNameToDisplay(file.name)
            const reader = new FileReader()
            reader.readAsBinaryString(file)
            reader.onload = (e) => {
                const fileData = e.target.result
                const workbook = read(fileData, { type: "binary" })
                const sheetName = workbook.SheetNames[0]
                const sheet = workbook.Sheets[sheetName]
                const parsedData = utils.sheet_to_json(sheet)
                const excelCols = [...new Set(parsedData.flatMap(obj => Object.keys(obj)))]
                if (pdfCols.length > excelCols) {
                    alert("Selected Excel files doesnt have enough columns for this document")
                    window.location.reload()
                } else {
                    setExcelData(parsedData)
                    setXlColHeads(excelCols)

                    const initialSelectedCols = pdfCols.map(pdfCol => {
                        const matchingCol = excelCols.find(excelCol => excelCol === pdfCol);
                        return matchingCol || "";
                    });
                    setUserSelectedCols(initialSelectedCols);
                }
            }
        }
    }

    const selectCols = (e, i) => {

        const { value } = e.target
        if (!userSelectedCols.includes(value)) {
            const updatedCols = [...userSelectedCols]
            updatedCols[i] = value
            setUserSelectedCols(updatedCols)
        } else {
            setErrMsg(`${value} column has been selected before`);
            setTimeout(() => {
                setErrMsg("")
            }, 2000);
        }
    }

    const FormatData = () => {

        const newArray = excelData.map((obj) => {
            const newObject = {}
            filteringEmtyVals.forEach((originalKey, i) => {
                const newKey = pdfCols[i]
                newObject[newKey] = obj[originalKey] || ""
            })
            return newObject
        })

        setFormatedData(newArray)
        setShowTable(true)
    }

    const reset = () => {
        setUserSelectedCols(OptionsSelectionlength)
    }

    return (
        <div className='flex  flex-col gap-10'>
            {fileNametoDisplay && <div className='bg-purple-400 text-white p-4 text-center '>Selected file : {fileNametoDisplay}</div>}
            <input type="file" id='uploadFile' accept='.xlsx,.xls' onChange={handleFile} className='hidden' />
            <label htmlFor="uploadFile" className=' bg-blue-400 py-3 px-4 text-white w-max mx-auto mt-2 cursor-pointer '>Upload file</label>
            <div className='flex w-max mx-auto'>
                <button className='w-max px-4 py-2 ml-2 bg-purple-500 hover:bg-white hover:text-purple-600 border border-purple-500 text-white transition-all duration-200 ' onClick={reset}>Reset</button>
                <button disabled={filteringEmtyVals.length === pdfCols.length ? false : true} className='ml-2 disabled:bg-opacity-70 w-max px-4 py-2 bg-purple-500 hover:bg-white hover:text-purple-600 border border-purple-500 text-white transition-all duration-200 ' onClick={FormatData}>Save</button>
            </div>

            <div className={` ${errMsg ? " opacity-100 -translate-x-1/2 " : " opacity-0 translate-x-10 "}  font-semibold tracking-wide fixed pointer-events-none top-10 -translate-x-1/2 left-1/2 px-5 py-3  bg-black transition-all duration-300 text-pink-300 `}>{errMsg}</div>
            {!showTable && <div className='border flex gap-[30px] mb-20 p-5 border-black rounded-[20px] mx-auto w-max '>
                <div className='flex flex-col  gap-3 '>
                    {
                        pdfCols.map((item, i) => (
                            <div className='w-max p-1 leading-[30px] border-black h-[40px]' key={i}>{item}</div>
                        ))
                    }
                </div>
                <div className='flex flex-col gap-3  '>
                    {
                        pdfCols.map((colnames, index) => (
                            <select value={userSelectedCols[index]} onChange={(e) => { selectCols(e, index) }} key={index} className='h-[40px] leading-[30px] border rounded-md  border-slate-200  pl-1'>
                                <option value="">select columns</option>
                                {
                                    xlColHeads.map((item, i) => (
                                        <option value={item} key={i} >{item}</option>
                                    ))
                                }
                            </select>
                        ))
                    }
                </div>
            </div>}
            {/* {showTable && <Table2 formatedData={formatedData} />} */}
            {/* {showTable && <NestedTable formatedData={formatedData} />} */}

            {showTable && <Table formatedData={formatedData} />}
            {/* <Dynamictable formatedData={formatedData} /> */}
            {/* <Dynamictable2 formatedData={formatedData} /> */}

        </div>
    )
}
