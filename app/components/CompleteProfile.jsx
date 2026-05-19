import  React,{useState} from 'react'
import Modal from "./Modal";



function CompleteProfile() {


const [openModal, setOpenModal] = useState(false);

  const [preview, setPreview] = useState(null);

  const [image, setImage] = useState(null);

  
 
    const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("file", image);
    formData.append("email", session.user.email);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    console.log("Upload response:", data);
    console.log("Uploaded image URL successfullly:");
  };


  return (

  <div className="min-h-screen bg-gray-50 flex justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        

          <div className="flex items-center gap-4 border-b pb-6">
            <img
              src={preview || "https://i.pravatar.cc/100"}
              alt="profile"
              className="w-16 h-16 rounded-full object-cover border"
            />

            <button
              onClick={() => setOpenModal(true)}
              className="ml-auto px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800 transition"
            >
              Edit Profile
            </button>
          </div>

          {/* Upload Section */}
          <form onSubmit={handleUpload} className="mt-8 space-y-5">
            <h3 className="text-lg font-semibold text-gray-700">
              Update Profile Image
            </h3>

            {/* Preview Box */}
            {preview && (
              <div className="flex justify-center">
                <img
                  src={preview}
                  alt="preview"
                  className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow"
                />
              </div>
            )}

            {/* Upload Box */}
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-gray-500 transition bg-gray-50">
              <span className="text-gray-600 text-sm">
                Click to select or change image
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#8B5CF6] text-white font-medium hover:bg-[#7C4DF2] transition cursor-pointer  "
            >
              Upload Image
            </button>
          </form>
        </div>

        {/* Modal */}
        {/* <Modal
          user={user}
          open={openModal}
          onClose={() => setOpenModal(false)}
        /> */}
      </div>         
  )
}

export default CompleteProfile
