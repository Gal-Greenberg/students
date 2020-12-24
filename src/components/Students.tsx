import React, { useState, useEffect } from "react"

import { DataGrid, RowsProp } from '@material-ui/data-grid';

import { StudentProps } from "../interfaces"

// const studentsInit = [
//     {"id": "1", "name": "1", "age": "1", "gender": "1", "school": "1", "city": "1", "gpa": "1"},
//     {"id": "2", "name": "2", "age": "2", "gender": "2", "school": "2", "city": "2", "gpa": "2"},
//     {"id": "3", "name": "3", "age": "3", "gender": "3", "school": "3", "city": "3", "gpa": "3"},
//     {"id": "4", "name": "4", "age": "4", "gender": "4", "school": "4", "city": "4", "gpa": "4"},
//     {"id": "5", "name": "5", "age": "5", "gender": "5", "school": "5", "city": "5", "gpa": "5"},
//     {"id": "6", "name": "6", "age": "6", "gender": "6", "school": "6", "city": "6", "gpa": "6"},
//     {"id": "7", "name": "7", "age": "7", "gender": "7", "school": "7", "city": "7", "gpa": "7"},
//     {"id": "8", "name": "8", "age": "8", "gender": "8", "school": "8", "city": "8", "gpa": "8"},
//     {"id": "9", "name": "9", "age": "9", "gender": "9", "school": "9", "city": "9", "gpa": "9"},
//     {"id": "10", "name": "10", "age": "10", "gender": "10", "school": "10", "city": "10", "gpa": "10"},
//     {"id": "11", "name": "11", "age": "11", "gender": "11", "school": "11", "city": "11", "gpa": "11"},
//     {"id": "12", "name": "12", "age": "12", "gender": "12", "school": "12", "city": "12", "gpa": "12"},
//     {"id": "13", "name": "13", "age": "13", "gender": "13", "school": "13", "city": "13", "gpa": "13"},
//     {"id": "14", "name": "14", "age": "14", "gender": "14", "school": "14", "city": "14", "gpa": "14"},
//     {"id": "15", "name": "15", "age": "15", "gender": "15", "school": "15", "city": "15", "gpa": "15"},
//     {"id": "16", "name": "16", "age": "16", "gender": "16", "school": "16", "city": "16", "gpa": "16"},
//     {"id": "17", "name": "17", "age": "17", "gender": "17", "school": "17", "city": "17", "gpa": "17"},
//     {"id": "18", "name": "18", "age": "18", "gender": "18", "school": "18", "city": "18", "gpa": "18"},
//     {"id": "19", "name": "19", "age": "19", "gender": "19", "school": "19", "city": "19", "gpa": "19"},
//     {"id": "20", "name": "20", "age": "20", "gender": "20", "school": "20", "city": "20", "gpa": "20"}]

export const Students = () => {
    const [students, setStudents] = useState<StudentProps[]>();
    const [checkedStudents, setCheckedStudents] = useState<{id: string}[]>([]);

    const columns = [
        { field: "id", headerName: "ID", width: 150 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "age", headerName: "Age", width: 150 },
        { field: "gender", headerName: "Gender", width: 150 },
        { field: "school", headerName: "School", width: 150 },
        { field: "city", headerName: "City", width: 150 },
        { field: "gpa", headerName: "GPA", width: 150 },
    ];

    useEffect(() => {
        async function getData() {
            try {
                const url = "https://run.mocky.io/v3/c4e75d53-f90e-4b7f-8c1b-8d9457edb684"
                const response = (await fetch(url));
                response.json().then((data) => {
                    setStudents(data);
                    localStorage.setItem("students", JSON.stringify(data));
                })
            } catch (error) {
                console.error(`fetch operation failed: ${error.message}`);
            }
        }
        
        // localStorage.removeItem("students");

        const localStorageStudents = localStorage.getItem("students")
        console.log(localStorageStudents)
        if (localStorageStudents === null) {
            getData();
        } else {
            localStorageStudents !== undefined && setStudents(JSON.parse(localStorageStudents));
        }
    }, []);

    const onCheckboxChange = (selections: any) => {
        setCheckedStudents(selections.rowIds)
    }

    const deleteChecked = () => {
        checkedStudents.map(checkedStudent => {
            const found = students?.find(student => student.id === checkedStudent.toString());
            found !== undefined && students?.splice(students.indexOf(found), 1)
        })

        console.log(students)
        localStorage.setItem("students", JSON.stringify(students));
    }

    const updateStudent = () => {

    }

    var studentsProps = students ? students as RowsProp : [];
    console.log(studentsProps)
    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ margin: "2rem", textAlign: "center", height: 550 }}>
                <DataGrid pageSize={8} checkboxSelection
                    rows={studentsProps} columns={columns} 
                    onSelectionChange={onCheckboxChange}
                    // onRowClick={}
                />
            </div>
            <button className="button" onClick={deleteChecked}>delete</button>
        </div>
    )
}