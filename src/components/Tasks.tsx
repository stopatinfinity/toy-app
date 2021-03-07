import Task from './Task'

const Tasks = (props: { tasks: any, onDelete: any, onToggle: any }) => {
    return (
        <>
            {props.tasks.map((task: any) => (
                <Task key={task.id} task={task} onDelete={props.onDelete} onToggle={props.onToggle}/>
            ))}
        </>
    )
}

export default Tasks