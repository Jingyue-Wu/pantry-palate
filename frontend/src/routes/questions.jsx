import { useContext, useEffect, useState } from 'react'
import { Data, RecipeData } from '../components/context'
import { useNavigate } from 'react-router-dom';

export default function Questions() {
  // const [ingredientList, setIngredientList] = useState([])
  const [inputText, setInputText] = useState('')
  const { modelData, setModelData } = useContext(Data)
  const { recipeData, setRecipeData } = useContext(RecipeData);
  const navigate = useNavigate();



  useEffect(() => {
    console.log(modelData)
  }, [])

  const handleInputChange = (event) => {
    setInputText(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (inputText.trim() !== '') {
      // check if already in list
      if (modelData.some((item) => item.name === inputText)) {
        alert('already in list')
      } else {
        setModelData([...modelData, { name: inputText }])
        setInputText('')
      }
    }
  }

  const sendData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/retrieve-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the correct content type
        },
        body: JSON.stringify({ recipeData: modelData }),
      });

      if (response.ok) {
        console.log('Food data sent successfully');
      } else {
        console.error('Error sending food data to server');
        alert('Error sending food data to server');
      }

      const _data = await response.json();

      setRecipeData(_data)

      console.log(_data);

      navigate('/recipes')


      // redirect to questions page
      // navigate('/questions')
    } catch (error) {
      console.error('Error sending image data:', error);
    }
  };


  return (
    <>
      <div className='lg:m-auto lg:max-w-[40%] m-[10%]'>
        <h1 className="text-2xl font-medium text-white mb-4">Ingredients 🧂</h1>
        <br />
        <div className='bg-card rounded-3xl flex flex-row justify-start'>

          <ul className="bg-white p-5 w-full rounded-2xl">
            {modelData.map((item, index) => {
              const itemNameWithoutUnderscores = item.name.replace(/_/g, ' ');

              return (
                <li key={index} className='flex gap-4 justify-between m-3'>

                  <div className='flex'>

                    • {itemNameWithoutUnderscores}

                  </div>

                  <button
                    onClick={() => {
                      setModelData(modelData.filter((item, i) => i !== index))
                    }}
                    className='hover:bg-red-500 rounded-full transition-all hover:text-white flex flex-row justify-right'
                  >
                    ❌
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Input text field that adds to ingredientList */}
        <form onSubmit={handleFormSubmit}>
          <label className='flex justify-center mt-3'>
            <input
              placeholder='Any missing ingredients?'
              className='bg-card rounded-3xl text-sm p-3 m-2 w-full mb-8'
              type='text'
              value={inputText}
              onChange={handleInputChange}
            />
          </label>
          <button
            className='bg-primary rounded-3xl py-2 px-4 hover:bg-white transition-all outline-2 flex flex-row justify-center mb-8'
            type='submit'
          >
            Add to List
          </button>

          <button className='px-4 py-2 bg-white text-bg text-sm rounded-full cursor-pointer' onClick={sendData}>
            Confirm →
          </button>
        </form>
      </div>
    </>
  )
}
