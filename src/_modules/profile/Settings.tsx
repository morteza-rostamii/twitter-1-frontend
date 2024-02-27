import Api from "@/_data/routes";
import { Button } from "@chakra-ui/react"
import React, { useState } from "react"

const Settings = () => {
  const [formData, setFormData] = useState({
    username: '',
    image: null,
  });

  const handInputChange = (e: any) => {
    const name = e.target.name;

    switch (name) {
      case 'username':
        setFormData((c:any) => ({
          ...c, 
          username: e.target.value, 
        }));
        break;
      case 'image':
        setFormData((c:any) => ({
          ...c,
          image: e.target.files[0],
        }));
    }
  }

  async function updateProfile(): Promise<any> {
    if (!formData.username || !formData.image) return;
    console.log('--sub');
    const formData1 = new FormData();
    formData1.append('username', formData.username);
    formData1.append('image', formData.image);

    try {
      const data = await Api.updateUser(
        '123',
        formData1,
      );
  
      console.log('profile was updated!', data);
    }
    catch(error:any) {
      console.log(error?.message || error);
    }
  }

  const handSubmit = (e:any) => {
    
    e.preventDefault();
    updateProfile();
  }

  return (
    <div>
      <form 
      className="
      flex flex-col gap-4 text-center
      "
      onSubmit={handSubmit}
      >
        <input 
        id="username" 
        type="text" 
        name="username" 

        value={formData.username}
        onChange={handInputChange}
        />
        <input 
        id="image" 
        type="file" 
        name="image" 

        onChange={handInputChange}
        />

        <Button
        type="submit"
        >
          update
        </Button>
      </form>
    </div>
  )
}

export default Settings