import React from 'react'

import {useState} from 'react'

import Modal from './Modal'



function Profile() {


    const [openModal, setOpenModal] = useState(false);

    const [name ,setName] =useState();

    const [preview, setPreview] = useState(null);

const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setPreview(URL.createObjectURL(file));
  }
};



const handleUpload = async (e) => {
 
const file = e.target.files[0];

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  console.log(data.imageUrl);
};





  return (


     <div className=" " >
      
      <h3 className="text-black "  >Profile</h3>

      <div className="border-3 text-black    " > 
       
       <p className="text-black"> Name  </p>


        <button onClick={() => setOpenModal(true)}>
        Edit Profile 
      </button>
     
        <p className="text-black">Email</p>

      </div>



      <div className=" ">

      <div className=" ">
        <p>Adress</p>
      </div>

     <div className="space-y-3">
{/*   
  <label className="block text-lg font-medium text-gray-700">
    Profile Image
  </label>

  <input
    type="file"
    accept="image/*"
    className="block w-full rounded-lg border border-gray-300 p-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-slate-800 file:px-4 file:py-2 file:text-white hover:file:bg-slate-700"
  /> */}


<form>

<label className="block text-lg font-medium text-gray-700">
    Profile Image
  </label>

  {/* Preview */}
  {preview && (
    <img           
      src={preview}
      alt="Preview"
      className="h-28 w-28 rounded-full object-cover border"
    />
  )}



  {/* Input */}
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="block w-full rounded-lg border border-gray-300 p-3 text-sm
    file:mr-4 file:rounded-md file:border-0
    file:bg-slate-800 file:px-4 file:py-2
    file:text-white hover:file:bg-slate-700"
  />

</div>



</form>


      </div>

       <Modal open={openModal}
             onClose={() => setOpenModal(false)}
      />






    </div>
  )
}

export default Profile
