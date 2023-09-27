import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../Actions/ApplicationsActions"
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@mui/material";

const initialFieldValues = {
    company: '',
    link: '',
    dateApplied: '',
    applicationStatus: '',
    resumeVersion: ''
}

const ApplicationForm = ({ ...props }) => {

    const validate = (fieldValues = values) => {
        let validateValues = {...errors}
        if ('company' in fieldValues) {
            validateValues.company = fieldValues.company ? "" : "This field is required.";
        }
        if ('link' in fieldValues) {
            validateValues.link = fieldValues.link ? "" : "This field is required.";
        }
        if ('dateApplied' in fieldValues) {
            validateValues.dateApplied = fieldValues.dateApplied ? "" : "This field is required.";
        }
        if ('applicationStatus' in fieldValues) {
            validateValues.applicationStatus = fieldValues.applicationStatus ? "" : "This field is required.";
        }
        if ('resumeVersion' in fieldValues) {
            validateValues.resumeVersion = fieldValues.resumeVersion ? "" : "This field is required.";
        }
        setErrors({
            ...validateValues
        })
        if (fieldValues === values) {
            return Object.values(validateValues).every(x => x === "");
        }
    }

    const [ values, setValues ] = useState(initialFieldValues);
    const [ errors, setErrors ] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target
        const fieldValue = {[name]: value}
        setValues({
            ...values,
            ...fieldValue
        })
        validate(fieldValue)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            if (props.currentId === 0) {
                props.createApplication(values, () => window.alert('Inserted'))
            } else {
                props.updateApplication(props.currentId, values, () => window.alert('Updated'))
            }
        }
        resetForm();
    }

    const resetForm = () => {
        setValues({
            ...initialFieldValues
        })
        setErrors({})
        props.setCurrentId(0)
    }

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.ApplicationList.find(x => x.id === props.currentId)
            })
        setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="company"
                        variant="outlined"
                        label="Company Name"
                        value={values.company}
                        onChange={handleInputChange}
                        {...(errors.company && { error: true, helperText: errors.company })}
                    />
                    <TextField
                        name="link"
                        variant="outlined"
                        label="Posting Link"
                        value={values.link}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="dateApplied"
                        variant="outlined"
                        label="Date Applied"
                        value={values.dateApplied}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined"
                    {...(errors.applicationStatus && {error: true})}>
                        <InputLabel>Application Status</InputLabel>
                        <Select
                            name="applicationStatus"
                            value={values.applicationStatus}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="">Select Application Status</MenuItem>
                            <MenuItem value="Applied">Applied</MenuItem>
                            <MenuItem value="OA Received">OA Received</MenuItem>
                            <MenuItem value="HireVue Received">HireVue Received</MenuItem>
                            <MenuItem value="Recruiter Screen">Recruiter Screen</MenuItem>
                            <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
                            <MenuItem value="Interview Completed">Interview Completed</MenuItem>
                            <MenuItem value="Rejected">Rejected</MenuItem>
                        </Select>
                        {errors.applicationStatus && <FormHelperText>{errors.applicationStatus}</FormHelperText>}
                    </FormControl>
                    <TextField
                        name="resumeVersion"
                        variant="outlined"
                        label="Resume Verison"
                        value={values.resumeVersion}
                        onChange={handleInputChange}
                        {...(errors.resumeVersion && { error: true, helperText: errors.resumeVersion })}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = state => ({
    ApplicationList: state.ApplicationsReducer.list
})

const mapActionToProps = {
    createApplication: actions.create,
    updateApplication: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(ApplicationForm);