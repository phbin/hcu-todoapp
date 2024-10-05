import React, { useEffect, useMemo, useState } from 'react';
import { MainPageStyle } from '../styles/MainPageStyle';
import {
   Box,
   Button,
   CircularProgress,
   Container,
   Grid2,
   IconButton,
   Stack,
   TextField,
   ToggleButton,
   ToggleButtonGroup,
   Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ITaskItem, TaskItem } from '@task-item';
import { Add, Task } from '@mui/icons-material';
import { AddTask, GetTasks } from '../api/task';
import { uid } from 'uid';
import { FORMAT_DATE } from '../config/Config';

const defaultValues = {
   name: '',
};
const validationSchema = yup.object({
   // tasks: yup.array().of(
   //    yup.object({
   //       checked: yup.boolean(),
   //       name: yup.string(),
   //       duration: yup.date().nullable().typeError('Định dạng không hợp lệ!'),
   //       createdAt: yup.date().nullable().typeError('Định dạng không hợp lệ!'),
   //    })
   // ),
   name: yup.string().required('Chưa có nội dung!'),
});
const MainPage = () => {
   const [task, setTask] = useState<ITaskItem[]>([]);
   const { classes } = MainPageStyle();
   const [status, setStatus] = useState<number>(-1);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
   const methods = useForm({
      defaultValues,
      resolver: yupResolver(validationSchema),
   });
   const handleFilter = (event: React.MouseEvent<HTMLElement>, status: number | null) => {
      if (typeof status !== 'number') return;
      setStatus(status);
   };

   const onCheck = (checked: boolean, id: number | string) => {};
   const onRemove = (id: number | string) => {};

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
      })
         .then(() => {
            fetchTask();
         })
         .finally(() => {
            setIsLoadingSubmit(false);
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
                           <ToggleButtonGroup value={status} exclusive onChange={handleFilter}>
                              <ToggleButton value={-1}>All</ToggleButton>
                              <ToggleButton value={1}>Completed</ToggleButton>
                              <ToggleButton value={0}>Incomplete</ToggleButton>
                           </ToggleButtonGroup>
                        </Stack>
                     </Stack>
                  </Grid2>
                  {handleRenderTask}
                  <Grid2 size={12}>
                     <Stack
                        flexDirection={'row'}
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
                                 placeholder="Tên..."
                              />
                           )}
                        />
                        <IconButton
                           sx={{
                              height: 35,
                           }}
                           disabled={isLoadingSubmit}
                           onClick={methods.handleSubmit(onSubmit)}
                        >
                           <Add fontSize="medium"></Add>
                        </IconButton>
                     </Stack>
                  </Grid2>
               </Grid2>
            </form>
            {/* </FormProvider> */}
         </Container>
      </Box>
   );
};

export default MainPage;
