import React, { useState, useEffect } from "react"

import { DataGrid, RowsProp, RowParams } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";

import { StudentProps } from "../interfaces"

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
        //delete data from localStorage for testing
        // localStorage.removeItem("students");

        // Get data from localStorge if first time running get from Rest API
        const localStorageStudents = localStorage.getItem("students")
        if (localStorageStudents === null) {
            getDataFromAPI();
        } else {
            getDataFromLocalStorage(localStorageStudents);
        }
    }, []);
    
    const getDataFromAPI = async() => {
        try {
            const url = "https://run.mocky.io/v3/2a2d954c-439a-4a1a-9293-60d02635229d"
            const response = (await fetch(url));
            response.json().then((data) => {
                setStudents(data);
                localStorage.setItem("students", JSON.stringify(data));
            })
        } catch (error) {
            console.error(`fetch operation failed: ${error.message}`);
        }
    }

    const getDataFromLocalStorage = async(localStorageStudents: string) => {
        const localStorageStudentsProps: StudentProps[] = (JSON.parse(localStorageStudents));
        
        // Checks if a student has been updated
        const studentUpdate = localStorage.getItem("studentUpdate")
        if (studentUpdate !== null) {
            const studentUpdateProps = JSON.parse(studentUpdate)

            localStorageStudentsProps.map(student => {
                if (student.id === studentUpdateProps.id) {
                    const index = localStorageStudentsProps.indexOf(student)
                    localStorageStudentsProps[index] = studentUpdateProps
                }
            })
            localStorage.removeItem("studentUpdate");
            localStorage.setItem("students", JSON.stringify(localStorageStudentsProps))
        }
        setStudents(localStorageStudentsProps)
    }

    const onCheckboxChange = (selections: any) => {
        setCheckedStudents(selections.rowIds)
    }

    const deleteChecked = async(e: any) => {
        let found
        checkedStudents.map(checkedStudent => {
            found = students?.find(student => student.id === checkedStudent.toString());
            found !== undefined && students?.splice(students.indexOf(found), 1)
        })

        if (found === undefined) {
            alert("Please select student/s to delete")
        } else {
            localStorage.setItem("students", JSON.stringify(students))
            window.location.reload()
        }
    }

    const onRowClicked = (e: RowParams) => {
        localStorage.setItem("studentUpdate", JSON.stringify(e.row))
        window.location.href = "http://localhost:3000/student"
    }

    let studentsProps = students ? students as RowsProp : [];
    return (
        <div className="align_center">
            <div className="data_grid">
                <DataGrid
                    pageSize={8} checkboxSelection
                    rows={studentsProps} columns={columns}
                    onSelectionChange={onCheckboxChange}
                    onRowClick={onRowClicked}
                />
            </div>
            <Button variant="contained" color="primary" onClick={deleteChecked}>delete</Button>
        </div>
    )
}