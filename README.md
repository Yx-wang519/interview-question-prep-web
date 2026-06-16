# Interview Question Preparation Web

A simple React + Vite web application for organizing and reviewing interview preparation questions.
The project stores questions in a local JSON file and allows users to browse, filter, and search questions without using a database.

## Screenshot

![Website Screenshot](./src/assets/screenshot.png)

## Current Features

1. Organize questions by homework, such as HW1, HW2, HW3, etc.
2. Organize questions by topic, such as Java, Spring Boot, Database, etc.
3. Search questions by keyword in the question field only.
4. Search questions by keyword in both the question and answer fields.
5. Display each question with its homework label, topic label, question, and answer.
6. Store all question data locally in a JSON file.

## Tech Stack

* React
* Vite
* JavaScript
* CSS
* Local JSON file

## Project Structure

```text
interview-qa-app
├── src
│   ├── data
│   │   └── questions.json
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
├── index.html
└── README.md
```

## How to Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```bash
http://localhost:5173/
```

## How to Add More Questions

Open:

```bash
src/data/questions.json
```

Add a new question object:

```json
{
  "id": 3,
  "hw": "HW3",
  "topic": "Java",
  "question": "What is polymorphism?",
  "answer": "Polymorphism allows one interface or method to have different implementations."
}
```

Make sure each object has:

* id
* hw
* topic
* question
* answer

## Future Improvements

* Add hints for questions, allowing users to choose whether to show the hint or the answer.
* Add a favorite or bookmark feature.
* Add learning status levels, such as Remembered, Familiar, and Unfamiliar.
* Add a random question practice feature so users can randomly select questions and practice answering them.
* Deploy the website to Vercel.

## Purpose

This project is designed to help organize interview preparation questions in a structured and searchable way. It is useful for reviewing technical topics by homework, category, or keyword.