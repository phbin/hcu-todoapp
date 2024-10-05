import { Checkbox, Stack, Typography } from '@mui/material';
import styles from './TaskItem.module.css';
import { AccessTime, Clear } from '@mui/icons-material';
import { format } from 'date-fns';

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
   onCheck: (checked: boolean, id: number | string) => void;
}
export const TaskItem: React.FC<IProps> = ({ data, onCheck, onRemove }) => {
   return (
      <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
         <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
            <Checkbox checked={Boolean(data.checked)}></Checkbox>
            <Typography>{data.name}</Typography>
         </Stack>
         <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
            <AccessTime></AccessTime>
            {data?.duration ? <Typography>{format(data.duration, 'dd/MM/yyyy')}</Typography> : null}
            <Clear></Clear>
         </Stack>
      </Stack>
   );
};
