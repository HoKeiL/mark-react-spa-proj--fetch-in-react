import { useState } from "react";

interface Dog {
  message: string;
  status: string;
}

function App() {
  const [dogPic, setDogPic] = useState<Dog>();
  const [storedDog, setStoredDog] = useState<Dog[]>([])

  const handleGetDogPic = async () => {
    const response = await fetch(
      "https://dog.ceo/api/breeds/image/random"
    );
    const jsonBody: Dog = await response.json();
    setDogPic(jsonBody);
    if (dogPic !== undefined){
      setStoredDog(prev => [...prev, dogPic]);
    }
  };

  
  // const handleGetDogPic = () => {
  //   fetch("https://dog.ceo/api/breeds/image/random")
  //     .then((response) => response.json())
  //     .then((jsonBody: Dog) => setDogPic(jsonBody));
  // if (dogPic !== undefined){
  //   setStoredDog(prev => [...prev, dogPic]);
  // }
  // };

  const PreviousDogs = storedDog.map((dogPic) => {
    return <img src={dogPic.message} alt="stored doggos" />
  })


  if (dogPic) {
    return (
      <div>
        <h1>doggo picture app</h1>
        <details>
           <summary>random doggo</summary>
          <img src=	{dogPic.message} alt="random doggo" />
        </details>
        <hr />
        <button onClick={handleGetDogPic}>Get another doggo</button>
        <div>
          <h3>Previous dogs</h3>
          {PreviousDogs}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>doggo picture app</h1>
        <p>
          Click the button to trigger a <code>fetch</code> that gets a random
          doggo picture from an API!
        </p>
        <button onClick= {handleGetDogPic}>Get doggo</button>
      </div>
    );
  }
}

export default App;
