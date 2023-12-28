"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useState } from 'react';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { completeChapter, setChapters } from '@/redux/slice/progressSlice';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));



export const CourseProgress=({chapters})=> {

    const progress = useSelector((state)=> state.progress.progress)


  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
            <br />
            <BorderLinearProgress variant="determinate" value={progress} />
            <p>{progress.toFixed(2)}% Complete</p> {/* Display progress percentage */}
        </Box>
    </div>
  );
}

