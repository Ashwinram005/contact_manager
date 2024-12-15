import { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
    const inputRef = useRef("");

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard 
                key={contact.id} 
                contact={contact} 
            />
        );
    });

    const getSearchTerm = () => {   
        props.searchkeyword(inputRef.current.value);
    };

    // Inline Styles for a modern, responsive look
    const styles = {
        container: {
            padding: "20px",
            backgroundColor: "#f4f7fc",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            maxWidth: "1000px",
            margin: "0 auto",
            width: "90%",
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '24px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '20px',
        },
        button: {
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            flexShrink: 0,
        },
        searchBox: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
        },
        searchInput: {
            padding: '10px',
            flex: '1',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
            outline: 'none',
            marginRight: '10px',
        },
        noContacts: {
            color: '#888',
            fontSize: '18px',
            textAlign: 'center',
            padding: '20px',
        },
    };

    return (
        <div style={styles.container} className="ui celled list">
            <h2 style={styles.header}>
                Contact List
                <Link to="/add">
                    <button 
                        className="ui button blue right" 
                        style={styles.button}
                    >
                        Add Contact
                    </button>
                </Link>
            </h2>
            <div style={styles.searchBox} className="ui search">
                <input 
                    type="text"
                    ref={inputRef}
                    placeholder="Search Contacts" 
                    value={props.searchcontact}
                    className="prompt"
                    style={styles.searchInput}
                    onChange={getSearchTerm}
                />
            </div>
            {renderContactList.length > 0 ? renderContactList : <div style={styles.noContacts}>No contacts available.</div>}
        </div>
    );
};

export default ContactList;
