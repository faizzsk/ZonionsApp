import React from 'react';
import Axios from 'axios';
class ImageUpload extends React.Component{
  state = {
    imageUrl: null,
    imageAlt: null,
    data:[]
  }

   handleImageUpload = () => {
   
    const { files } = document.querySelector('input[type="file"]')
const formData = new FormData();
formData.append('file', files[0]);
// replace this with your upload preset name
formData.append('upload_preset', 'ml_default');
const options = {
  method: 'POST',
  body: formData,
};



// const register = () => {
//   Axios({
//     method: "POST",
//     data: {
//       url:this.state.imageUrl,
    
//     },
//    withCredentials: true, //with
//   url: "http://localhost:3000/restaurant/",
 
//   }).then((res) => {
//     this.setState({
//       data:[...this.state.data,res.data.url]
//     })
//   })///console.log(res));
//   console.log("react----=>",this.state.data);
// };



    const { imageUrl, imageAlt } = this.state;

return fetch('https://api.Cloudinary.com/v1_1/fizzsk/image/upload', options)
// return fetch('http://localhost:5000/users/add', options)

  .then(res => res.json())
  .then(res => {
    this.setState({
      imageUrl: res.secure_url,
      imageAlt: `An image of ${res.original_filename}`
    })
  }).then(res=>res)
  .catch(err => console.log(err));
  }


  


  render() {
    const { imageUrl, imageAlt } = this.state;
    
    

    return (
      <main className="App">
        <section className="left-side">
          <form>
            <div className="form-group">
              <input type="file"/>
            </div>

            <button type="button" className="btn" onClick={this.handleImageUpload}>Submit</button>
            <button type="button" className="btn widget-btn">Upload Via Widget</button>
          </form>
        </section>
        <section className="right-side">
          <p>The resulting image will be displayed here</p>
          {imageUrl && (
            <img src={imageUrl} alt={imageAlt} className="displayed-image"/>
          )}
        </section>
        <div>
          {this.state.data}
          <img src={this.state.data}></img>
          </div>
      </main>
    );
  }
}

export default ImageUpload;
