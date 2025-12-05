from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os

# Initiate the application
app = Flask(__name__)
CORS(app)
DB_PATH = os.getenv('AUTISM_DB_PATH', './autism_research_updated.db')


"""
======================================================================
- Python Flask API for ARC
- Updated 10/27/25
======================================================================
Helpers:
  get_filter_params():
    - Extract query parameters
    - Generate filter list for DB queires
    - Generate placeholder list for each filter

  get_search_params():
    - Extract search term, type, and dataset type from request

  build_where_clause():
    - Takes nessacery precursors (filter_list, search_type, search_term)
    - Builds WHERE clause for query based on active filters and options
=====================================================================
API Endpoints and Handlers:

GET Endpoints:
  URL: /api/data , Function: search_data()
    - Returns the following:
      - URL: Resolves URL based on doi if NULL
      - Title: Title of the paper
      - Dataset: IEEE Xplore OR ACM Digital Library
      - Abstract: The abstract of the paper
      - Keywords: Keyword list associated with the paper

  URL: /api/visualization/yeardistribution, Function: get_year_distribution()
    - Return data in the format [{year: int, ieee_count: int, acm_count: int}]
    - This endpoint is used to display the publications by year line graph

  URL: /api/visualization/technologydistribution, Function: get_technology_distribution()
    - Return data in the format [{technology: str, count: int}]
    - This endpoint is used to display the top technology pie chart

  URL: /api/visualization/journaldistribution, Function: get_journal_distribution()
    - Return data in the format [{journal: str, count: int}]
    - This endpoint is used to display the journal pie chart (not used currently!)

  URL: /api/visualization/keyworddistribution, Function: get_keyword_distribution()
    - Return the count of the top 12 keywords EXCLUDING commonalities (view function)
    - Return data in the format [{keyword: str, count: int}]
    - This endpoint is used to display the horizontal bar chart of top keywords

  URL: /api/visualization/geodata, Function: get_geodata()
    - Extract locations attribute from each DB entry, create atomic count for each country
        - Location data based on institution of authors
    - Return data in the format [{country: str, count: int}]
    - This endpoint is used to display publication map

=====================================================================
"""


# =====================================================================
# HELPER FUNCTIONS
# =====================================================================

def get_filter_params():
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
        'technology': request.args.get('technology', ''),
    }
    filter_list = [f"{k}_{v}" for k, v in filter_mapping.items() if v and v.strip()]
    placeholders = ','.join('?' * len(filter_list))
    return filter_list, placeholders

def get_search_params():
    return {
        'term': request.args.get('q', '').lower(),
        'type': request.args.get('searchtype', '').lower(),
        'dataset': request.args.get('dataset', '')
    }

def build_where_clause(search_params, filter_list, placeholders, text_search=False, table_alias='p'):
    search_term = search_params['term']
    search_type = search_params['type']
    dataset = search_params['dataset']
    
    conditions = []
    params = []
    
    # Add filter conditions
    if filter_list:
        filter_subquery = f"""
            {table_alias}.id IN (
                SELECT paper_id FROM PaperCode
                WHERE code IN ({placeholders})
                GROUP BY paper_id
                HAVING COUNT(DISTINCT code) = ?
            )
        """
        conditions.append(filter_subquery)
        params.extend(filter_list + [len(filter_list)])
    
    # Add search conditions (only if search term is provided)
    if search_term:
        if search_type == "t2":  # full text search
            conditions.append("(t.text LIKE ?)")
            params.append(f'%{search_term}%')
        else:  # t1 or default: title and abstract search
            conditions.append(f"({table_alias}.abstract LIKE ? OR {table_alias}.title LIKE ?)")
            params.extend([f'%{search_term}%', f'%{search_term}%'])
    
    # Add dataset condition
    if dataset:
        conditions.append(f"{table_alias}.dataset = ?")
        params.append(dataset)
    
    return " AND ".join(conditions) if conditions else "1=1", params


# =====================================================================
# API ENDPOINTS
# =====================================================================

@app.route('/api/data', methods=['GET'])
def search_data():
    with sqlite3.connect(DB_PATH) as conn:
        search_params = get_search_params()
        filter_list, placeholders = get_filter_params()
        
        # Build query based on search type
        # Only join with PaperText for t2 (full text) searches
        base_query = "SELECT DISTINCT urls, doi, title, dataset, abstract, keywords FROM paper p"
        if search_params['type'] == "t2":
            join_clause = "LEFT JOIN PaperText t ON p.id = t.id"
        else:
            join_clause = ""
        
        where_clause, params = build_where_clause(search_params, filter_list, placeholders, 
                                                   search_params['type'] == "t2", 'p')
        
        query = f"{base_query} {join_clause} WHERE {where_clause} ORDER BY year DESC"
        response = conn.execute(query, params).fetchall()
        
        # Format response
        json_response = [{
            'urls': urls if urls else f"https://doi.org/{doi}" if doi else "arc.cs.wwu.edu",
            'title': title,
            'dataset': dataset,
            'abstract': abstract,
            'keywords': keywords,
        } for urls, doi, title, dataset, abstract, keywords in response]
        
        return jsonify({'success': True, 'data': json_response, 'count': len(json_response)})

@app.route('/api/visualizations/yeardistribution', methods=['GET'])
def get_year_distribution():
    with sqlite3.connect(DB_PATH) as conn:
        search_params = get_search_params()
        filter_list, placeholders = get_filter_params()
        
        # Build query
        select_clause = """
            SELECT year,
            SUM(CASE WHEN p.dataset = 'IEEE Xplore' THEN 1 ELSE 0 END) AS ieee_count,
            SUM(CASE WHEN p.dataset = 'ACM Digital Library' THEN 1 ELSE 0 END) AS acm_count
            FROM paper p
        """
        join_clause = "LEFT JOIN PaperText t ON p.id = t.id" if search_params['type'] == "t2" else ""
        where_clause, params = build_where_clause(search_params, filter_list, placeholders, 
                                                   search_params['type'] == "t2", 'p')
        
        query = f"{select_clause} {join_clause} WHERE {where_clause} AND p.year IS NOT NULL GROUP BY year ORDER BY year ASC"
        results = conn.execute(query, params).fetchall()
        
        chart_data = [{'year': str(int(year)), 'ieee_count': ieee, 'acm_count': acm} 
                      for year, ieee, acm in results]
        
        return jsonify({'success': True, 'data': chart_data})

@app.route('/api/visualizations/technologydistribution', methods=['GET'])
def get_technology_distribution():
    with sqlite3.connect(DB_PATH) as conn:
        search_params = get_search_params()
        filter_list, placeholders = get_filter_params()
        
        # Build subquery for papers
        if search_params['type'] == "t2":
            paper_subquery = "SELECT p.id FROM Paper p LEFT JOIN PaperText t ON p.id = t.id"
        else:
            paper_subquery = "SELECT id FROM Paper p"
        
        where_clause, params = build_where_clause(search_params, filter_list, placeholders, 
                                                   search_params['type'] == "t2", 'p')
        
        query = f"""
            SELECT c.code, COUNT(pc.paper_id) as paper_count
            FROM main.Code c
            LEFT JOIN main.PaperCode pc ON c.code = pc.code
            WHERE pc.paper_id IN ({paper_subquery} WHERE {where_clause})
            AND c.theme = 'technology'
            GROUP BY c.code, c.theme
            ORDER BY paper_count DESC
            LIMIT 8
        """
        
        results = conn.execute(query, params).fetchall()
        tech_data = [{'technology': code.split('_')[1], 'count': count} for code, count in results]
        
        return jsonify({'success': True, 'data': tech_data})

@app.route('/api/visualizations/journaldistribution', methods=['GET'])
def get_journal_distribution():
    with sqlite3.connect(DB_PATH) as conn:
        search_params = get_search_params()
        filter_list, placeholders = get_filter_params()
        
        select_clause = "SELECT dataset, COUNT(*) as count FROM paper p"
        join_clause = "LEFT JOIN PaperText t ON p.id = t.id" if search_params['type'] == "t2" else ""
        where_clause, params = build_where_clause(search_params, filter_list, placeholders, 
                                                   search_params['type'] == "t2", 'p')
        
        query = f"{select_clause} {join_clause} WHERE {where_clause} AND year IS NOT NULL GROUP BY dataset ORDER BY year ASC"
        results = conn.execute(query, params).fetchall()
        
        chart_data = [{'journal': str(journal), 'count': count} for journal, count in results]
        return jsonify({'success': True, 'data': chart_data})

@app.route('/api/visualizations/keyworddistribution', methods=['GET'])
def get_keyword_distribution():
    with sqlite3.connect(DB_PATH) as conn:
        search_params = get_search_params()
        filter_list, placeholders = get_filter_params()
        
        select_clause = "SELECT keywords FROM paper p"
        join_clause = "LEFT JOIN PaperText t ON p.id = t.id" if search_params['type'] == "t2" else ""
        where_clause, params = build_where_clause(search_params, filter_list, placeholders, 
                                                   search_params['type'] == "t2", 'p')
        
        query = f"{select_clause} {join_clause} WHERE {where_clause} AND keywords IS NOT NULL ORDER BY year DESC"
        results = conn.execute(query, params).fetchall()
        
        # Process keywords
        keyword_count = {}
        for (keyword_string,) in results:
            if not keyword_string:
                continue
            
            # Split by semicolon or comma
            delimiter = ';' if ';' in keyword_string else ','
            keywords = [kw.strip().lower() for kw in keyword_string.split(delimiter) if kw.strip()]
            
            for keyword in keywords:
                keyword_count[keyword] = keyword_count.get(keyword, 0) + 1
        
        # Get top 12 keywords excluding common ones (autism, asd)
        sorted_keywords = sorted(keyword_count.items(), key=lambda x: x[1], reverse=True)
        chart_data = [{'keyword': kw, 'count': count} 
                      for kw, count in sorted_keywords[:12] 
                      if kw not in ('autism', 'autism spectrum disorder')]
        
        return jsonify({'success': True, 'data': chart_data})

@app.route('/api/visualizations/geodata', methods=["GET"])
def get_geodata():
    with sqlite3.connect(DB_PATH) as conn:
        search_params = get_search_params()
        filter_list, placeholders = get_filter_params()
        
        select_clause = "SELECT p.locations FROM paper p"
        join_clause = "LEFT JOIN PaperText t ON p.id = t.id" if search_params['type'] == "t2" else ""
        where_clause, params = build_where_clause(search_params, filter_list, placeholders, 
                                                   search_params['type'] == "t2", 'p')
        
        # Add location null check
        where_clause = f"(p.locations IS NOT NULL AND p.locations != '') AND ({where_clause})"
        
        query = f"{select_clause} {join_clause} WHERE {where_clause}"
        results = conn.execute(query, params).fetchall()
        
        # Process locations
        location_count = {}
        for (location_string,) in results:
            if not location_string:
                continue
            locations = [loc.strip() for loc in location_string.split(';') if loc.strip()]
            for location in locations:
                location_count[location] = location_count.get(location, 0) + 1
        
        chart_data = sorted([{'country': country, 'count': count} 
                            for country, count in location_count.items()],
                           key=lambda x: x['count'], reverse=True)
        
        return jsonify({'success': True, 'data': chart_data})


# Program entry
if __name__ == "__main__":
    app.run(port=5055, debug=True)
