import { Checkbox, IconButton, Stack, Typography } from '@mui/material';
import { AccessTime, CheckCircle, Clear, RadioButtonUnchecked } from '@mui/icons-material';
import { format } from 'date-fns';
import { TaskItemStyle } from '../styles/TaskItemStyle';

export interface ITaskItem {
   id: number | string;
   checked: number;
   name: string;
   duration?: Date;
   createdAt: Date;
}
interface IProps {
   data: ITaskItem;
   onRemove: (id: number | string) => void;
   onCheck: (id: number | string) => void;
}
export const TaskItem: React.FC<IProps> = ({ data, onCheck, onRemove }) => {
   const { classes } = TaskItemStyle();
   const handleCheckboxChange = () => {
      onCheck(data.id);
   };
   const handleStackClick = () => {
      onCheck(data.id);
   };
   return (
      <Stack
         className={classes.taskItem}
         flexDirection={'row'}
         alignItems={'center'}
         justifyContent={'space-between'}
      >
         <Stack
            width={'100%'}
            onClick={handleStackClick}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'left'}
         >
            <Checkbox
               className={classes.checkbox}
               checked={Boolean(data.checked)}
               icon={<RadioButtonUnchecked />}
               checkedIcon={<CheckCircle color={'primary'} />}
               onChange={handleCheckboxChange}
            ></Checkbox>
            <Typography className={classes.taskText}>{data.name}</Typography>
         </Stack>
         <Stack gap={1} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
            <AccessTime />
            {data?.duration ? <Typography>{format(data.duration, 'dd/MM/yyyy')}</Typography> : null}
            <IconButton onClick={() => onRemove(data.id)}>
               <Clear />
            </IconButton>
         </Stack>
      </Stack>
   );
};
