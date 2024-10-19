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

function App() {
    const  [contacts,setContacts]=useState([]);
    const  [searchcontact,setSearchContact]=useState("");
    const  [searchResult,setSearchResult]=useState([]);

    //Retrieve contacts
    const retrieveContacts=async()=>{
        const response=await api.get("/contacts");
        return response.data;
    }

    // Add Contacts
    const addcontacthandler = async (contactname, email) => {
        const newContact = {
            id: uuidv4(),
            name: contactname,
            emailid: email  
        };
        const response=await api.post("/contacts",newContact);
        setContacts(prevContacts => [...prevContacts, response.data]);
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
    const removehandler = async(id) => {
        console.log(id);
        await api.delete(`/contacts/${id}`);
        // console.log(response.data);
        const newContactList = contacts.filter((contact) => contact.id !== id);
        setContacts(newContactList);
    };
    
    // UpdateContacts
    const UpdateContact=async(id, updatedName, updatedEmail)=>{
        const updatedContact = { name: updatedName, emailid: updatedEmail };
        const response = await api.put(`/contacts/${id}`, updatedContact);
        setContacts(
            contacts.map((contact) =>
                contact.id === id ? { ...response.data } : contact
            )
        );
    }

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
