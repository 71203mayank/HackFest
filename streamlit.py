import streamlit as st
import requests
import json
import PyPDF2
from io import BytesIO

# Set the URL of your FastAPI application
API_URL = "http://localhost:1000"

# Custom CSS to improve our Streamlit app's aesthetics
st.markdown("""
<style>
.big-font {
    font-size:30px !important;
    font-weight: bold;
}
</style>
""", unsafe_allow_html=True)

# Image and Title
col1, col2 = st.columns([1, 4])
with col1:
    st.image("/Users/saad/Downloads/Frame 28 white.svg", width=100)  # Adjust path and width as necessary
with col2:
    st.markdown('<p class="big-font">AI-Assisted Document Preparation Tool</p>', unsafe_allow_html=True)

# Mapping of user-friendly labels to API endpoints
endpoints = {
    "Review CV": "/review_cv/",
    "Prepare for Job Tests or Interviews": "/prepare/",
    "Build Application Documents": "/build-app/"
}

# Select the API endpoint using user-friendly labels
endpoint_label = st.selectbox(
    "Choose an API endpoint:",
    list(endpoints.keys())
)
endpoint = endpoints[endpoint_label]

def pretty_print_json(json_obj):
    return json.dumps(json_obj, indent=2)

def extract_text_from_pdf(file):
    pdf_reader = PyPDF2.PdfReader(file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

# Forms for different endpoints
if endpoint == "/review_cv/":
    st.header("CV Review", anchor=None)
    uploaded_file = st.file_uploader("Upload your CV (PDF format):", type=['pdf'])
    job_description = st.text_area("Enter the job description:")
    if uploaded_file and st.button("Review CV"):
        cv_text = extract_text_from_pdf(uploaded_file)
        response = requests.post(f"{API_URL}{endpoint}", json={"cv_data": cv_text, "job_description": job_description})
        response_json = response.json()
        st.json(response_json)
        if 'review' in response_json:
            st.text_area("Review Output:", pretty_print_json(response_json['review']), height=300)

elif endpoint == "/prepare/":
    st.header("Prepare for Job Tests or Interviews")
    area = st.text_input("Area of Preparation:")
    time = st.text_input("Available Preparation Time:")
    additional_info = st.text_area("Additional Information:")
    if st.button("Get Preparation Plan"):
        response = requests.post(f"{API_URL}{endpoint}", json={"area": area, "time": time, "additional_info": additional_info})
        response_json = response.json()
        st.json(response_json)
        if 'answer' in response_json:
            st.text_area("Preparation Plan:", pretty_print_json(response_json['answer']), height=300)

elif endpoint == "/build-app/":
    st.header("Build Application Documents")
    doc_type = st.selectbox("Document Type:", ["LOR", "SOP"])
    uploaded_cv = st.file_uploader("Upload your CV (PDF format):", type=['pdf'])
    job_description = st.text_area("Enter the job description:")
    if uploaded_cv and st.button("Build Document"):
        cv_text = extract_text_from_pdf(uploaded_cv)
        response = requests.post(f"{API_URL}{endpoint}", json={"type": doc_type, "cv_data": cv_text, "job_description": job_description})
        response_json = response.json()
        st.json(response_json)
        if 'answer' in response_json:
            st.text_area("Document:", pretty_print_json(response_json['answer']), height=300)

# Footer
st.markdown('<p style="font-size: 12px; text-align: center;">Powered by Streamlit and FastAPI</p>', unsafe_allow_html=True)
