🏠 AI House Price Predictor
A simple web application that predicts house prices using a machine learning model trained on the Boston Housing Dataset. Built with Python, Flask, and Scikit-learn.

🔍 Features
Predicts house price based on user input (like number of rooms, area, etc.)

Trained using Linear Regression

User-friendly web interface

Custom CSS styling for better look and feel

🧠 Tech Stack
Backend: Python, Flask

ML Library: scikit-learn

Frontend: HTML, CSS

Dataset: Boston Housing (from sklearn.datasets)

📂 Project Structure
csharp
Copy
Edit
.
├── static/
│   └── style.css            # Custom CSS styles
├── templates/
│   └── index.html           # Frontend form
├── app.py                   # Main Flask app
├── model.pkl                # Trained ML model
└── README.md
🚀 How to Run Locally
Clone the repository

bash
Copy
Edit
git clone https://github.com/yourusername/house-price-predictor.git
cd house-price-predictor
Install dependencies

bash
Copy
Edit
pip install -r requirements.txt
Run the app

bash
Copy
Edit
python app.py
Open your browser and visit: https://splendorous-pothos-4c42c5.netlify.app/

📊 How it Works
User fills in house feature details in the form

Flask sends the data to the backend

The ML model (loaded from model.pkl) predicts the price

Predicted result is shown on the webpage
