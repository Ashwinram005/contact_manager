import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditContact = (props) => {
    const { id } = useParams();
    const selectedContact = props.contacts.find((c) => c.id === id);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (selectedContact) {
            setName(selectedContact.name);
            setEmail(selectedContact.emailid);
        }
    }, [selectedContact]);

    const Update = (e) => {
        e.preventDefault();
        console.log("Updating contact:", name, email); // Ensure form data is logged
        props.updatehandler(id, name, email);
        navigate("/");
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // Full height of the viewport
            background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
            padding: '20px',
            boxSizing: 'border-box',
        },
        formWrapper: {
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            width: '100%', // Full width of the parent
            boxSizing: 'border-box',
        },
        title: {
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#2c3e50',
            marginBottom: '20px',
        },
        field: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            fontWeight: '500',
            color: '#333',
            marginBottom: '5px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px',
            color: '#333',
            transition: 'border-color 0.3s',
            boxSizing: 'border-box',
        },
        button: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#3498db',
            border: 'none',
            color: '#fff',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            marginTop: '10px',
        },
        buttonHover: {
            backgroundColor: '#2980b9',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.formWrapper}>
                <h2 style={styles.title}>Edit Contact</h2>
                <form onSubmit={Update} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={styles.field}>
                        <label style={styles.label}>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditContact;
