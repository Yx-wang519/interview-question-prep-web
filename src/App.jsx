import { useMemo, useState } from "react";
import questions from "./data/questions.json";
import "./App.css";

// 主题徽章的柔和配色，按 topic 名稳定取色
const TOPIC_COLORS = [
  "badge-violet",
  "badge-blue",
  "badge-emerald",
  "badge-amber",
  "badge-rose",
  "badge-cyan",
];

function topicColor(topic) {
  let hash = 0;
  for (let i = 0; i < topic.length; i++) {
    hash = (hash * 31 + topic.charCodeAt(i)) >>> 0;
  }
  return TOPIC_COLORS[hash % TOPIC_COLORS.length];
}

// 按作业编号自然排序（Homework 2 在 Homework 10 之前）
function naturalCompare(a, b) {
  const na = parseInt(String(a).replace(/\D/g, ""), 10);
  const nb = parseInt(String(b).replace(/\D/g, ""), 10);
  if (!Number.isNaN(na) && !Number.isNaN(nb) && na !== nb) return na - nb;
  return String(a).localeCompare(String(b));
}

// 把命中的关键词高亮出来
function highlight(text, keyword) {
  if (!keyword) return text;
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = String(text).split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <mark key={i}>{part}</mark>
    ) : (
      part
    )
  );
}

function App() {
  const [selectedHw, setSelectedHw] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [keyword, setKeyword] = useState("");
  const [searchMode, setSearchMode] = useState("question");

  const hwOptions = useMemo(() => {
    const set = [...new Set(questions.map((q) => q.hw))].sort(naturalCompare);
    return ["All", ...set];
  }, []);

  const topicOptions = useMemo(() => {
    const set = [...new Set(questions.map((q) => q.topic))].sort((a, b) =>
      String(a).localeCompare(String(b))
    );
    return ["All", ...set];
  }, []);

  const filteredQuestions = useMemo(() => {
    const lowerKeyword = keyword.toLowerCase().trim();

    return questions.filter((item) => {
      const matchHw = selectedHw === "All" || item.hw === selectedHw;
      const matchTopic = selectedTopic === "All" || item.topic === selectedTopic;

      const searchText =
        searchMode === "question"
          ? item.question
          : `${item.question} ${item.answer}`;

      const matchKeyword =
        lowerKeyword === "" ||
        searchText.toLowerCase().includes(lowerKeyword);

      return matchHw && matchTopic && matchKeyword;
    });
  }, [selectedHw, selectedTopic, keyword, searchMode]);

  const trimmedKeyword = keyword.trim();
  const count = filteredQuestions.length;

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo-chip">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            <path d="M9.6 9a2.4 2.4 0 1 1 3 2.4c-.7.2-1.1.9-1.1 1.7" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <h1>Interview Q&A Bank</h1>
        <p className="subtitle">
          Browse by homework or topic, and search across questions and answers.
        </p>
      </header>

      <div className="toolbar">
        <div className="search-box">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search keyword..."
            aria-label="Search keyword"
          />
          {keyword && (
            <button
              className="clear-btn"
              onClick={() => setKeyword("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="controls">
          <label className="field">
            <span>Homework</span>
            <select
              value={selectedHw}
              onChange={(e) => setSelectedHw(e.target.value)}
            >
              {hwOptions.map((hw) => (
                <option key={hw} value={hw}>
                  {hw}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Topic</span>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              {topicOptions.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </label>

          <div className="field field-toggle">
            <span>Search in</span>
            <div className="segmented" role="group" aria-label="Search scope">
              <button
                type="button"
                className={searchMode === "question" ? "active" : ""}
                onClick={() => setSearchMode("question")}
              >
                Question
              </button>
              <button
                type="button"
                className={searchMode === "question_answer" ? "active" : ""}
                onClick={() => setSearchMode("question_answer")}
              >
                Q + Answer
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="result-count">
        <strong>{count}</strong> {count === 1 ? "question" : "questions"} found
      </p>

      {count === 0 ? (
        <div className="empty-state">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <p>No questions match your filters. Try clearing the search or changing the filters.</p>
        </div>
      ) : (
        <div className="card-list">
          {filteredQuestions.map((item) => (
            <article className="card" key={item.id}>
              <div className="card-tags">
                <span className="badge badge-hw">{item.hw}</span>
                <span className={`badge ${topicColor(item.topic)}`}>
                  {item.topic}
                </span>
              </div>
              <h2 className="question">
                {highlight(item.question, trimmedKeyword)}
              </h2>
              <p className="answer">
                {highlight(item.answer, trimmedKeyword)}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
