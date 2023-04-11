import {useState, useEffect, useRef} from "react"
import * as tf from "@tensorflow/tfjs"
import * as tmImage from '@teachablemachine/image';

function App() {
  console.log(tf.getBackend())
  const url = 'https://teachablemachine.withgoogle.com/models/eED5QJI3_/';

  const modelURL = url + 'model.json';
  const metadataURL = url + 'metadata.json';
  
  const [isModelLoading, setIsModelLoading] = useState(false)
  const [setModel] = useState(null)
  const [imageURL, setImageURL] = useState(null)
  const [results, setResults] = useState([])
  const [history, setHistory] = useState([])
  
  const imageRef = useRef()
  const textInputRef = useRef()
  const fileInputtRef = useRef()

  const loadModel = async () => {
    setIsModelLoading(true)
    try {
      const model = await tmImage.load(modelURL, metadataURL);
      setModel(model)
      setIsModelLoading(false)
    } catch (error) {
      console.log(error)
      setIsModelLoading(false)
    }
  }

  const uploadImage = (e) => {
    const {files} = e.target
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0])
      setImageURL(url )
    } else {
      setImageURL(null)
    }
  }

  const identify = async() => {
    textInputRef.current.value = ""
    const model = await tmImage.load(modelURL, metadataURL);
   const results = await model.predict(imageRef.current)
    setResults(results)
    smallDesc()
  }

  const handleOnChange = (e) => {
    setImageURL(e.target.value)
    setResults([])
  }

  const triggerUpload = () => {
    fileInputtRef.current.click()
  }

  useEffect(() => {
    loadModel()
  }, [])

 useEffect(() => {
    if(imageURL){
      setHistory([imageURL, ...history])
    }
  }, [imageURL])

  if(isModelLoading){
    return <h2><center>Loading..</center></h2>
  }

  // description function //

  const finalResult = () => {
    let mainResult = []
    results.length > 0 && results.map((result) => {
      return(result.probability > 0.5 && mainResult.push(result.className))
    })
    return mainResult[0]
  }

  const smallDesc = () => {
    let tempSmallDescrip = ""
    if (finalResult() === "Academic Art"){ tempSmallDescrip = "Academic art, or academicism or academism, is a style of painting and sculpture produced under the influence of European academies of art. Specifically, academic art is the art and artists influenced by the standards of the French Académie des Beaux-Arts, which was practiced under the movements of Neoclassicism and Romanticism, and the art that followed these two movements in the attempt to synthesize both of their styles, and which is best reflected by the paintings of William-Adolphe Bouguereau, Thomas Couture, and Hans Makart." }
    else if (finalResult() === "Art Nouveau"){ tempSmallDescrip = "Art Nouveau is an international style of art, architecture, and applied art, especially the decorative arts. The style is known by different names in different languages: Jugendstil in German, Stile Liberty in Italian, Modernisme in Catalan, and also known as the Modern Style in English." }
    else if (finalResult() === "Baroque"){ tempSmallDescrip = "Baroque painting is the painting associated with the Baroque cultural movement. The movement is often identified with Absolutism, the Counter Reformation and Catholic Revival, but the existence of important Baroque art and architecture in non-absolutist and Protestant states throughout Western Europe underscores its widespread popularity." }
    else if (finalResult() === "Expressionism"){ tempSmallDescrip = "Expressionism is a modernist movement, initially in poetry and painting, originating in Northern Europe around the beginning of the 20th century. Its typical trait is to present the world solely from a subjective perspective, distorting it radically for emotional effect in order to evoke moods or ideas.Expressionist artists have sought to express the meaning of emotional experience rather than physical reality." }
    else if (finalResult() === "Japanese Art"){ tempSmallDescrip = "Japanese art covers a wide range of art styles and media, including ancient pottery, sculpture, ink painting and calligraphy on silk and paper, ukiyo-e paintings and woodblock prints, ceramics, origami, and more recently manga and anime. It has a long history, ranging from the beginnings of human habitation in Japan, sometime in the 10th millennium BCE, to the present day." }
    else if (finalResult() === "Neoclassicism"){ tempSmallDescrip = "Neoclassical art, also called Neoclassicism and Classicism, a widespread and influential movement in painting and the other visual arts that began in the 1760s, reached its height in the 1780s and ’90s, and lasted until the 1840s and ’50s. In painting it generally took the form of an emphasis on austere linear design in the depiction of Classical themes and subject matter, using archaeologically correct settings and clothing." }
    else if (finalResult() === "Primitivism"){ tempSmallDescrip = "In the arts of the Western World, Primitivism is a mode of aesthetic idealization that means to recreate the experience of the primitive time, place, and person, either by emulation or by recreation. In Western philosophy, Primitivism proposes that the people of a primitive society possess a morality and an ethics that are superior to the urban value system of civilized people; thus, in art and in philosophy." }
    else if (finalResult() === "Realism"){ tempSmallDescrip = "Realism in the arts is generally the attempt to represent subject matter truthfully, without artificiality and avoiding speculative and supernatural elements. The term is often used interchangeably with naturalism, although these terms are not synonymous. Naturalism, as an idea relating to visual representation in Western art, seeks to depict objects with the least possible amount of distortion and is tied to the development of linear perspective and illusionism in Renaissance Europe." }
    else if (finalResult() === "Renaissance"){ tempSmallDescrip = "Renaissance art is the painting, sculpture, and decorative arts of the period of European history known as the Renaissance, which emerged as a distinct style in Italy in about AD 1400, in parallel with developments which occurred in philosophy, literature, music, science, and technology." }
    else if (finalResult() === "Rococo"){ tempSmallDescrip = "Rococo painting represents the expression in painting of an aesthetic movement that flourished in Europe between the early and late 18th century, migrating to America and surviving in some regions until the mid-19th century. The painting of this movement is divided into two sharply differentiated camps. One forms an intimate, carefree visual document of the way of life and worldview of the eighteenth-century European elites, and the other, adapting constituent elements of the style to the monumental decoration of churches and palaces, served as a means of glorifying faith and civil power." }
    else if (finalResult() === "Romanticism"){ tempSmallDescrip = "Romanticism was an artistic, literary, musical and intellectual movement that originated in Europe towards the end of the 18th century; in most areas it was at its peak in the approximate period from 1800 to 1850. Romanticism was characterized by its emphasis on emotion and individualism, clandestine literature, paganism, idealization of nature, suspicion of science and industrialization, as well as glorification of the past with a strong preference for the medieval rather than the classical." }
    else if (finalResult() === "Symbolism"){ tempSmallDescrip = "Symbolism was a late 19th-century art movement of French and Belgian origin in poetry and other arts seeking to represent absolute truths symbolically through language and metaphorical images, mainly as a reaction against naturalism and realism." }
    else if (finalResult() === "Western Medievel"){ tempSmallDescrip = "The medieval art of the Western world covers a vast scope of time and place, over 1000 years of art in Europe, and at certain periods in Western Asia and Northern Africa. It includes major art movements and periods, national and regional art, genres, revivals, the artists' crafts, and the artists themselves." }
    return tempSmallDescrip
  }

  return (
    <center>
    <div className="App">
      <h1 className="header">Depict Art</h1>
      <div className="inputHolder">
        <input className="uploadInput" type="file" accept="image/*" capture="camera" onChange={uploadImage} ref={fileInputtRef}/>
        <button className="uploadImage" onClick={triggerUpload}>Upload Art</button>
        <span className="or"> OR </span>
        <input className="imageURL" type="text" placeholder="Paste Image URL" ref={textInputRef} onChange={handleOnChange}></input>
      </div>
      <div className="mainWrapper">
        <div className="mainContent">
          <div className="imageHolder">
            {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef}></img>}
          </div>
          {results.length > 0 && <div className="resultsHolder">
            {results.map((result, index) => {
              return(
               result.probability > 0.5 && <div className="result" key={result.className}>
                  <span className="name">{result.className}</span>
                  <span className="confidence">Confidence level: {(result.probability * 100).toFixed(2)}%</span>
                </div>
              )
            })}
            </div>}
            <div className="smallDescriptionWrapper">
            <span className="smallDescription">{smallDesc()}</span>
            </div>
        </div>
        {imageURL && <button className="button" onClick={identify}>Identify Art</button>}
      </div>
      {history.length > 0 && <div className="recentPredictions">
        <h2>Recent Images</h2>
        <div className="recentImages">
          {history.map((image, index) => {
            return(
              index < 5 && <div className="recentPrediction" key={`${image}${index}`}>
              <img src={image} alt="Recent Prediction" onClick={() => setImageURL(image)}></img>
            </div>
            )
          })}
        </div>
      </div>}
    </div>
    </center>
  );
}

export default App;
