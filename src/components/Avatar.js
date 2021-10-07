import md5 from 'md5';
import { useAuth } from './../hooks';

function Avatar(props) {

    const { className } = props;

    const { user } = useAuth();

    if (! user) {
        return null;
    }
    
    const gravatarHash = md5(user.email.trim().toLowerCase());

    return (
        <img 
            alt="Profile Menu"
            src={`http://www.gravatar.com/avatar/${gravatarHash}/.jpg?s=80`} 
            className={ className } 
        />
    );

}

export default Avatar;