import { useParams, useNavigate } from 'react-router-dom';

const ContactDelete = ({ getContactId }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = () => {
        getContactId(id);
        navigate('/');
    };
    
    const handleCancel = () => {
        navigate('/');
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            textAlign: 'center',
            height: '100vh', // Full height for centering
            background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', // Background gradient
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#2c3e50',
            marginBottom: '20px',
        },
        message: {
            marginBottom: '20px',
            fontSize: '18px',
            color: '#333',
        },
        button: {
            margin: '5px',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            transition: 'background-color 0.3s',
        },
        deleteButton: {
            backgroundColor: 'red',
            color: 'white',
        },
        cancelButton: {
            backgroundColor: 'gray',
            color: 'white',
        },
        buttonHover: {
            delete: {
                backgroundColor: '#c0392b',
            },
            cancel: {
                backgroundColor: '#7f8c8d',
            },
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Confirm Deletion</h2>
            <p style={styles.message}>Are you sure you want to delete this contact?</p>
            <button
                onClick={handleDelete}
                style={{ ...styles.button, ...styles.deleteButton }}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.delete.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.deleteButton.backgroundColor)}
            >
                Yes, Delete
            </button>
            <button
                onClick={handleCancel}
                style={{ ...styles.button, ...styles.cancelButton }}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.cancel.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.cancelButton.backgroundColor)}
            >
                No, Cancel
            </button>
        </div>
    );
};

export default ContactDelete;
