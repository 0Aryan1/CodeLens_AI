import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  
  const [ code, setCode ] = useState(`// Paste your code here for review`)

  const [ review, setReview ] = useState(``)
  const [ loading, setLoading ] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoading(true)
    setReview('')
    try {
      const response = await axios.post(`${API_URL}/ai/get-review`, { code })
      setReview(response.data)
    } catch (error) {
      setReview('Error: Unable to connect to the server. Please make sure the backend is running.',error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Analyzing your code...</p>
            </div>
          ) : (
            <Markdown
              rehypePlugins={[ rehypeHighlight ]}
            >{review}</Markdown>
          )}
        </div>
      </main>
    </>
  )
}



export default App