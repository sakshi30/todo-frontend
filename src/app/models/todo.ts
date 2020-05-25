export interface ToDo{
    userId: string;
    task: Task;
    label: string[];
    status: string[];
    _id: string;
}

export interface Task{
    value: string;
    date:  any;
    label: string[];
    status: string[];
}