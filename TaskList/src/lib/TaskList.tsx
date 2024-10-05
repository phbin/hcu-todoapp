import { useFieldArray } from 'react-hook-form';
import styles from './TaskList.module.css';

interface IProps {
   data: any;
}

export function TaskList() {
   // const { fields} = useFieldArray({
   //    name: "tasks",
   //  });

   const handleRender = () => {
      // return fields.map()
   };
   return (
      <div className={styles['container']}>
         <h1>Welcome to TaskList!</h1>
      </div>
   );
}

export default TaskList;
