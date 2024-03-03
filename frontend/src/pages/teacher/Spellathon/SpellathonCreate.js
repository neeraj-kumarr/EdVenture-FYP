import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const props = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function Spellathon() {
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = () => {
        setShowAlert(true);
    };


    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );


    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={12} >
                <Card style={{ padding: '30px', background: "url('https://media.istockphoto.com/id/695100728/vector/vector-background-with-blurred-objects-abstraction-in-gray.jpg?s=612x612&w=0&k=20&c=QG_1GxXUvuF6q_tnnPXn-CV1GQdgCBkqONZSKaURafE=')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>

                    <CardContent >
                        <h1 style={{ fontFamily: 'cursive', textDecoration: 'underline' }}>Create Spellathon  Game</h1>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableBody style={{ background: '#eeeefa' }}>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h6">
                                                Instructions
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <ol style={{ fontSize: '15px' }}>
                                                <li>Add Number of questions.</li>
                                                <li>Write your word.</li>
                                                <li>Add  Sound File.</li>
                                                <li>Give hints for questions.</li>
                                            </ol>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h6">
                                                Write the spellathon word:
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Required"
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h6">
                                                Add hint for word:
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Required"
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h6">
                                                Number of Hints:
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Required"
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h6">
                                                Upload Sound File:
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Upload {...props}>
                                                <Button icon={<UploadOutlined />}>Upload Sound File .mp3</Button>
                                            </Upload>
                                        </TableCell>
                                    </TableRow>


                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div style={{ padding: '20px' }}>
                            <Button
                                type="primary" success

                                size="large"
                                style={{ display: 'flex', marginInline: 'auto' }}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>

                            {showAlert && (
                                <Alert
                                    icon={<CheckIcon fontSize="inherit" />}
                                    severity="success"
                                    onClose={() => setShowAlert(false)}
                                >
                                    Game Created Successfully.
                                </Alert>
                            )}
                        </div>


                    </CardContent>

                    {/* </CardActions> */}
                </Card>
            </Grid>
        </Grid >
    );
}



const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
