import {
	Briefcase,
    ListTask,
    People,
} from 'react-bootstrap-icons';

export const ProjectsStats = [
    {
       id:1,
       title : "Contacts",
       value : 280,
       icon: <Briefcase size={18}/>,
       statInfo: '' 
    },
    {
        id:2,
        title : "Departments",
        value : 32,
        icon: <ListTask size={18}/>,
        statInfo: '' 
     },
     {
        id:3,
        title : "Users",
        value : 200,
        icon: <People size={18}/>,
        statInfo: '' 
     }
];
export default ProjectsStats;
