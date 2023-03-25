import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setContacts(response.data);
    };

    fetchContacts();
  }, []);

  const handleAddContact = async (e) => {
    e.preventDefault();
    const newContact = {
      name,
      email,
      phone,
      website,
    };
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
    setContacts([...contacts, response.data]);
    setName('');
    setEmail('');
    setPhone('');
    setWebsite('');
  };

  const handleUpdateContact = async (id, updatedContact) => {
    await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedContact);
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === id) {
        return { ...contact, ...updatedContact };
      }
      return contact;
    });
    setContacts(updatedContacts);
  };

  const handleDeleteContact = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    const filteredContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(filteredContacts);
  };

  return (
    <div>
      <h1>Contact List</h1>
      <form onSubmit={handleAddContact}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <button type="submit">Add Contact</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.website}</td>
              <td>
                <button onClick={() => handleUpdateContact(contact.id, { name: 'Updated Name' })}>
                  Update
                </button>
                <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
