import React, { useEffect, useMemo, useState } from 'react';
import { MainPageStyle } from '../styles/MainPageStyle';
import {
   Box,
   Button,
   CircularProgress,
   Container,
   Grid2,
   Stack,
   TextField,
   ToggleButton,
   ToggleButtonGroup,
   Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ITaskItem, TaskItem } from '@task-item';
import { List, PlaylistAddCheck, PlaylistRemove } from '@mui/icons-material';
import { AddTask, GetTasks, RemoveTask, UpdateTask } from '../api/task';
import { uid } from 'uid';
import { FORMAT_DATE } from '../config/Config';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
const defaultValues = {
   name: '',
};
const validationSchema = yup.object({
   name: yup.string().required('Task content is empty!'),
});
const MainPage = () => {
   const [task, setTask] = useState<ITaskItem[]>([]);
   const { classes } = MainPageStyle();
   const [status, setStatus] = useState<number>(-1);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
   const [showAddTask, setShowAddTask] = useState<boolean>(false);
   const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs(new Date()));
   const methods = useForm({
      defaultValues,
      resolver: yupResolver(validationSchema),
   });
   const handleFilter = (event: React.MouseEvent<HTMLElement>, status: number | null) => {
      if (typeof status !== 'number') return;
      setStatus(status);
   };

   const onCheck = async (id: number | string) => {
      try {
         const updatedTasks = task.map((item) =>
            item.id === id ? { ...item, checked: item.checked === 0 ? 1 : 0 } : item
         );
         // setTask(updatedTasks);
         const updatedTask = updatedTasks.find((item) => item.id === id);
         if (updatedTask) {
            await UpdateTask(updatedTask);
         }
         fetchTask();
      } catch (e) {
         console.error('Error updating task:', e);
      }
   };
   const onRemove = async (id: number | string) => {
      try {
         const remainingTasks = task.filter((item) => item.id !== id);
         setTask(remainingTasks);

         await RemoveTask(id);
      } catch (error) {
         console.error('Error removing task:', error);
      }
   };

   const fetchTask = async () => {
      try {
         setIsLoading(true);
         const query: any = status === -1 ? {} : { checked: status };
         const res = await GetTasks(query);
         console.log({ res });
         setTask(res ?? []);
         setIsLoading(false);
      } catch (e) {
         setIsLoading(false);
         setTask([]);
      }
   };
   // handle fetch task data
   useEffect(() => {
      fetchTask();
   }, [status]);

   const onSubmit = async (data: any) => {
      setIsLoadingSubmit(true);
      AddTask({
         id: uid(),
         name: data.name,
         checked: 0,
         createdAt: new Date(),
         duration: selectedDate ? selectedDate.toDate() : new Date(),
      })
         .then(() => {
            fetchTask();
            methods.reset();
            setSelectedDate(dayjs(new Date()));
         })
         .finally(() => {
            setIsLoadingSubmit(false);
            // setShowAddTask(false);
         });
   };
   const handleRenderTask = useMemo(() => {
      if (isLoading)
         return (
            <Grid2 size={12}>
               <Stack width={'100%'} justifyContent="center" alignItems="center" minHeight={300}>
                  <CircularProgress size={20} />
               </Stack>
            </Grid2>
         );

      return task.map((item) => (
         <Grid2 size={12} key={item.id}>
            <TaskItem data={item} onCheck={onCheck} onRemove={onRemove} />
         </Grid2>
      ));
   }, [task, isLoading]);

   return (
      <Box py={3} className={classes.root}>
         <Container maxWidth="lg">
            {/* <FormProvider {...methods}> */}
            <form>
               <Grid2 container>
                  <Grid2 size={12}>
                     <Stack
                        className={classes.header}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                     >
                        <Stack flexDirection={'column'}>
                           <Stack>
                              <Typography variant="h5" fontWeight={600}>
                                 Welcome to HCU To Do App
                              </Typography>
                           </Stack>
                           <Typography>Today {format(new Date(), FORMAT_DATE)}</Typography>
                        </Stack>
                        <Stack
                           flexDirection={'row'}
                           alignItems={'center'}
                           justifyContent={'space-between'}
                        >
                           <ToggleButtonGroup
                              className={classes.toggleButtonGroup}
                              value={status}
                              exclusive
                              onChange={handleFilter}
                           >
                              <ToggleButton className={classes.toggleButton} value={-1}>
                                 <List />
                                 <Typography>All</Typography>
                              </ToggleButton>
                              <ToggleButton className={classes.toggleButton} value={1}>
                                 <PlaylistAddCheck />
                                 Completed
                              </ToggleButton>
                              <ToggleButton className={classes.toggleButton} value={0}>
                                 <PlaylistRemove /> Incomplete
                              </ToggleButton>
                           </ToggleButtonGroup>
                        </Stack>
                     </Stack>
                  </Grid2>
                  {/* Add Task Button */}
                  <Grid2 size={12}></Grid2>
                  <Grid2 size={12}>
                     <Box>
                        <Stack>{handleRenderTask}</Stack>
                        {showAddTask ? (
                           <Stack
                              className={classes.addTaskContainer}
                              flexDirection={'column'}
                              alignItems={'flex-start'}
                              justifyContent={'space-between'}
                              gap={1}
                           >
                              <Controller
                                 control={methods.control}
                                 name="name"
                                 render={({ field, fieldState }) => (
                                    <TextField
                                       {...field}
                                       fullWidth
                                       error={Boolean(fieldState?.error)}
                                       helperText={fieldState?.error?.message}
                                       placeholder="Enter your task"
                                    />
                                 )}
                              />
                              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                 <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                       className={classes.dateInput}
                                       label="Due date"
                                       slotProps={{ textField: { size: 'small' } }}
                                       format="DD/MM/YYYY"
                                       defaultValue={dayjs(new Date())}
                                       value={selectedDate}
                                       onChange={(date) => setSelectedDate(date)}
                                       disablePast
                                    />
                                 </DemoContainer>
                              </LocalizationProvider> */}

                              <Stack
                                 flexDirection={'row'}
                                 alignItems={'center'}
                                 justifyContent={'flex-end'}
                                 width={'100%'}
                                 gap={1}
                              >
                                 <Button
                                    disabled={isLoadingSubmit}
                                    onClick={() => setShowAddTask(false)}
                                    className={classes.cancelTaskButton}
                                 >
                                    Cancel
                                 </Button>
                                 <Button
                                    disabled={isLoadingSubmit}
                                    onClick={methods.handleSubmit(onSubmit)}
                                    className={classes.addTaskButton}
                                 >
                                    Add task
                                 </Button>
                              </Stack>
                           </Stack>
                        ) : (
                           <Button
                              variant="contained"
                              color="primary"
                              className={classes.addTaskButton}
                              onClick={() => setShowAddTask(true)}
                           >
                              + Add Task
                           </Button>
                        )}
                     </Box>
                  </Grid2>
               </Grid2>
            </form>
            {/* </FormProvider> */}
         </Container>
      </Box>
   );
};

export default MainPage;
