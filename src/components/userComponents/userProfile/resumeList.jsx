import React, { useState } from 'react';
import { Button, Container, CssBaseline, Paper, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { uploadResume } from '../../../service/resumeMangement';
import { toast } from 'react-toastify';
import { toast_config } from '../../../config/constants';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../../ui/elements/myButton';

const ResumeList = () => {
    const navigate = useNavigate()
    const [resume, setResume] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setResume(selectedFile);
        }
    };

    const handleRemoveResume = () => {
        setResume(null);
    };

    const handleSaveResume = async () => {
        try {
             const res = await uploadResume(resume)
             navigate(-1)
            toast.success(res,toast_config)
        } catch (error) {
            console.error('Error saving resume:', error);
        }
    };

    return (<>
    
        <Container className='font-[300]' component="main" maxWidth="md">
            <CssBaseline />
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Add Resumes
                </Typography>

                <div>
                    <input
                        type="file"
                        accept=".pdf"
                        id='resume-uploader'
                        className='hidden'
                        onChange={handleFileChange}
                    />
                    <label htmlFor="resume-uploader">
                        <Button
                            variant="outlined"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload Resume
                        </Button>
                    </label>
                </div>

                {resume && (
                    <div className='pt-3'>
                        <Typography variant="h6" gutterBottom>
                            Uploaded Resume:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary={resume.name} />
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={handleRemoveResume}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        </List>

                        <Typography variant="h6" gutterBottom>
                            Preview:
                        </Typography>
                        <object
                            data={URL.createObjectURL(resume)}
                            type="application/pdf"
                            width="100%"
                            height="500px"
                        >
                            <p>PDF cannot be displayed.</p>
                        </object>

                        <div className='mt-3'>
                            <MyButton
                                className="!p-2 !text-[1.4rem] !px-7"
                                onClick={handleSaveResume}
                            >
                                Save
                            </MyButton>
                        </div>
                    </div>
                )}
            </Paper>
        </Container>
   </> );
}

export default ResumeList;
