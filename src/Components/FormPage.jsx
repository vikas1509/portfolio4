import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./Form.css"
import { useImageContext } from './context/contextprovider';
import { PiCoinsBold } from 'react-icons/pi';

function FormPage() {
  const { uploadedImage, setUploadedImage } = useImageContext();
  console.log(uploadedImage,"uploadedimage")
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    video: '',
    skills: [],
    projects: [{ heading: '', description: '', link: '' }],
    award:"",
    // awardsImage:Aimage,
    resume: null,
    bio: '',
    education: '',
    experience: '',
    roleDescription: ''
  });
  


  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    if (selectedImage) {
      setUploadedImage(selectedImage);
    }
  }, [selectedImage, setUploadedImage]);

  // Rest of your component code...

  

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split('\n').map(skill => skill.trim()).filter(skill => skill !== '');
    setFormData({
      ...formData,
      skills: skills
    });
  };

  const handleProjectsChange = (e, index, field) => {
    const newProjects = [...formData.projects];
    newProjects[index][field] = e.target.value;
    setFormData({
      ...formData,
      projects: newProjects
    });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { heading: '', description: '', link: '' }]
    });
  };

  const handleAwardsChange = (e) => {
    setFormData({
      ...formData,
      award: e.target.value
    });
  };
  

  // const addAward = () => {
  //   setFormData({
  //     ...formData,
  //     awards: [...formData.awards, { name: '', photos: [] }]
  //   });
  // };


  const handleFileChangeFunction =(e)=>{
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);
    
    const imageUrl = URL.createObjectURL(imageFile);
    console.log("form",imageUrl);
    setUploadedImage(imageUrl);
    localStorage.setItem('uploadedImage', imageUrl);
    
    
  }

  
  // const handleFileChange = (e, index, field) => {
  
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const newAwards = [...formData.awards];
  //     // Check if the photos array already exists for the award, if not, initialize it
  //     if (!newAwards[index].photos) {
  //       newAwards[index].photos = [];
  //     }
  //     // Push the new photo to the photos array
  //     newAwards[index].photos.push(reader.result);
  //     // Update the state with the new photos array
  //     setFormData(prevFormData => ({
  //       ...prevFormData,
  //       awards: newAwards

  //     }));
    
  //   };
  //   reader.readAsDataURL(file);
  // };
  
  
  
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      resume: file
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate('/portfolio', { state: { formData } });
  };

  return (
    <section id="form">
      <h2>Submit Your Information</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
        <label htmlFor="github">GitHub:</label>
        <input type="text" id="github" name="github" value={formData.github} onChange={handleInputChange} required />
        <label htmlFor="linkedin">LinkedIn:</label>
        <input type="text" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleInputChange} required />
        <label htmlFor="video">Video:</label>
        <input type="text" id="video" name="video" value={formData.video} onChange={handleInputChange} required />

        <label htmlFor="resume">Resume:</label>
        <input type="file" id="resume" name="resume" onChange={handleResumeChange} accept=".pdf" required />

        <label htmlFor="projects">Projects:</label>
        {formData.projects.map((project, index) => (
          <div key={index}>
            <label htmlFor={`project-heading-${index}`}>Project Heading:</label>
            <input
              type="text"
              id={`project-heading-${index}`}
              value={project.heading}
              onChange={(e) => handleProjectsChange(e, index, 'heading')}
              required
            />
            <label htmlFor={`project-description-${index}`}>Project Description:</label>
            <textarea
              id={`project-description-${index}`}
              value={project.description}
              onChange={(e) => handleProjectsChange(e, index, 'description')}
              required
            ></textarea>
            <label htmlFor={`project-link-${index}`}>Project Link:</label>
            <input
              type="text"
              id={`project-link-${index}`}
              value={project.link}
              onChange={(e) => handleProjectsChange(e, index, 'link')}
              required
            />
          </div>
          
        ))}
        <button type="button" onClick={addProject}>Add Project</button>

        <label htmlFor="awards">Awards/Certificates:</label>
        
          <div >
            
           
            <label htmlFor="awardsImage">Certificate Photo:</label>
            <input
              type="file"
              id="awardsImage"
              onChange={(e) => handleFileChangeFunction(e)}
              accept="image/*"
              required
            />
            <label htmlFor="award">Certificate Heading:</label>
<input
  type="text"
  id="award"
  value={formData.award}
  onChange={(e) => handleAwardsChange(e)}
  required
/>
           
          </div>
{/*        
        <button type="button" onClick={addAward}>Add Award/Certificate</button> */}

        <label htmlFor="skills">Skills:</label>
        <textarea id="skills" name="skills" value={formData.skills.join('\n')} onChange={handleSkillsChange}></textarea>
        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange}></textarea>
        <label htmlFor="education">Education:</label>
        <textarea id="education" name="education" value={formData.education} onChange={handleInputChange}></textarea>
        <label htmlFor="experience">Experience:</label>
        <textarea id="experience" name="experience" value={formData.experience} onChange={handleInputChange}></textarea>
        <label htmlFor="roleDescription">Role Description:</label>
        <textarea id="roleDescription" name="roleDescription" value={formData.roleDescription} onChange={handleInputChange}></textarea>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default FormPage;
