import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../Actions/ApplicationsActions"
import ApplicationForm from "./ApplicationForm";
import { Grid, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, ButtonGroup, Button } from "@mui/material";

const Applications = ({ ...props }) => {

    const [ currentId, setCurrentId ] = useState(0);
    
    useEffect(() => {
        props.fetchAllApplications()
    }, [])

    const onDelete = id => {
        if (window.confirm('Are you sure you would like to delete this record?')) {
            props.deleteApplication(id)
        }
    }

    return (
        <Paper>
            <Grid container>
                <Grid item xs={6} p={6}>
                    <ApplicationForm {...({currentId, setCurrentId})}/>
                </Grid>
                <Grid item xs={6} p={6}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Company</TableCell>
                                    <TableCell>Posting Link</TableCell>
                                    <TableCell>Date Applied</TableCell>
                                    <TableCell>Application Status</TableCell>
                                    <TableCell>Resume Version</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.ApplicationList.map((record, index) => {
                                        return(
                                            <TableRow key={index}>
                                                <TableCell>{record.company}</TableCell>
                                                <TableCell>{record.link}</TableCell>
                                                <TableCell>{record.dateApplied}</TableCell>
                                                <TableCell>{record.applicationStatus}</TableCell>
                                                <TableCell>{record.resumeVersion}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup variant="text">
                                                        <Button onClick={() => {setCurrentId(record.id)}}>Edit</Button>
                                                        <Button onClick={() => onDelete(record.id)}>Delete</Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    ApplicationList: state.ApplicationsReducer.list
})

const mapActionToProps = {
    fetchAllApplications: actions.fetchAll,
    deleteApplication: actions.deleteEntry
}

export default connect(mapStateToProps, mapActionToProps)(Applications);