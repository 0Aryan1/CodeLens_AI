import { useState, useEffect } from 'react'
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import "prismjs/components/prism-javascript"
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
    <div className="app">
      <nav className="nav">
        <div className="nav-brand">
          <span className="brand-text">codelens</span>
        </div>
        <div className="nav-info">
          <span className="status-dot"></span>
          <span>beta v0.1</span>
        </div>
      </nav>
      
      <div className="container">
        <div className="editor-panel">
          <div className="panel-top">
            <span className="panel-label">editor</span>
            <span className="line-count">{code.split('\n').length} lines</span>
          </div>
          
          <div className="code-wrapper">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => {
                try {
                  return prism.highlight(code, prism.languages.javascript, "javascript")
                } catch {
                  return code
                }
              }}
              padding={24}
              style={{
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                fontSize: 14,
                lineHeight: 1.7,
                height: "100%",
                width: "100%",
                outline: "none",
                color: "#e8e8e8",
                background: "#0d0d0d",
                minHeight: "100%",
                caretColor: "#3b82f6"
              }}
              textareaClassName="editor-textarea"
              preClassName="editor-pre"
            />
          </div>
          
          <button
            onClick={reviewCode}
            className="analyze-btn"
            disabled={loading}
          >
            {loading ? 'analyzing...' : 'run analysis'}
          </button>
        </div>
        
        <div className="results-panel">
          <div className="panel-top">
            <span className="panel-label">results</span>
            {review && !loading && <span className="success-badge">✓ complete</span>}
          </div>
          
          <div className="results-content">
            {loading ? (
              <div className="loader-state">
                <div className="loader">
                  <div className="loader-bar"></div>
                </div>
                <p className="loader-text">running analysis...</p>
              </div>
            ) : review ? (
              <div className="review-output">
                <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
              </div>
            ) : (
              <div className="empty">
                <p className="empty-text">no results yet</p>
                <p className="empty-hint">paste your code and run analysis to see feedback</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <footer className="footer">
        <p className="footer-text">developed by Aryan 👨🏻‍💻</p>
      </footer>
    </div>
  )
}



export default App