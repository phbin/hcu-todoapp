import { makeStyles } from 'tss-react/mui';

export const MainPageStyle = makeStyles()((theme) => ({
   root: {
      backgroundColor: '#F7F8FA',
      minHeight: '100vh',
      padding: theme.spacing(3),
   },
   header: {
      marginBottom: theme.spacing(2),
   },
   taskContainer: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: theme.spacing(2),
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
   },
   addTaskButtonContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      paddingTop: theme.spacing(2),
   },
   addTaskContainer: {
      marginTop: theme.spacing(2),
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: theme.spacing(2),
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
   },
   addTaskButton: {
      backgroundColor: '#000',
      color: '#fff',
      borderRadius: '30px',
      fontSize: '14px',
      height: '35px',
      textTransform: 'none',
      '&:hover': {
         backgroundColor: '#333',
      },
      paddingX: '20px',
      marginTop: theme.spacing(2),
   },
   cancelTaskButton: {
      backgroundColor: '#ebebeb',
      color: '#000',
      height: '35px',
      borderRadius: '30px',
      fontSize: '14px',
      textTransform: 'none',
      padding: '10px',
      marginTop: theme.spacing(2),
   },
   toggleButtonGroup: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      '& .MuiToggleButton-root.Mui-selected': {
         backgroundColor: '#000',
         color: '#fff',
      },
   },
   toggleButton: {
      borderRadius: '10px',
      textTransform: 'capitalize',
      gap: 3,
   },
   // dateInput: {
   //    width: '30px',
   // },
}));
