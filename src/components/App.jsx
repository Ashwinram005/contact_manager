    import React, { useState, useEffect } from "react";
    import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
    import Header from "./Header";
    import './App.css';
    import ContactList from "./ContactList";
    import AddContact from "./AddContact";
    import ContactDetail from "./ContactDetail";
    import Contactdelete from "./Contactdelete";
    import api from '../api/contacts';
    import { v4 as uuidv4 } from 'uuid';
    import EditContact from "./EditContact";
    import { addDoc, collection, getDocs,deleteDoc, doc,updateDoc } from "firebase/firestore";
    import { db } from "../firebase";

    function App() {
        const  [contacts,setContacts]=useState([]);
        const  [searchcontact,setSearchContact]=useState("");
        const  [searchResult,setSearchResult]=useState([]);

        //Retrieve contacts
        const retrieveContacts = async () => {
            try {
            // Reference to the "contacts" collection in Firestore
            const contactsCollection = collection(db, "contacts");
            
            // Fetching documents from the contacts collection
            const querySnapshot = await getDocs(contactsCollection);
            
            // Extracting data from Firestore documents
            const contactsList = querySnapshot.docs.map(doc => ({
                id: doc.id, // Firestore provides a document ID
                ...doc.data(), // Get all data from the document
            }));
        
            return contactsList;
            } catch (error) {
            console.error("Error fetching contacts:", error);
            return [];
            }
        };

        // Add Contacts
        const addcontacthandler = async (contactname, email) => {
            const newContact = {
                name: contactname,
                emailid: email
            };
            const docRef = await addDoc(collection(db, "contacts"), newContact);
            console.log("NEW CONTACT ADDED:",newContact);
            setContacts(prevContacts => [...prevContacts, { id: docRef.id, ...newContact }]);
        };

        // Retrieve Cntacts
        useEffect(()=>{
            const getAllContacts=async()=>{
                const allContacts=await retrieveContacts();
                if(allContacts){
                    setContacts(allContacts);
                }
            }
            getAllContacts();
        },[])

        // Remove contact
        const removehandler = async (id) => {
            try {
                console.log(id);

                // Reference to the contact document in Firestore
                const contactDocRef = doc(db, "contacts", id);

                // Delete the document from Firestore
                await deleteDoc(contactDocRef);

                // Remove the contact from the local state (UI)
                const newContactList = contacts.filter((contact) => contact.id !== id);
                setContacts(newContactList);
            } catch (error) {
                console.error("Error removing contact:", error);
            }
        };

        
        // UpdateContacts
        const UpdateContact = async (id, updatedName, updatedEmail) => {
            try {
                const updatedContact = { name: updatedName, emailid: updatedEmail };
                
                // Reference the specific document to update in Firestore
                const contactDocRef = doc(db, "contacts", id);
        
                // Update the document in Firestore
                await updateDoc(contactDocRef, updatedContact);
        
                // Update the local state
                setContacts(
                    contacts.map((contact) =>
                        contact.id === id ? { ...contact, ...updatedContact } : contact
                    )
                );
            } catch (error) {
                console.error("Error updating contact:", error);
            }
        };

        //Filter
        const searchhandler=(searchterm)=>{
            // console.log(searchterm);    
            setSearchContact(searchterm);
            if(searchterm!==""){
                const filteredContacts=contacts.filter((contact)=>{
                    console.log(Object.values(contact));
                    return Object.values(contact).join(" ").toLowerCase().includes(searchterm.toLowerCase())
                })
                setSearchResult(filteredContacts);
            }
            else   
                setSearchResult(contacts);
        }
        
        return (
            <div className="ui container" style={{ paddingTop: '70px' }}>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<ContactList searchContact={searchcontact} searchkeyword={searchhandler} contacts={searchcontact.length<1?contacts:searchResult} />} />
                        <Route path="/add" element={<AddContact addcontacthandler={addcontacthandler} />} />
                        <Route path="/contact/:id" element={<ContactDetail contact={searchcontact.length<1?contacts:searchResult}/>} />
                        <Route path="/contactdelete/:id" element={<Contactdelete getContactId={removehandler}/> }/>
                        <Route path="/editcontact/:id" element={<EditContact contacts={contacts} updatehandler={UpdateContact}/> }/>
                    </Routes>
                </Router>
            </div>
        );
    }

    export default App
