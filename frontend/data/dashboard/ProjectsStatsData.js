import {
	Briefcase,
    ListTask,
    People,
    Bullseye
} from 'react-bootstrap-icons';

export const ProjectsStats = [
    {
       id:1,
       title : "Contacts",
       value : 18,
       icon: <Briefcase size={18}/>,
       statInfo: '' 
    },
    {
        id:2,
        title : "Departments",
        value : 132,
        icon: <ListTask size={18}/>,
        statInfo: '' 
     },
     {
        id:3,
        title : "Users",
        value : 12,
        icon: <People size={18}/>,
        statInfo: '' 
     }
];
export default ProjectsStats;
