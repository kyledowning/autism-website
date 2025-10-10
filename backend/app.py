from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os

# Allow Cross-Origin
app = Flask(__name__)
CORS(app)

# Database filepath
DB_PATH = os.getenv('AUTISM_DB_PATH', './autism_research_updated.db')

# Return JSON format database contents based on search and filter options.
@app.route('/api/data', methods=['GET'])
def search_data():
    with sqlite3.connect(DB_PATH) as conn:
        # Extract query parameters convert for use in SQL query.
        search_term = request.args.get('q', '').lower()
        search_type = request.args.get('searchtype', '').lower()
        dataset = request.args.get('dataset', '')
        filter_mapping = {
            'challenge': request.args.get('challenge', '').lower(),
            'targetuser': request.args.get('targetuser', '').lower(),
            'genderincludes': request.args.get('genderincludes', '').lower(),
            'race': request.args.get('race', '').lower(),
            'problem': request.args.get('problem', '').lower(),
            'gender': request.args.get('gender', '').lower(),
            'language': request.args.get('language', '').lower(),
            'age': request.args.get('age', '').lower(),
            'level': request.args.get('level', '').lower(),
            'participantnumber': request.args.get('participantnumber', '').lower(),
            'using': request.args.get('using', '').lower(),
            'group': request.args.get('group', '').lower(),
            'level': request.args.get('level', '').lower(),
            'technology': request.args.get('technology', ''),
        }
        filter_list = [f"{key}_{value}" for key, value in filter_mapping.items() if value and value.strip()]
        placeholders = ','.join('?' * len(filter_list))

        # Create and execute SQL query based on users filter and search options.
        if search_type == "t1":
            if (len(filter_list) == 0):
                if dataset:
                    response = conn.execute("""
                        SELECT DISTINCT urls, doi, title, abstract, keywords
                        FROM paper
                        WHERE (abstract LIKE ? OR title LIKE ?) AND dataset = ?
                        ORDER BY year desc
                    """, (f'%{search_term}%', f'%{search_term}%', dataset)).fetchall()
                else:
                    response = conn.execute("""
                        SELECT DISTINCT urls, doi, title, abstract, keywords
                        FROM paper
                        WHERE abstract LIKE ? OR title LIKE ?
                        ORDER BY year desc
                    """, (f'%{search_term}%', f'%{search_term}%')).fetchall()
            else:
                if dataset:
                    response = conn.execute(f"""
                        SELECT urls, doi, title, abstract, keywords
                        FROM Paper p
                        WHERE p.id IN (
                            SELECT paper_id
                            FROM PaperCode
                            WHERE code IN ({placeholders})
                            GROUP BY paper_id
                            HAVING COUNT(DISTINCT code) = ?
                        ) AND (p.abstract LIKE ? OR p.title LIKE ?) AND p.dataset = ?
                        ORDER BY year desc
                    """, filter_list + [len(filter_list), f'%{search_term}%', f'%{search_term}%', dataset]).fetchall()
                else:
                    response = conn.execute(f"""
                        SELECT urls, doi, title, abstract, keywords
                        FROM Paper p
                        WHERE p.id IN (
                            SELECT paper_id
                            FROM PaperCode
                            WHERE code IN ({placeholders})
                            GROUP BY paper_id
                            HAVING COUNT(DISTINCT code) = ?
                        ) AND (p.abstract LIKE ? OR p.title LIKE ?)
                        ORDER BY year desc
                    """, filter_list + [len(filter_list), f'%{search_term}%', f'%{search_term}%']).fetchall()
        
        # t2: FULL TEXT BASED
        else:
            if (len(filter_list) == 0):
                if dataset:
                    response = conn.execute("""
                        SELECT DISTINCT urls, doi, title, abstract, keywords
                        FROM paper as p
                        LEFT JOIN PaperText as t
                        ON p.id = t.id
                        WHERE (t.text LIKE ?) AND dataset = ?
                        ORDER BY year desc
                    """, (f'%{search_term}%', dataset)).fetchall()
                else:
                    response = conn.execute("""
                        SELECT DISTINCT urls, doi, title, abstract, keywords
                        FROM paper as p
                        LEFT JOIN PaperText as t
                        ON p.id = t.id
                        WHERE (t.text LIKE ?)
                        ORDER BY year desc
                    """, (f'%{search_term}%',)).fetchall()
            else:
                if dataset:
                    response = conn.execute(f"""
                        SELECT urls, doi, title, abstract, keywords
                        FROM Paper p
                        LEFT JOIN PaperText as t
                        ON p.id = t.id
                        WHERE p.id IN (
                            SELECT paper_id
                            FROM PaperCode
                            WHERE code IN ({placeholders})
                            GROUP BY paper_id
                            HAVING COUNT(DISTINCT code) = ?
                        ) AND (t.text LIKE ?) AND p.dataset = ?
                        ORDER BY year desc
                    """, filter_list + [len(filter_list), f'%{search_term}%', dataset]).fetchall()
                else:
                    response = conn.execute(f"""
                        SELECT urls, doi, title, abstract, keywords
                        FROM Paper p
                        LEFT JOIN PaperText as t
                        ON p.id = t.id                        
                        WHERE p.id IN (
                            SELECT paper_id
                            FROM PaperCode
                            WHERE code IN ({placeholders})
                            GROUP BY paper_id
                            HAVING COUNT(DISTINCT code) = ?
                        ) AND (t.text LIKE ?)
                        ORDER BY year desc
                    """, filter_list + [len(filter_list), f'%{search_term}%']).fetchall()
        
        # Convert response to JSON format.
        json_response = []
        for urls, doi, title, abstract, keywords in response:
            json_entry = {
                'urls': urls if urls else "https://doi.org/" + doi if doi else "arc.cs.wwu.edu",
                'title': title,
                'abstract': abstract,
                'keywords': keywords,
            }
            json_response.append(json_entry)
        
        return jsonify({
            'success': True,
            'data': json_response,
            'count': len(json_response)
        })

@app.route('/api/visualizations/yeardistribution', methods=['GET'])
def get_year_distribution():
    with sqlite3.connect(DB_PATH) as conn:
        search_term = request.args.get('q', '').lower()
        search_type = request.args.get('searchtype', '').lower()
        dataset = request.args.get('dataset', '')
        filter_mapping = {
            'challenge': request.args.get('challenge', '').lower(),
            'targetuser': request.args.get('targetuser', '').lower(),
            'genderincludes': request.args.get('genderincludes', '').lower(),
            'race': request.args.get('race', '').lower(),
            'problem': request.args.get('problem', '').lower(),
            'gender': request.args.get('gender', '').lower(),
            'language': request.args.get('language', '').lower(),
            'age': request.args.get('age', '').lower(),
            'level': request.args.get('level', '').lower(),
            'participantnumber': request.args.get('participantnumber', '').lower(),
            'using': request.args.get('using', '').lower(),
            'group': request.args.get('group', '').lower(),
            'level': request.args.get('level', '').lower(),
            'technology': request.args.get('technology', ''),
        }

        filter_list = [f"{key}_{value}" for key, value in filter_mapping.items() if value and value.strip()]
        placeholders = ','.join('?' * len(filter_list))

        if search_type == "t1":
            if len(filter_list) == 0:
                if dataset:
                    year_query = """
                        SELECT year, COUNT(*) as count
                        FROM paper
                        WHERE (abstract LIKE ? OR title LIKE ?) AND year IS NOT NULL AND dataset = ?
                        GROUP BY year
                        ORDER BY year ASC
                    """
                    year_params = [f'%{search_term}%', f'%{search_term}%', dataset]
                else:
                    year_query = """
                        SELECT year, COUNT(*) as count
                        FROM paper
                        WHERE (abstract LIKE ? OR title LIKE ?) AND year IS NOT NULL
                        GROUP BY year
                        ORDER BY year ASC
                    """
                    year_params = [f'%{search_term}%', f'%{search_term}%']
            else:
                if dataset:
                    year_query = f"""
                        SELECT p.year, COUNT(*) as count
                        FROM Paper p
                        WHERE p.id IN (
                            SELECT paper_id
                            FROM PaperCode
                            WHERE code IN ({placeholders})
                            GROUP BY paper_id
                            HAVING COUNT(DISTINCT code) = ?
                        ) AND (p.abstract LIKE ? OR p.title LIKE ?) AND p.year IS NOT NULL AND p.dataset = ?
                        GROUP BY p.year
                        ORDER BY p.year ASC
                    """
                    year_params = filter_list + [len(filter_list), f'%{search_term}%', f'%{search_term}%', dataset]
                else:
                    year_query = f"""
                        SELECT p.year, COUNT(*) as count
                        FROM Paper p
                        WHERE p.id IN (
                            SELECT paper_id
                            FROM PaperCode
                            WHERE code IN ({placeholders})
                            GROUP BY paper_id
                            HAVING COUNT(DISTINCT code) = ?
                        ) AND (p.abstract LIKE ? OR p.title LIKE ?) AND p.year IS NOT NULL
                        GROUP BY p.year
                        ORDER BY p.year ASC
                    """
                    year_params = filter_list + [len(filter_list), f'%{search_term}%', f'%{search_term}%']        
        else:
            if len(filter_list) == 0:
                if dataset:
                    year_query = """
                        SELECT year, COUNT(*) as count
                        FROM paper p
                        LEFT JOIN PaperText t
                        ON p.id = t.id
                        WHERE (t.text LIKE ?) AND p.year IS NOT NULL AND p.dataset = ?
                        GROUP BY year
                        ORDER BY year ASC
                    """
                    year_params = [f'%{search_term}%', dataset]
                else:
                    year_query = """
                        SELECT year, COUNT(*) as count
                        FROM paper p
                        LEFT JOIN PaperText t
                        ON p.id = t.id
                        WHERE (t.text LIKE ?) AND p.year IS NOT NULL
                        GROUP BY year
                        ORDER BY year ASC
                    """
                    year_params = [f'%{search_term}%',]
            else:
                if dataset:
                    year_query = f"""
                        SELECT p.year, COUNT(*) as count
                        FROM Paper p
                        LEFT JOIN PaperText t
                        ON p.id = t.id
                        WHERE p.id IN (
                            SELECT paper_id
                            FROM PaperCode
                            WHERE code IN ({placeholders})
                            GROUP BY paper_id
                            HAVING COUNT(DISTINCT code) = ?
                        ) AND (t.text LIKE ?) AND p.year IS NOT NULL AND p.dataset = ?
                        GROUP BY p.year
                        ORDER BY p.year ASC
                    """
                    year_params = filter_list + [len(filter_list), f'%{search_term}%', dataset]
                else:
                    year_query = f"""
                        SELECT p.year, COUNT(*) as count
                        FROM Paper p
                        LEFT JOIN PaperText t
                        ON p.id = t.id                        
                        WHERE p.id IN (
                            SELECT paper_id
                            FROM PaperCode
                            WHERE code IN ({placeholders})
                            GROUP BY paper_id
                            HAVING COUNT(DISTINCT code) = ?
                        ) AND (t.text LIKE ?) AND p.year IS NOT NULL
                        GROUP BY p.year
                        ORDER BY p.year ASC
                    """
                    year_params = filter_list + [len(filter_list), f'%{search_term}%']
    
        
        year_distribution = conn.execute(year_query, year_params).fetchall()
        
        chart_data = []
        for year, count in year_distribution:
            chart_data.append({
                'year': str(int(year)),
                'count': count
            })
        
        return jsonify({
            'success': True,
            'data': chart_data
        })
    

@app.route('/api/visualizations/technologydistribution', methods=['GET'])
def get_technology_distribution():
    with sqlite3.connect(DB_PATH) as conn:
        search_term = request.args.get('q', '').lower()
        search_type = request.args.get('searchtype', '').lower()
        dataset = request.args.get('dataset', '')
        filter_mapping = {
            'challenge': request.args.get('challenge', '').lower(),
            'targetuser': request.args.get('targetuser', '').lower(),
            'genderincludes': request.args.get('genderincludes', '').lower(),
            'race': request.args.get('race', '').lower(),
            'problem': request.args.get('problem', '').lower(),
            'gender': request.args.get('gender', '').lower(),
            'language': request.args.get('language', '').lower(),
            'age': request.args.get('age', '').lower(),
            'level': request.args.get('level', '').lower(),
            'participantnumber': request.args.get('participantnumber', '').lower(),
            'using': request.args.get('using', '').lower(),
            'group': request.args.get('group', '').lower(),
            'level': request.args.get('level', '').lower(),
            'technology': request.args.get('technology', ''),
        }
        filter_list = [f"{key}_{value}" for key, value in filter_mapping.items() if value and value.strip()]
        placeholders = ','.join('?' * len(filter_list))
        
        if search_type == "t1":
            if len(filter_list) == 0:
                if dataset:
                    tech_query = """
                        SELECT
                            c.code,
                            COUNT(pc.paper_id) as paper_count
                        FROM main.Code c
                                LEFT JOIN main.PaperCode as pc ON c.code = pc.code
                                WHERE pc.paper_id in (
                                    SELECT id
                                    FROM Paper p
                                    WHERE (p.abstract LIKE ? OR p.title LIKE ?) AND p.dataset = ?
                                    ) AND c.theme = 'technology'
                        GROUP BY c.code, c.theme
                        ORDER BY paper_count DESC
                        LIMIT 8;
                    """
                    tech_params = [f'%{search_term}%', f'%{search_term}%', dataset]
                else:
                    tech_query = """
                        SELECT
                            c.code,
                            COUNT(pc.paper_id) as paper_count
                        FROM main.Code c
                                LEFT JOIN main.PaperCode as pc ON c.code = pc.code
                                WHERE pc.paper_id in (
                                    SELECT id
                                    FROM Paper p
                                    WHERE p.abstract LIKE ? OR p.title LIKE ?
                                    ) AND c.theme = 'technology'
                        GROUP BY c.code, c.theme
                        ORDER BY paper_count DESC
                        LIMIT 8;
                    """
                    tech_params = [f'%{search_term}%', f'%{search_term}%']

            else:
                if dataset:
                    tech_query = f"""
                        SELECT
                            c.code,
                            COUNT(pc.paper_id) as paper_count
                        FROM main.Code c
                                LEFT JOIN main.PaperCode as pc ON c.code = pc.code
                                WHERE pc.paper_id in (
                                    SELECT id
                                    FROM Paper p
                                    WHERE p.id IN (
                                        SELECT paper_id
                                        FROM PaperCode
                                        WHERE code IN ({placeholders})
                                        GROUP BY paper_id
                                        HAVING COUNT(DISTINCT code) = ?
                                    ) AND (p.abstract LIKE ? OR p.title LIKE ?) AND p.dataset = ?
                                    ) AND c.theme = 'technology'
                        GROUP BY c.code, c.theme
                        ORDER BY paper_count DESC
                        LIMIT 8;
                    """
                    tech_params = filter_list + [len(filter_list), f'%{search_term}%', f'%{search_term}%', dataset]
                else:
                    tech_query = f"""
                        SELECT
                            c.code,
                            COUNT(pc.paper_id) as paper_count
                        FROM main.Code c
                                LEFT JOIN main.PaperCode as pc ON c.code = pc.code
                                WHERE pc.paper_id in (
                                    SELECT id
                                    FROM Paper p
                                    WHERE p.id IN (
                                        SELECT paper_id
                                        FROM PaperCode
                                        WHERE code IN ({placeholders})
                                        GROUP BY paper_id
                                        HAVING COUNT(DISTINCT code) = ?
                                    ) AND (p.abstract LIKE ? OR p.title LIKE ?)
                                    ) AND c.theme = 'technology'
                        GROUP BY c.code, c.theme
                        ORDER BY paper_count DESC
                        LIMIT 8;
                    """
                    tech_params = filter_list + [len(filter_list), f'%{search_term}%', f'%{search_term}%']
        else:
            if len(filter_list) == 0:
                if dataset:
                    tech_query = """
                        SELECT
                            c.code,
                            COUNT(pc.paper_id) as paper_count
                        FROM main.Code c
                                LEFT JOIN main.PaperCode as pc ON c.code = pc.code
                                WHERE pc.paper_id in (
                                    SELECT p.id
                                    FROM Paper p
                                    LEFT JOIN PaperText as t
                                    ON p.id = t.id
                                    WHERE (t.text LIKE ?) AND p.dataset = ?
                                    ) AND c.theme = 'technology'
                        GROUP BY c.code, c.theme
                        ORDER BY paper_count DESC
                        LIMIT 8;
                    """
                    tech_params = [f'%{search_term}%', dataset]
                else:
                    tech_query = """
                        SELECT
                            c.code,
                            COUNT(pc.paper_id) as paper_count
                        FROM main.Code c
                                LEFT JOIN main.PaperCode as pc ON c.code = pc.code
                                WHERE pc.paper_id in (
                                    SELECT p.id
                                    FROM Paper p
                                    LEFT JOIN PaperText as t
                                    ON p.id = t.id
                                    WHERE t.text LIKE ?
                                    ) AND c.theme = 'technology'
                        GROUP BY c.code, c.theme
                        ORDER BY paper_count DESC
                        LIMIT 8;
                    """
                    tech_params = [f'%{search_term}%']
            else:
                if dataset:
                    tech_query = f"""
                        SELECT
                            c.code,
                            COUNT(pc.paper_id) as paper_count
                        FROM main.Code c
                                LEFT JOIN main.PaperCode as pc ON c.code = pc.code
                                WHERE pc.paper_id in (
                                    SELECT p.id
                                    FROM Paper p
                                    LEFT JOIN PaperText t
                                    ON p.id = t.id
                                    WHERE p.id IN (
                                        SELECT paper_id
                                        FROM PaperCode
                                        WHERE code IN ({placeholders})
                                        GROUP BY paper_id
                                        HAVING COUNT(DISTINCT code) = ?
                                    ) AND (t.text LIKE ?) AND p.dataset = ?
                                    ) AND c.theme = 'technology'
                        GROUP BY c.code, c.theme
                        ORDER BY paper_count DESC
                        LIMIT 8;
                    """
                    tech_params = filter_list + [len(filter_list), f'%{search_term}%', dataset]
                else:
                    tech_query = f"""
                        SELECT
                            c.code,
                            COUNT(pc.paper_id) as paper_count
                        FROM main.Code c
                                LEFT JOIN main.PaperCode as pc ON c.code = pc.code
                                WHERE pc.paper_id in (
                                    SELECT p.id
                                    FROM Paper p
                                    LEFT JOIN PaperText t
                                    ON p.id = t.id
                                    WHERE p.id IN (
                                        SELECT paper_id
                                        FROM PaperCode
                                        WHERE code IN ({placeholders})
                                        GROUP BY paper_id
                                        HAVING COUNT(DISTINCT code) = ?
                                    ) AND (t.text LIKE ?)
                                    ) AND c.theme = 'technology'
                        GROUP BY c.code, c.theme
                        ORDER BY paper_count DESC
                        LIMIT 8;
                    """
                    tech_params = filter_list + [len(filter_list), f'%{search_term}%']

        tech_distribution = conn.execute(tech_query, tech_params).fetchall()        
        tech_data = []
        for code, paper_count in tech_distribution:
            tech_data.append({
                'technology': str(code.split('_')[1]),
                'count': paper_count
            })
        return jsonify({
            'success': True,
            'data': tech_data
        })

@app.route('/api/visualizations/journaldistribution', methods=['GET'])
def get_journal_distribution():
    with sqlite3.connect(DB_PATH) as conn:
        search_term = request.args.get('q', '').lower()
        search_type = request.args.get('searchtype', '').lower()
        dataset = request.args.get('dataset', '')
        filter_mapping = {
            'challenge': request.args.get('challenge', '').lower(),
            'targetuser': request.args.get('targetuser', '').lower(),
            'genderincludes': request.args.get('genderincludes', '').lower(),
            'race': request.args.get('race', '').lower(),
            'problem': request.args.get('problem', '').lower(),
            'gender': request.args.get('gender', '').lower(),
            'language': request.args.get('language', '').lower(),
            'age': request.args.get('age', '').lower(),
            'level': request.args.get('level', '').lower(),
            'participantnumber': request.args.get('participantnumber', '').lower(),
            'using': request.args.get('using', '').lower(),
            'group': request.args.get('group', '').lower(),
            'level': request.args.get('level', '').lower(),
            'technology': request.args.get('technology', ''),
        }

        filter_list = [f"{key}_{value}" for key, value in filter_mapping.items() if value and value.strip()]
        placeholders = ','.join('?' * len(filter_list))
        
        if search_type == "t1":
            if len(filter_list) == 0:
                if dataset:
                    year_query = """
                        SELECT dataset, COUNT(*) as count
                        FROM paper
                        WHERE (abstract LIKE ? OR title LIKE ?) AND year IS NOT NULL AND dataset = ?
                        GROUP BY dataset
                        ORDER BY year ASC
                    """
                    year_params = [f'%{search_term}%', f'%{search_term}%', dataset]
                else:
                    year_query = """
                        SELECT dataset, COUNT(*) as count
                        FROM paper
                        WHERE (abstract LIKE ? OR title LIKE ?) AND year IS NOT NULL
                        GROUP BY dataset
                        ORDER BY year ASC
                    """
                    year_params = [f'%{search_term}%', f'%{search_term}%']
            else:
                if dataset:
                    year_query = f"""
                        SELECT p.dataset, COUNT(*) as count
                        FROM Paper p
                        WHERE p.id IN (
                            SELECT paper_id
                            FROM PaperCode
                            WHERE code IN ({placeholders})
                            GROUP BY paper_id
                            HAVING COUNT(DISTINCT code) = ?
                        ) AND (p.abstract LIKE ? OR p.title LIKE ?) AND p.year IS NOT NULL AND p.dataset = ?
                        GROUP BY p.dataset
                        ORDER BY p.year ASC
                    """
                    year_params = filter_list + [len(filter_list), f'%{search_term}%', f'%{search_term}%', dataset]
                else:
                    year_query = f"""
                        SELECT p.dataset, COUNT(*) as count
                        FROM Paper p
                        WHERE p.id IN (
                            SELECT paper_id
                            FROM PaperCode
                            WHERE code IN ({placeholders})
                            GROUP BY paper_id
                            HAVING COUNT(DISTINCT code) = ?
                        ) AND (p.abstract LIKE ? OR p.title LIKE ?) AND p.year IS NOT NULL
                        GROUP BY p.dataset
                        ORDER BY p.year ASC
                    """
                    year_params = filter_list + [len(filter_list), f'%{search_term}%', f'%{search_term}%']
        else:
            if len(filter_list) == 0:
                if dataset:
                    year_query = """
                        SELECT dataset, COUNT(*) as count
                        FROM paper p
                        LEFT JOIN PaperText t
                        ON p.id = t.id
                        WHERE (t.text LIKE ?) AND year IS NOT NULL AND dataset = ?
                        GROUP BY dataset
                        ORDER BY year ASC
                    """
                    year_params = [f'%{search_term}%', dataset]
                else:
                    year_query = """
                        SELECT dataset, COUNT(*) as count
                        FROM paper p
                        LEFT JOIN PaperText t
                        ON p.id = t.id
                        WHERE (t.text LIKE ?) AND year IS NOT NULL
                        GROUP BY dataset
                        ORDER BY year ASC
                    """
                    year_params = [f'%{search_term}%']
            else:
                if dataset:
                    year_query = f"""
                        SELECT p.dataset, COUNT(*) as count
                        FROM Paper p
                        LEFT JOIN PaperText t
                        ON p.id = t.id
                        WHERE p.id IN (
                            SELECT paper_id
                            FROM PaperCode
                            WHERE code IN ({placeholders})
                            GROUP BY paper_id
                            HAVING COUNT(DISTINCT code) = ?
                        ) AND (t.text LIKE ?) AND p.year IS NOT NULL AND p.dataset = ?
                        GROUP BY p.dataset
                        ORDER BY p.year ASC
                    """
                    year_params = filter_list + [len(filter_list), f'%{search_term}%', dataset]
                else:
                    year_query = f"""
                        SELECT p.dataset, COUNT(*) as count
                        FROM Paper p
                        LEFT JOIN PaperText t
                        ON p.id = t.id
                        WHERE p.id IN (
                            SELECT paper_id
                            FROM PaperCode
                            WHERE code IN ({placeholders})
                            GROUP BY paper_id
                            HAVING COUNT(DISTINCT code) = ?
                        ) AND (t.text LIKE ?) AND p.year IS NOT NULL
                        GROUP BY p.dataset
                        ORDER BY p.year ASC
                    """
                    year_params = filter_list + [len(filter_list), f'%{search_term}%']
        
        year_distribution = conn.execute(year_query, year_params).fetchall()
        
        chart_data = []
        for journal, count in year_distribution:
            chart_data.append({
                'journal': str(journal),
                'count': count
            })
        
        return jsonify({
            'success': True,
            'data': chart_data
        })
    

# TODO: Implement keyword count function.
@app.route('/api/visualizations/keyworddistribution', methods=['GET'])
def get_keyword_distribution():
    with sqlite3.connect(DB_PATH) as conn:
        search_term = request.args.get('q', '').lower()
        dataset = request.args.get('dataset', '')
        filter_mapping = {
            'challenge': request.args.get('challenge', '').lower(),
            'targetuser': request.args.get('targetuser', '').lower(),
            'genderincludes': request.args.get('genderincludes', '').lower(),
            'race': request.args.get('race', '').lower(),
            'problem': request.args.get('problem', '').lower(),
            'gender': request.args.get('gender', '').lower(),
            'language': request.args.get('language', '').lower(),
            'age': request.args.get('age', '').lower(),
            'level': request.args.get('level', '').lower(),
            'participantnumber': request.args.get('participantnumber', '').lower(),
            'using': request.args.get('using', '').lower(),
            'group': request.args.get('group', '').lower(),
            'level': request.args.get('level', '').lower(),
            'technology': request.args.get('technology', ''),
        }

        filter_list = [f"{key}_{value}" for key, value in filter_mapping.items() if value and value.strip()]
        placeholders = ','.join('?' * len(filter_list))
        
        if len(filter_list) == 0:
            if dataset:
                keyword_query = """

                """
                keyword_params = [f'%{search_term}%', f'%{search_term}%', dataset]
            else:
                keyword_query = """

                """
                keyword_params = [f'%{search_term}%', f'%{search_term}%']
        else:
            if dataset:
                keyword_query = f"""

                """
                keyword_params = filter_list + [len(filter_list), f'%{search_term}%', f'%{search_term}%', dataset]
            else:
                keyword_query = f"""

                """
                keyword_params = filter_list + [len(filter_list), f'%{search_term}%', f'%{search_term}%']
        
        keyword_distribution = conn.execute(keyword_query, keyword_params).fetchall()
        
        chart_data = []
        for keyword, count in keyword_distribution:
            chart_data.append({
                'journal': str(keyword),
                'count': count
            })
        return jsonify({
            'success': True,
            'data': chart_data
        })    


if __name__ == "__main__":
    app.run(port=5055, debug=True)
    