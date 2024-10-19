import { Link } from "react-router-dom";

const ContactCard = ({ contact }) => {
    return (
        <div className="item" style={styles.card}>
            <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyWLjkYKGswBE2f9mynFkd8oPT1W4Gx8RpDQ&s" 
                alt="user" 
                className="ui avatar image" 
                style={styles.avatar} 
            />
            <div className="content" style={styles.content}>
                <Link to={`/contact/${contact.id}`} style={styles.link}>
                    <div className="header" style={styles.header}>{contact.name}</div>
                    <div style={styles.email}>{contact.emailid}</div>
                </Link>
            </div>
            <div style={styles.buttonContainer}>
                <Link to={`/contactdelete/${contact.id}`}>
                    <i className="trash alternate outline icon" style={styles.iconRed}></i>
                </Link>
                <Link to={`/editcontact/${contact.id}`}>
                    <i className="edit alternate outline icon" style={styles.iconBlue}></i>
                </Link>
            </div>
        </div>
    );
};

const styles = {
    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        margin: '5px 0',
        flexWrap: 'nowrap',
    },
    avatar: {
        borderRadius: '50%',
        marginRight: '10px',
    },
    content: {
        flexGrow: 1,
        minWidth: '0',
        paddingRight: '10px',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    header: {
        fontWeight: 'bold',
        fontSize: '1.2em', // Medium size for name
        minWidth: '0', // Allows text to properly shrink
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    email: {
        fontSize: '1em', // Medium size for email
        color: '#666',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
    },
    iconRed: {
        cursor: "pointer",
        color: "red",
        marginLeft: '10px',
        fontSize: '1.2em', // Medium icon size
    },
    iconBlue: {
        cursor: "pointer",
        color: "blue",
        marginLeft: '10px',
        fontSize: '1.2em', // Medium icon size
    },
};

// Media query for further responsive adjustments
const mediaQueryStyles = `
@media (max-width: 600px) {
    .header {
        font-size: 1em; // Reduce font size for small screens
    }
    .email {
        font-size: 0.9em; // Reduce font size for small screens
    }
}
`;

// Append media query styles to the head
const styleElement = document.createElement('style');
styleElement.innerHTML = mediaQueryStyles;
document.head.appendChild(styleElement);

export default ContactCard;
