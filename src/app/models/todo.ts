export interface ToDo{
    userId: string;
    task: Task;
    label: string[];
    status: string[];
}

export interface Task{
    value: string;
    dueDate:  any;
    label: string[];
    status: string;
}