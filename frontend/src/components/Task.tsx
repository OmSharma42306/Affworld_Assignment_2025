interface TaskProps {
    name : string;
    description : string;
}

export default function Task({name,description}:TaskProps){

    return <div>
        <h1>Task Name:{name}</h1>
        <h2>Task Description : {description}</h2>
    </div>
}