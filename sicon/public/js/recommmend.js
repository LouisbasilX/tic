import pandas as pd

# Load dataset
df = pd.read_csv("../data/students.csv")

def recommend_buddy(student_id, df):
    student = df[df['id'] == student_id].iloc[0]
    matches = df[
        (df['id'] != student_id) &
        (df['hobbies'] == student['hobbies']) &
        (abs(df['gpa'] - student['gpa']) <= 0.5)
    ]
    return matches[['id', 'name', 'hobbies', 'gpa']]

# 👇 Call the function and print result
if __name__ == "__main__":
    results = recommend_buddy(100, df)
    print("Recommendations for Student 100:")
    print(results.head())
