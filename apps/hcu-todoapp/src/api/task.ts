import { ITaskItem } from '@task-item';
import { API_URL } from '../config/Config';

const getQueryString = (queries: any) => {
   return Object.keys(queries)
      .reduce((result: string[], key: string) => {
         return [...result, `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`];
      }, [])
      .join('&');
};

export const GetTasks = (query: any) => {
   try {
      const param = getQueryString(query);
      return fetch(`${API_URL}/tasks?${param}`, {
         method: 'GET',
      }).then((res) => res.json());
   } catch (e) {
      console.log({ e });
      throw e;
   }
};

export const AddTask = (data: ITaskItem) => {
   try {
      return fetch(`${API_URL}/tasks`, {
         method: 'POST',
         body: JSON.stringify(data),
      }).then((res) => res.json());
   } catch (e) {
      console.log({ e });
      throw e;
   }
};
export const UpdateTask = (task: ITaskItem) => {
   try {
      return fetch(`${API_URL}/tasks/${task.id}`, {
         method: 'PUT',
         body: JSON.stringify(task),
      }).then((res) => res.json());
   } catch (e) {
      console.log({ e });
      throw e;
   }
};
export const RemoveTask = (id: number | string) => {
   try {
      return fetch(`${API_URL}/tasks/${id}`, {
         method: 'DELETE',
      }).then((res) => res.json());
   } catch (e) {
      console.log({ e });
      throw e;
   }
};
