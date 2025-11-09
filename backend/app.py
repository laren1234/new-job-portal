from flask import Flask, jsonify
from flask_cors import CORS

# Initialize the Flask application
app = Flask(__name__)

# Enable CORS (Cross-Origin Resource Sharing)
# This allows your React frontend (running on a different port)
# to make requests to this backend.
CORS(app)

# A sample list of jobs.
# In a real application, you would fetch this from a database.
SAMPLE_JOBS = [
    {
        "id": 1,
        "title": "Senior React Developer",
        "company": "TechCorp",
        "location": "Remote",
        "description": "Looking for a seasoned React developer to build modern web applications."
    },
    {
        "id": 2,
        "title": "Python Backend Engineer",
        "company": "DataMinds",
        "location": "New York, NY",
        "description": "Build and maintain our data processing pipelines using Python."
    },
    {
        "id": 3,
        "title": "UX/UI Designer",
        "company": "Creative Inc.",
        "location": "San Francisco, CA",
        "description": "Design user-friendly interfaces for our new mobile app."
    }
]

@app.route("/")
def home():
    """A simple route to confirm the backend is running."""
    return "TalentHub Python Backend is running!"

@app.route("/api/jobs", methods=["GET"])
def get_jobs():
    """
    API endpoint to get the list of jobs.
    Your React app would fetch data from this URL.
    """
    return jsonify(SAMPLE_JOBS)

if __name__ == "__main__":
    # Run the app on port 5000 in debug mode
    app.run(debug=True, port=5000)