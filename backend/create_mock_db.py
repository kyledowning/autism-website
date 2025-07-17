import sqlite3

connection = sqlite3.connect('mock.db')
connection.execute("DROP TABLE IF EXISTS data")
connection.commit()
connection.execute("""
    CREATE TABLE data(
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        desc TEXT NOT NULL
    )
""")
connection.commit()

# Add 20 mock article entries.
connection.execute("""
    INSERT INTO data(id, title, desc) VALUES
    (1, 'Article 1', 'The rise of smart cities and their impact on daily life'),
    (2, 'Article 2', 'A deep dive into the mysteries of black holes'),
    (3, 'Article 3', 'The cultural history of bread around the world'),
    (4, 'Article 4', 'How wearable technology is changing healthcare'),
    (5, 'Article 5', 'Exploring the forgotten languages of ancient civilizations'),
    (6, 'Article 6', 'The role of bees in sustaining global ecosystems'),
    (7, 'Article 7', 'A beginner’s guide to sustainable living'),
    (8, 'Article 8', 'The science behind human memory and learning'),
    (9, 'Article 9', 'An overview of the latest breakthroughs in AI'),
    (10, 'Article 10', 'Why oceans are Earth’s last unexplored frontier'),
    (11, 'Article 11', 'The psychology behind habits and how to change them'),
    (12, 'Article 12', 'A history of timekeeping from sundials to atomic clocks'),
    (13, 'Article 13', 'The evolution of transportation technology'),
    (14, 'Article 14', 'Understanding the basics of quantum mechanics'),
    (15, 'Article 15', 'The impact of social media on modern communication'),
    (16, 'Article 16', 'How architecture shapes the way we experience space'),
    (17, 'Article 17', 'The future of food: lab-grown meat and vertical farming'),
    (18, 'Article 18', 'Space tourism: preparing for commercial trips to orbit'),
    (19, 'Article 19', 'The importance of biodiversity in maintaining balance'),
    (20, 'Article 20', 'Exploring the art and science of cinematography')
""")

connection.commit()
print('success!')
