import { FaUserCircle } from 'react-icons/fa';
import { useParams, Link } from 'react-router-dom';

const ContactDetail = (props) => {
  const { id } = useParams(); 
  const selectedContact = props.contact.find((c) => c.id === id);

  if (!selectedContact) {
    return (
      <div className="main" style={styles.container}>
        <h2>Contact Not Found</h2>
        <Link to="/">
          <button className='ui button blue'>Back to Contact List</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="main" style={styles.container}>
      <div className='ui card centered' style={styles.card}>
        <div className='image' style={styles.imageContainer}>
          <FaUserCircle style={styles.icon} />
        </div>

        <div className="content">
          <div className="header" style={styles.header}>{selectedContact.name}</div>
          <div className="description" style={styles.description}>{selectedContact.emailid}</div>
        </div>
        
        <div style={styles.buttonContainer}>
          <Link to="/">
            <button className='ui button blue'>Back to Contact List</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Full height of viewport
    background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', // Background gradient
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    maxWidth: '350px', // Reduce max width for smaller cards
    width: '100%',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden', // Prevents overflow of content
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  icon: {
    color: '#007bff',
    width: "30%", // Smaller icon
    height: "auto", // Maintain aspect ratio
  },
  header: {
    textAlign: 'center',
    fontSize: '20px', // Adjust font size for better balance
    fontWeight: 'bold',
    color: '#2c3e50',
    margin: '10px 0', // Add margin for spacing
  },
  description: {
    textAlign: 'center',
    fontSize: '16px', // Adjust font size for better balance
    color: '#333',
    marginBottom: '20px', // Add margin for spacing
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px', // Reduce padding for compactness
  },
};

// Media query for further responsiveness
const mediaQueryStyles = `
@media (max-width: 600px) {
  .header {
    font-size: 18px; // Smaller header font size
  }
  .description {
    font-size: 14px; // Smaller description font size
  }
  .icon {
    width: 30%; // Smaller icon on smaller screens
  }
}
`;

// Append media query styles to the head
const styleElement = document.createElement('style');
styleElement.innerHTML = mediaQueryStyles;
document.head.appendChild(styleElement);

export default ContactDetail;
