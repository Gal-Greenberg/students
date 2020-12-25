import { useState, useEffect } from "react"

import { Card, TextField, Button, makeStyles } from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';

import { StudentProps } from "../interfaces"

const useStyles = makeStyles((theme) => ({
    form: {
        '& > *': {
            margin: theme.spacing(3),
            textAlign: "center"
        },  
    },
}));

export const EditStudent = () => {
    const classes = useStyles();
    const [student, setStudent] = useState<StudentProps>();

    useEffect(() => {        
        const studentUpdate = localStorage.getItem("studentUpdate")
        console.log(studentUpdate)
        if (studentUpdate !== null) {
            setStudent(JSON.parse(studentUpdate))
            localStorage.removeItem("studentUpdate");
        }
    }, []);

    const onInputChange = (e: any) => {
        clearError()

        const studentUpdate: StudentProps = {
            id: (document.getElementById("id") as HTMLInputElement).value,
            name: (document.getElementById("name") as HTMLInputElement).value,
            age: (document.getElementById("age") as HTMLInputElement).value,
            gender: (document.getElementById("gender") as HTMLInputElement).value,
            school: (document.getElementById("school") as HTMLInputElement).value,
            city: (document.getElementById("city") as HTMLInputElement).value,
            gpa: (document.getElementById("gpa") as HTMLInputElement).value
        }
        setStudent(studentUpdate)
    }

    const update = (e: any) => {
        clearError()
        let flag = 0;
        // console.log(student)

        if (student === undefined || student.name === "") {
            showError("Please enter your name")
            flag = 1
        }
        if (student === undefined || student.age === "") {
            showError("Please enter your age")
            flag = 1
        }
        if (student === undefined || student.gender === "") {
            showError("Please enter your gender")
            flag = 1
        }
        if (student === undefined || student.school === "") {
            showError("Please enter your school")
            flag = 1
        }
        if (student === undefined || student.city === "") {
            showError("Please enter your city")
            flag = 1
        }
        if (student === undefined || student.gpa === "") {
            showError("Please enter your GPA")
            flag = 1
        }
        
        if (flag === 0) {
            localStorage.setItem("studentUpdate", JSON.stringify(student))
            window.location.href = "http://localhost:3000/"
        }
    }

    const showError = (errorText: string) => {
        console.log("showError")
        var errorLabel = document.getElementById("errorText")
        
        if (errorLabel !== null) {
            errorLabel.innerHTML += "<p>" + errorText + "</p>"
            errorLabel.style.height = "auto"
        }   
    }
    
    const clearError = () => {
        var errorLabel = document.getElementById("errorText")
        
        if (errorLabel !== null) {
            errorLabel.style.height = "0px"
            errorLabel.innerHTML = ""
        }   
    }

    return (
        <div className="align_center">
            <Card className="card">
                <PersonIcon color="primary" style={{ marginTop: "2rem", fontSize: 80 }} />
                <form className={classes.form} noValidate>
                    <TextField id="id" disabled className="input_content" label="ID" value={student?.id} />
                    <TextField id="name" required className="input_content" label="Name" 
                        value={student?.name} onChange={onInputChange}  
                    />
                    <br />

                    <TextField id="age" required className="input_content" label="Age"
                        value={student?.age} onChange={onInputChange}
                    />
                    <TextField id="gender" required className="input_content" label="Gender"
                        value={student?.gender} onChange={onInputChange}
                    />
                    <br />

                    <TextField id="school" required className="input_content" label="School" 
                        value={student?.school}onChange={onInputChange}
                    />
                    <TextField id="city" required className="input_content" label="City" 
                        value={student?.city}onChange={onInputChange}
                    />
                    <br />

                    <TextField id="gpa" required className="input_content" label="GPA" 
                        value={student?.gpa} onChange={onInputChange}
                    />
                </form>

                <p id="errorText" style={{ fontSize: "20px", color: "red",
                    display: "flexbox", margin: "1px 0 0 0", textAlign: "center"}}>
                </p>
                <Button style={{ marginBottom: "2rem" }} variant="contained" color="primary" onClick={update}>Update</Button>
            </Card>
        </div>
    )
}