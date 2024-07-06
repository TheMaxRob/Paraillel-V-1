import { useState } from "react";

export default function ProfileSettings() {

    const [ selectedProfile, setSelectedProfile ] = useState('');
    const [ formData, setFormData ] = useState({});

    const formFields = {
        admin: ["Name", "Email", "Phone Number", "Profile Picture", "Department", "Role/Position", "Bio", "District ID", "School ID"],
        teacher: ["Name", "Email", "Phone Number", "Profile Picture", "Subject(s) Taught", "Grade Level(s)", "Bio", "District ID", "School ID"],
        district: ["Name", "Email", "Phone Number", "Profile Picture", "Role/Position", "District Information", "Bio", "District ID"],
      };

    const handleProfileSelection = (e) => {
        setSelectedProfile(e.target.value);
        setFormData({}); // Reset form data when selection changes
    };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const renderForm = () => {
    if (!selectedProfile) return null;

    return (
        <form className="profile-form">
            {formFields[selectedProfile].map((field, index) => (
            <div key={index} className="form-group">
                <label>{field}</label>
                <input
                type="text"
                value={formData[field] || ''}
                onChange={(e) => handleChange(field, e.target.value)}
                />
            </div>
            ))}
            <button type="submit">Save</button>
        </form>
        );
    };

    const handleRoleChange = (event) => {
        setSelectedProfile(event.target.value); 
    };

    return (
        <div>
            <select value={selectedProfile} onChange={handleRoleChange}>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="district">District</option>
            </select>
            {renderForm()}
        </div>
    );
}