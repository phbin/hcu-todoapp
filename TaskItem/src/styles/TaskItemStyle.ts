import { makeStyles } from 'tss-react/mui';

export const TaskItemStyle = makeStyles()((theme) => ({
   taskItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(2),
      border: '1px solid #e0e0e0',
      borderRadius: '10px',
      backgroundColor: '#fff',
      width: '100%',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease',
      '&:hover': {
         transform: 'scale(1.02)',
         boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      },
   },
   checkbox: {
      marginRight: theme.spacing(2),
      '& .MuiCheckbox-root': {
         color: '#000',
      },
   },
   taskText: {
      fontSize: '16px',
      fontWeight: 500,
      color: '#333',
   },
   dateInput: {
      '& .MuiInputBase-root': {
         '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
         },
      },
      width: '20%',
   },
}));
