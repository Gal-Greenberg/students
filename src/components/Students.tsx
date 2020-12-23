import React, { useState, useEffect } from "react"

const studentsInit = [{id: "1", name: "1", age: "1", gender: "1", school: "1", city: "1"},
    {id: "2", name: "2", age: "2", gender: "2", school: "2", city: "2"},
    {id: "3", name: "3", age: "3", gender: "3", school: "3", city: "3"},
    {id: "4", name: "4", age: "4", gender: "4", school: "4", city: "4"}]

export const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        setStudents(studentsInit)
        // axios.get(serverUrl + "/groups").then(res => {
        //     console.log(res.data)
        //     setOriginGroups(res.data)
        //     setGroups(res.data)
        // })
    }, []);

    return (
        <div className="groups">
            {students.map(student => (
                // <StudentCard student={student} />
            ))}
        </div>
    )
}